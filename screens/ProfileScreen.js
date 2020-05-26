import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import HeaderBack from '../components/HeaderBack';
import { ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title='Go Back' />
      <View style={styles.userDetailsContainer}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: 'https://picsum.photos/200' }}
            style={styles.image}
          />
        </View>
        <Text style={styles.userName}>Sunny Dhama</Text>
      </View>
      <ScrollView style={styles.container}>
        {/* Address card */}
        <TouchableOpacity
          onPress={() => navigation.navigate('EditAddressScreen')}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>My Addresses</Text>
          <Text style={styles.default}>DEFAULT</Text>
          <View style={styles.content}>
            <View style={styles.cardNumberTextContainer}>
              <Text style={styles.cardNumberText}>
                123, apartment name, street rd, ..
              </Text>
            </View>
            <View style={styles.cardNumberSelectedContainer}>
              <View>
                <Text>
                  <Ionicons size={20} name='ios-arrow-forward' />
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* Payment Card */}
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectPaymentMethodScreen')}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>My Payment cards</Text>
          <Text style={styles.default}>DEFAULT</Text>
          <View style={styles.content}>
            <View style={styles.cardNumberTextContainer}>
              <Text style={styles.cardNumberText}>
                <AntDesign name='creditcard' /> {'  '}
                XXXX XXXX XXXX 2123
              </Text>
            </View>
            <View style={styles.cardNumberSelectedContainer}>
              <View>
                <Text>
                  <Ionicons size={20} name='ios-arrow-forward' />
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* Order History Card */}
        <TouchableOpacity onPress={() => {}} style={styles.card}>
          <Text style={styles.cardTitle}>Order History</Text>
          <View style={styles.content}>
            <View style={styles.cardNumberTextContainer}>
              <Text style={[styles.cardNumberText, { color: 'grey' }]}>
                20 orders so far
              </Text>
            </View>
            <View style={styles.cardNumberSelectedContainer}>
              <View>
                <Text>
                  <Ionicons size={20} name='ios-arrow-forward' />
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardNumberTextContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumberText: {
    width: width * 0.7,
    paddingLeft: 20,
    fontSize: '$s',
  },
  cardNumberSelectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  userName: {
    fontSize: '$xl',
    fontWeight: 'bold',
  },
  card: {
    padding: '1rem',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: '$l',
  },
  default: {
    fontSize: '$xs',
    color: 'gray',
  },
  content: {
    flexDirection: 'row',
  },
});