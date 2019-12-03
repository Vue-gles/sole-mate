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

import { getOutgoing } from '../store/outgoing';

class OutgoingRequests extends React.Component {
  constructor(props) {
    super(props);
    
  }
  async componentDidMount() {
    await this.props.getOutgoing();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.props.notifications && this.props.notifications.length ? (
            this.props.notifications.map(notification => {
              return (
                <View
                  style={styles.notification}
                  key={`${notification.requesterId}${notification.runId}`}
                >
                  <Image
                    source={{
                      uri: notification.run.Creator.imageUrl,
                    }}
                    style={styles.runImage}
                  />
                  {notification.status === 'pending' ? (
                    <Text style={styles.status}>
                      {notification.run.Creator.firstName}{' '}
                      {notification.run.Creator.lastName} hasn't responded to
                      your request to run on{' '}
                      {moment(notification.run.startTimeframe).format(
                        'MMMM Do'
                      )}
                    </Text>
                  ) : notification.status === 'accepted' ? (
                    <Text style={styles.status}>
                      {notification.run.Creator.firstName}{' '}
                      {notification.run.Creator.lastName} accepted your request
                      to run on{' '}
                      {moment(notification.run.startTimeframe).format(
                        'MMMM Do'
                      )}
                    </Text>
                  ) : (
                    <Text style={styles.status}>
                      {notification.run.Creator.firstName}{' '}
                      {notification.run.Creator.lastName} isn't available to run
                      on{' '}
                      {moment(notification.run.startTimeframe).format(
                        'MMMM Do'
                      )}
                    </Text>
                  )}
                </View>
              );
            })
          ) : (
            <View style={styles.notification}>
              <Text>No outgoing notifications</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  notification: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  status: {
    width: 250,
  },
  runImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    borderRadius: 60 / 2,
    overflow: 'hidden',
  },
});

const mapState = state => {
  return {
    notifications: state.outgoing,
  };
};

const mapDispatch = dispatch => {
  return {
    getOutgoing: () => dispatch(getOutgoing()),
  };
};

export default connect(mapState, mapDispatch)(OutgoingRequests);
