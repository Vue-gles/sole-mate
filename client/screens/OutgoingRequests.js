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
    //console.log('Outgoing View -------------------->');
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
                    <Text>
                      {notification.run.Creator.firstName} hasn't responded to
                      your request yet.
                    </Text>
                  ) : notification.status === 'accepted' ? (
                    <Text>
                      {notification.run.Creator.firstName} accepted your
                      request.
                    </Text>
                  ) : (
                    <Text>
                      {notification.run.Creator.firstName} isn't available to
                      run.
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
