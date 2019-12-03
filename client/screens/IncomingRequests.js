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

import socket from '../socket/index';

import { getIncoming, updateIncoming } from '../store/incoming';

class IncomingRequests extends React.Component {
  constructor(props) {
    super(props);
    this.requestUpdateHandler = this.requestUpdateHandler.bind(this);

  }
  async componentDidMount() {
    await this.props.getIncoming();
  }
  async requestUpdateHandler(runId, requesterId, status) {
    await this.props.update(runId, requesterId, status);
    socket.emit('requestUpdate');
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
            })
          ) : (
            <View style={styles.notification}>
              <Text>No incoming notifications</Text>
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
});

const mapState = state => {
  return {
    notifications: state.incoming,
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
