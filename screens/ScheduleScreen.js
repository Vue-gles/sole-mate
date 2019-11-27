// import React from 'react';
// import {
//   AsyncStorage,
//   Button,
//   StatusBar,
//   Image,
//   Platform,
//   ScrollView,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Constants from 'expo-constants';
// import { connect } from 'react-redux';
// import moment from 'moment';
// import { NativeRouter, Route, Link } from 'react-router-native';

// import { getRuns } from '../store/runs';
// import SingleRunScreen from './SingleRunScreen';
// import RunResultsScreen from './RunResultsScreen';

// class ScheduleScreen extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   static navigationOptions = {
//     title: 'Schedule',
//   };

//   render() {
//     return (
//       <NativeRouter>
//         <Route exact path={'/'} component={RunResultsScreen} />
//       </NativeRouter>
//     );
//   }
// }

// const mapState = state => {
//   return {};
// };

// const mapDispatch = dispatch => {
//   return {};
// };

// export default connect(mapState, mapDispatch)(ScheduleScreen);

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
import HomeScreen from './HomeScreen'
import UpcomingRunsScreen from './UpcomingRunsScreen'
import PastRunsScreen from './PastRunsScreen'
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
        backgroundColor: '#1E90FF',
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