import React from 'react';
import { Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';

import UpcomingRunsScreen from './UpcomingRunsScreen';
import PastRunsScreen from './PastRunsScreen';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ScheduleScreen = createMaterialTopTabNavigator(
  {
    Upcoming: { screen: UpcomingRunsScreen },
    Past: { screen: PastRunsScreen },
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

ScheduleScreen.navigationOptions = {
  title: 'Schedule',
};

export default ScheduleScreen;
