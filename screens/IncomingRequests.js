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
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import moment from 'moment';
import { NativeRouter, Route, Link } from 'react-router-native';

import { getNotifications } from '../store/notifications';

class IncomingRequests extends React.Component {
  constructor(props) {
    super(props);
    console.log('Outgoing View -------------------->');
  }
  render() {
    return (
      <View>
        <Text>Incoming</Text>
      </View>
    );
  }
}

const mapState = state => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatch = dispatch => {
  return {
    getNotifications: (id, method) => dispatch(getNotifications(id, method)),
  };
};

export default connect(mapState, mapDispatch)(IncomingRequests);
