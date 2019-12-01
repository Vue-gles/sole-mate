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

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('creatorName', 'Runs'),
    };
  };

  componentDidMount() {
    if (this.props.run && this.props.run.Creator) {
      const { firstName, lastName } = this.props.run.Creator;
      this.props.navigation.setParams({
        creatorName: `${firstName} ${lastName}`,
      });
    }
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
            <View style={styles.subContainer}>
              <Text>About {run.Creator.firstName}:</Text>
              <Text>Avg Pace: {run.Creator.avgPace} mph</Text>
              <Text>Avg Mileage: {run.Creator.avgMileage} miles</Text>
              <Text>Bio: {run.Creator.bio}</Text>
            </View>
            <View style={styles.subContainer}>
              <Text>About Run:</Text>
              <Text>
                Location: {run.street}, {run.city}, {run.state}
              </Text>
              <Text>Date: {moment(run.startTimeframe).format('MMMM Do')}</Text>
              <Text>
                Time: {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
                {moment(run.endTimeframe).format('h:mm:ss a')}
              </Text>
            </View>
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
  subContainer: {
    flex: 1,
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
