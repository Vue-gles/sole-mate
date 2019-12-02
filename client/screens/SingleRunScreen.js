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
              <Text style={styles.header}>
                {run.Creator.firstName} {run.Creator.lastName}{' '}
              </Text>
              <Text style={styles.details}>{run.Creator.bio}</Text>
              <Text style={styles.details}>
                Avg. Pace {run.Creator.avgPace} mph
              </Text>
              <Text style={styles.details}>
                Avg. Mileage {run.Creator.avgMileage} miles
              </Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.header}>Run Details</Text>
              <Text style={styles.details}>{run.prefferedMileage} mile(s)</Text>
              <Text style={styles.details}>
                {run.street}, {run.city}, {run.state}
              </Text>
              <Text style={styles.details}>
                {moment(run.startTimeframe).format('MMMM Do')}
              </Text>
              <Text style={styles.details}>
                {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
                {moment(run.endTimeframe).format('h:mm:ss a')}
              </Text>
              <Button
                title="Request Run"
                onPress={this.requestHandler}
                color={'#0F3E15'}
              />
            </View>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303731',
  },
  details: {
    color: '#525E54',
  },
  runImage: {
    width: 300,
    height: 300,
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
