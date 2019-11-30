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
import SingleRunScreen from '../screens/SingleRunScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MapScreen from '../screens/MapScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import RunForm from '../screens/RunForm';
import MessageThreads from '../screens/MessageThreads';
import SingleMessageThread from '../screens/SingleMessageThread';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    RunForm: RunForm,
  },
  {
    initialRouteName: 'Home',
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

const RunTabStack = createStackNavigator(
  {
    RunResults: RunResultsScreen,
    SingleRun: SingleRunScreen,
  },
  {
    initialRouteName: 'RunResults',
  }
);

RunTabStack.navigationOptions = {
  tabBarLabel: 'Runs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-walk' : 'md-walk'}
    />
  ),
};

RunTabStack.path = '';

const NotificationsStack = createStackNavigator(
  {
    Notifications: NotificationsScreen,
  },
  config
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

const MapStack = createStackNavigator(
  {
    Map: MapScreen,
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'}
    />
  ),
};

MapStack.path = '';

const ScheduleStack = createStackNavigator(
  {
    Home: ScheduleScreen,
  },
  config
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

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  RunTabStack,
  NotificationsStack,
  MapStack,
  ScheduleStack,
  MessageStack,
});

tabNavigator.path = '';
export default tabNavigator;
