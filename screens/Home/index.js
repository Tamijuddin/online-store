import {
  useLazyQuery,
  useMutation,
  useSubscription,
} from '@apollo/react-hooks';
import { Datepicker, Spinner } from '@ui-kitten/components';
import * as axios from 'axios';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
  ListView,
} from 'react-native';
import { CLIENTID, DAILYOS_SERVER_URL } from 'react-native-dotenv';
import { Header, Icon } from '../../components';
import Cart from '../../components/Cart';
import { CategoryBanner } from '../../components/CategoryBanner';
import DrawerLayout from '../../components/DrawerLayout';
import Products from '../../components/Products';
import { SafetyBanner } from '../../components/SafetyBanner';
import { useAppContext } from '../../context/app';
import { useAuth } from '../../context/auth';
import { useCartContext } from '../../context/cart';
import {
  CREATE_CUSTOMER,
  CUSTOMER,
  CUSTOMER_DETAILS,
  STORE_SETTINGS,
} from '../../graphql';
import { height, width } from '../../utils/Scalaing';
import { styles } from './styles';
import CategoriesButton from '../../components/CategoriesButton';
import Footer from '../../components/Footer';

const CalendarIcon = (props) => <Icon size={24} {...props} name='calendar' />;

const Home = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [calendarDate, setcalendarDate] = useState(new Date());

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { setCustomer, setCustomerDetails, cart } = useCartContext();
  const { user } = useAuth();

  const sectionListRef = useRef();
  const scrollViewRef = useRef();

  const {
    brand,
    setBrand,
    visual,
    setVisual,
    availability,
    setAvailability,
  } = useAppContext();

  // Query
  const { loading: settingsLoading, error: settingsError } = useSubscription(
    STORE_SETTINGS,
    {
      onSubscriptionData: (data) => {
        const brandSettings = data.subscriptionData.data.storeSettings.filter(
          (setting) => setting.type === 'brand'
        );
        const visualSettings = data.subscriptionData.data.storeSettings.filter(
          (setting) => setting.type === 'visual'
        );
        const availabilitySettings = data.subscriptionData.data.storeSettings.filter(
          (setting) => setting.type === 'availability'
        );

        let brandState = {};
        brandSettings.forEach(({ identifier, value }) => {
          switch (identifier) {
            case 'Brand Logo': {
              brandState.logo = value.url;
              return;
            }
            case 'Brand Name': {
              brandState.name = value.name;
              return;
            }
            default: {
              return;
            }
          }
        });
        setBrand({ ...brandState });

        let visualState = {};
        visualSettings.forEach(({ identifier, value }) => {
          switch (identifier) {
            case 'Primary Color': {
              visualState.color = value.color;
              return;
            }
            case 'Cover': {
              visualState.cover = value.url;
              return;
            }
            default: {
              return;
            }
          }
        });
        setVisual({ ...visualState });

        let availabilityState = {};
        availabilitySettings.forEach(({ identifier, value }) => {
          switch (identifier) {
            case 'Store Availability': {
              availabilityState.store = value;
              return;
            }
            case 'Pickup Availability': {
              availabilityState.pickup = value;
              return;
            }
            case 'Delivery Availability': {
              availabilityState.delivery = value;
              return;
            }
            default: {
              return;
            }
          }
        });
        setAvailability({ ...availabilityState });
      },
    }
  );

  // .
  const fetchData = async (date) => {
    try {
      setLoading(true);
      const response = await axios.post(`${DAILYOS_SERVER_URL}/api/menu`, {
        input: date,
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // Effects
  React.useEffect(() => {
    if (availability && isStoreOpen()) {
      fetchData({
        year: moment().year(),
        month: moment().month(),
        day: moment().date(),
      });
    }
  }, [availability]);

  React.useEffect(() => {
    if (user.sub || user.userid) {
      customerDetails();
    }
  }, [user]);

  // Query
  const [customerDetails] = useLazyQuery(CUSTOMER_DETAILS, {
    variables: {
      keycloakId: user.sub || user.userid,
    },
    onCompleted: (data) => {
      if (data.platform_customerByClients?.length) {
        setCustomerDetails(data.platform_customerByClients[0].customer);
      } else {
        console.log('No customer data found!');
      }
    },
    fetchPolicy: 'cache-and-network',
  });

  // Mutations
  const [createCustomer] = useMutation(CREATE_CUSTOMER, {
    onCompleted: () => {
      console.log('Customer created');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Subscription
  const { error } = useSubscription(CUSTOMER, {
    variables: {
      keycloakId: user.sub || user.userid,
      email: user.email,
    },
    onSubscriptionData: (data) => {
      const customers = data.subscriptionData.data.customers;
      if (customers.length) {
        setCustomer(customers[0]);
      } else {
        createCustomer({
          variables: {
            object: {
              keycloakId: user.sub || user.userid,
              email: user.email,
              source: 'online store',
              clientId: CLIENTID,
            },
          },
        });
      }
    },
  });

  const isStoreOpen = () => {
    const current = new Date();
    if (availability.store.isOpen) {
      const minutes = current.getMinutes() + current.getHours() * 60;
      const from = availability.store.from.split(':');
      const to = availability.store.to.split(':');
      const fromMinutes = parseInt(from[1]) + parseInt(from[0]) * 60;
      const toMinutes = parseInt(to[1]) + parseInt(to[0]) * 60;

      if (minutes >= fromMinutes && minutes <= toMinutes) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  if (error) console.log('Subscription error: ', error);

  if (settingsLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Spinner size='large' />
      </View>
    );
  }
  if (availability && !isStoreOpen())
    return (
      <View style={styles.reallyBigContainer}>
        <ScrollView>
          <View>
            <Header title='Home' search options navigation={props.navigation} />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 24,
                  marginBottom: 20,
                }}
              >
                Store Closed
              </Text>
              <Text style={{ fontSize: 20 }}>
                {availability.store.shutMessage}
              </Text>
            </View>
          </View>
          <View style={styles.flexContainer}>
            <Spinner />
          </View>
          <View style={{ height: height * 0.08 }} />
        </ScrollView>
        <Cart to='OrderSummary' {...props} text='Checkout' />
      </View>
    );
  let pickerData = [];
  let sectionsData = [];

  if (data.length) {
    data.forEach((category, _id) => {
      pickerData.push(category.name);
      let dataItems = [];
      Object.keys(category)?.forEach((key) => {
        if (
          key != 'name' &&
          key != '__typename' &&
          key != 'title' &&
          key != 'data'
        ) {
          category[key]?.forEach((el) =>
            dataItems.push({
              type: key,
              id: el,
            })
          );
        }
      });
      sectionsData.push({
        title: category.name,
        data: dataItems,
      });
    });
  }
  data.forEach((el) => {
    el.title = el.name;
    el.data = [{ ...el }];
  });
  return (
    <>
      <Header
        title={brand?.name ? brand?.name : 'Home'}
        search
        options
        navigation={props.navigation}
      />
      <ScrollView
        ref={scrollViewRef}
        stickyHeaderIndices={[1]}
        style={[styles.home, styles.reallyBigContainer]}
      >
        {/* <Tabs /> */}
        <View style={styles.img_container}>
          <Image
            source={{
              uri: visual.cover,
            }}
            style={styles.cover_image}
          />
        </View>

        {/* <View
          style={{
            flexDirection: 'column',
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              opacity: 0.6,
              width: width > height ? width * 0.3 : width,
              minWidth: 200,
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 10,
            }}
          >
            Showing products for
          </Text>
          <Datepicker
            date={calendarDate}
            controlStyle={{
              backgroundColor: 'white',
              color: '#000',
            }}
            placeholder='Wednesday, May 4th'
            accessoryRight={CalendarIcon}
            style={{
              width: width > height ? width * 0.3 : width * 0.9,
            }}
            onSelect={(_date) => {
              setcalendarDate(_date);
              fetchData({
                year: moment(_date).year(),
                month: moment(_date).month(),
                day: moment(_date).date(),
              });
            }}
          /> 
        </View>*/}
        <View style={[styles.picker_container, { marginBottom: 4 }]}>
          <ScrollView
            horizontal
            style={{
              flex: 1,
            }}
            contentContainerStyle={{
              marginHorizontal: width > 768 ? 'auto' : 'none',
            }}
            showsHorizontalScrollIndicator={false}
          >
            {data.map((category, key) => (
              <CategoriesButton
                title={category.name}
                key={key}
                id={key}
                length={data?.length}
                onPress={() =>
                  props.navigation.navigate('CategoryProductsPage', {
                    data,
                    category,
                  })
                }
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.flexContainerMiddle}>
          <View style={styles.cardContainer}>
            {/* <SectionList
              showsVerticalScrollIndicator={true}
              ref={sectionListRef}
              sections={data}
              style={{
                height: height - 16 * 4.125 - 80 - 48,
                width: width > 1280 ? width : width,
                paddingBottom: height * 0.5,
              }}
              keyExtractor={(item, index) => item + index}
              renderSectionHeader={({ section: { title } }) => (
                <CategoryBanner category={title} />
              )}
              renderItem={({ item: category }) => (
                <Products navigation={props.navigation} category={category} />
              )}
            /> */}
            <View>
              {data.map((category) => (
                <View style={{ marginBottom: 20 }}>
                  <CategoryBanner category={category.title} />
                  <Products
                    navigation={props.navigation}
                    category={category}
                    showLess={true}
                  />
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 'auto',
                      padding: 10,
                      marginVertical: 20,
                      backgroundColor: visual.color,
                      borderRadius: 4,
                      minWidth: 150,
                      textAlign: 'center',
                    }}
                    onPress={() =>
                      props.navigation.navigate('CategoryProductsPage', {
                        data,
                        category,
                      })
                    }
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: '1.1rem',
                      }}
                    >
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* <View style={styles.headerContainer}>
          <SafetyBanner {...props} />
        </View> */}
        {width < 768 && <Cart to='OrderSummary' {...props} text='Checkout' />}
        <DrawerLayout />
        <Footer />
      </ScrollView>
    </>
  );
};

export default Home;