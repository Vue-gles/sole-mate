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

import { getOutgoing } from '../store/notifications';

class OutgoingRequests extends React.Component {
  constructor(props) {
    super(props);
    console.log('Outgoing View -------------------->');
  }
  async componentDidMount() {
    await this.props.getOutgoing();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.props.notifications.map(notification => {
            return (
              <View
                style={styles.notification}
                key={`${notification.requesterId}${notification.runId}`}
              >
                <Text>Run ID: {notification.runId}</Text>
                <Text>Status: {notification.status}</Text>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  notification: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapState = state => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatch = dispatch => {
  return {
    getOutgoing: () => dispatch(getOutgoing()),
  };
};

export default connect(mapState, mapDispatch)(OutgoingRequests);
