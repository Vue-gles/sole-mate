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
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import moment from 'moment';

import socket from '../socket/index';

import { removeSingleRun, getSingleRun } from '../store/singleRun';
import { makeRequest } from '../store/outgoing';

class SingleRunScreen extends React.Component {
  constructor(props) {
    super(props);
    this.requestHandler = this.requestHandler.bind(this);
    console.log('SingleRun View -------------------->');
  }

  async requestHandler() {
    await this.props.request(this.props.run.id);
    socket.emit('newRequest');
  }

  render() {
    const { run } = this.props;
    return (
      <View style={styles.container}>
        {this.props.run && this.props.run.id && (
          <View style={styles.container}>
            <Image
              source={{
                uri: run.Creator.imageUrl,
              }}
              style={styles.runImage}
            />
            <Text>Creator Name: {run.Creator.firstName}</Text>
            <Text>Avg Pace: {run.Creator.avgPace}</Text>
            <Text>Avg Mileage: {run.Creator.avgMileage}</Text>
            <Text>Bio: {run.Creator.bio}</Text>
            <Text>Location: {run.locationName}</Text>
            <Text>Date: {moment(run.startTimeframe).format('MMMM Do')}</Text>
            <Text>
              Time: {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
              {moment(run.endTimeframe).format('h:mm:ss a')}
            </Text>
            <Button title="Request Run" onPress={this.requestHandler} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  runImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 30,
    marginLeft: -10,
    borderRadius: 300 / 2,
    overflow: 'hidden',
  },
});

const mapState = state => {
  return {
    run: state.singleRun,
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleRun: id => dispatch(getSingleRun(id)),
    back: () => dispatch(removeSingleRun()),
    request: runId => dispatch(makeRequest(runId)),
  };
};

export default connect(mapState, mapDispatch)(SingleRunScreen);
