import React from 'react';
import { Easing, Animated, Dimensions } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import Home from '../screens/Home';
import Placeholder from '../screens/Placeholder';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import AddToCart from '../screens/AddToCart';
import OrderSummary from '../screens/OrderSummary';
import ModalContect from '../components/ModalContent';
// drawer
import CustomDrawerContent from './Menu';

// header for screens
import { Icon, Header } from '../components';
import { argonTheme, tabs } from '../constants';
import ModalContent from '../components/ModalContent';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName='Profile' mode='card' headerMode='screen'>
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title='Profile'
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name='Placeholder'
        component={Placeholder}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=''
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode='card' headerMode='screen'>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title='Home'
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Stack.Screen
        name='Placeholder'
        component={Placeholder}
        options={{
          headerMode: false,
          header: null,
          headerShown: false,
          stackPresentation: 'modal',
        }}
      />
      <Stack.Screen
        name='Modal'
        component={ModalContent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='AddToCart'
        component={AddToCart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='OrderSummary'
        component={OrderSummary}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode='card' headerMode='none'>
      <Stack.Screen name='App' component={AppStack} />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: 'white',
        inactiveTintColor: '#000',
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName='Home'
    >
      <Drawer.Screen name='Home' component={HomeStack} />
      {/* <Drawer.Screen name="Profile" component={ProfileStack} /> */}
      {/* <Drawer.Screen name="Account" component={Register} /> */}
      {/* <Drawer.Screen name="Articles" component={ArticlesStack} /> */}
    </Drawer.Navigator>
  );
}
