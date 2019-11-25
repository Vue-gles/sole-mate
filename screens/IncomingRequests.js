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

import { getIncoming, updateIncoming } from '../store/incoming';

class IncomingRequests extends React.Component {
  constructor(props) {
    super(props);
    this.requestUpdateHandler = this.requestUpdateHandler.bind(this);
    console.log('Incoming View -------------------->');
  }
  async componentDidMount() {
    await this.props.getIncoming();
  }
  requestUpdateHandler(runId, requesterId, status) {
    //runId, requesterId, status
    //this.props.update()
    //console.log('what up evt', evt);
    this.props.update(runId, requesterId, status)
    

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
                <Image
                  source={{
                    uri: notification.Request.imageUrl,
                  }}
                  style={styles.runImage}
                />
                <Text>
                  {notification.Request.firstName} would like to run with you
                </Text>
                <Button title="✓" onPress={() => this.requestUpdateHandler(notification.runId, notification.requesterId, 'accepted')} />
                <Button title="X" onPress={() => this.requestUpdateHandler(notification.runId, notification.requesterId, 'rejected')}/>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  runImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
    update: (runId, requesterId, status) =>{
      console.log(`OKAY, HERE WE GO PLEASE WORK: runId: ${runId} requester: ${requesterId} status: ${status}`)
      dispatch(updateIncoming(runId, requesterId, status))},
  };
};

export default connect(mapState, mapDispatch)(IncomingRequests);
