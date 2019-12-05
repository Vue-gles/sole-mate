import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import RunResultsScreen from '../screens/RunResultsScreen';
import RunLaterResultsScreen from '../screens/RunLaterResultsScreen';
import SingleRunScreen from '../screens/SingleRunScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MapScreen from '../screens/MapScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import RunForm from '../screens/RunForm';
import MessageThreads from '../screens/MessageThreads';
import SingleMessageThread from '../screens/SingleMessageThread';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileForm from '../screens/ProfileForm';
import RunNowForm from '../screens/RunNowForm'
import PastRouteMap from '../screens/PastRouteMap'
import Stats from '../screens/Stats'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Profile:ProfileScreen,
    ProfileForm:ProfileForm,
    RunForm: RunForm,
    RunNowForm: RunNowForm,
    RunResults: RunResultsScreen,
    RunLaterResults:RunLaterResultsScreen,
    SingleRun: SingleRunScreen,
    Stats: Stats
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Home',
      headerStyle: {
        backgroundColor: 'forestgreen',
      },
      headerTintColor: '#0F3E15',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
    },
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
    />
  ),
};

HomeStack.path = '';

const NotificationsStack = createStackNavigator(
  {
    Notifications: NotificationsScreen,
  },
  {
    defaultNavigationOptions: {
      title: 'Notifications',
      headerStyle: {
        backgroundColor: 'forestgreen',
      },
      headerTintColor: '#0F3E15',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
    },
  }
);

NotificationsStack.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
    />
  ),
};

NotificationsStack.path = '';

const ScheduleStack = createStackNavigator(
  {
    Home: ScheduleScreen,
    PastRouteMap:  PastRouteMap,
    Map: MapScreen
  },
  {
    defaultNavigationOptions: {
      title: 'Schedule',
      headerStyle: {
        backgroundColor: 'forestgreen',
      },
      headerTintColor: '#0F3E15',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
    },
  }
);

ScheduleStack.navigationOptions = {
  tabBarLabel: 'Schedule',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-journal` : 'md-journal'}
    />
  ),
};

ScheduleStack.path = '';

const MessageStack = createStackNavigator(
  {
    Threads: MessageThreads,
    SingleThread: SingleMessageThread,
  },
  {
    initialRouteName: 'Threads',
    defaultNavigationOptions: {
      title: 'Messages',
      headerStyle: {
        backgroundColor: 'forestgreen',
      },
      headerTintColor: '#0F3E15',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
    },
  }
);

MessageStack.navigationOptions = {
  title: 'Messages',
  tabBarLabel: 'Messages',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-text` : 'md-text'}
    />
  ),
};

MessageStack.path = '';


const MapStack = createStackNavigator(
  {
    Map: MapScreen
  },
  {
    
    defaultNavigationOptions: {
      title: 'Map',
      headerStyle: {
        backgroundColor: 'forestgreen',
      },
      headerTintColor: '#0F3E15',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
    },
  }
);

MapStack.navigationOptions = {
  title: 'Map',
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-text` : 'md-text'}
    />
  ),
};

MapStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  NotificationsStack,
  ScheduleStack,
  MessageStack,
  MapStack
});

tabNavigator.path = '';
export default tabNavigator;
