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
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#633689',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }
);

NotificationScreen.navigationOptions = {
  title: 'Notifications',
};

export default NotificationScreen;
