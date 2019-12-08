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
import { Spinner } from 'native-base';
import { NativeRouter, Route, Link } from 'react-router-native';

import socket from '../socket/index';

import { getIncoming, updateIncoming } from '../store/incoming';

class IncomingRequests extends React.Component {
  constructor(props) {
    super(props);
    this.requestUpdateHandler = this.requestUpdateHandler.bind(this);
  }
  componentDidMount() {
    this.props.getIncoming();
  }
  async requestUpdateHandler(runId, requesterId, status) {
    await this.props.update(runId, requesterId, status);
    socket.emit('requestUpdate');
  }
  render() {
    console.log('is fetching------>', this.props.isFetching);
    return !this.props.isFetching ? (
      this.props.notifications.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {this.props.notifications.map(notification => {
              return (
                <View
                  style={styles.notification}
                  key={`${notification.requesterId}${notification.runId}`}
                >
                  <Image
                    source={{
                      uri: notification.Requester.imageUrl,
                    }}
                    style={styles.runImage}
                  />
                  <Text style={styles.status}>
                    {notification.Requester.firstName}{' '}
                    {notification.Requester.lastName} would like to join your
                    run on{' '}
                    {moment(notification.run.startTimeframe).format('MMMM Do')}
                  </Text>
                  <Button
                    title="✓"
                    onPress={() =>
                      this.requestUpdateHandler(
                        notification.runId,
                        notification.requesterId,
                        'accepted'
                      )
                    }
                    color={'#0F3E15'}
                  />
                  <Button
                    title="X"
                    onPress={() =>
                      this.requestUpdateHandler(
                        notification.runId,
                        notification.requesterId,
                        'rejected'
                      )
                    }
                    color={'#0F3E15'}
                  />
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.notification}>
            <Text style={styles.none}>No incoming notifications</Text>
          </View>
        </SafeAreaView>
      )
    ) : (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Spinner color="green" />
      </View>
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
    marginLeft: 5,
    width: 200,
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
  none: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303731',
  },
});

const mapState = state => {
  return {
    notifications: state.incoming,
    isFetching: state.isFetching.incoming,
  };
};

const mapDispatch = dispatch => {
  return {
    getIncoming: () => dispatch(getIncoming()),
    update: (runId, requesterId, status) => {
      dispatch(updateIncoming(runId, requesterId, status));
    },
  };
};

export default connect(mapState, mapDispatch)(IncomingRequests);
