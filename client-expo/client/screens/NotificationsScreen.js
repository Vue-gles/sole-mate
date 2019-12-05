import React from 'react';
import {
  AsyncStorage,
  Button,
  StatusBar,
  Image,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';

import IncomingRequests from './IncomingRequests';
import OutgoingRequests from './OutgoingRequests';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const NotificationScreen = createMaterialTopTabNavigator(
  {
    Outgoing: { screen: OutgoingRequests },
    Incoming: { screen: IncomingRequests },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#e8e8e8',
      style: {
        backgroundColor: '#21752B',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 3,
      },
    },
  }
);

NotificationScreen.navigationOptions = {
  title: 'Notifications',
};

export default NotificationScreen;
