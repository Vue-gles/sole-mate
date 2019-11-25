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
import { Link } from 'react-router-native';

import { removeSingleRun, getSingleRun } from '../store/singleRun';
import { makeRequest } from '../store/outgoing';

class SingleRunScreen extends React.Component {
  constructor(props) {
    super(props);
    this.backHandler = this.backHandler.bind(this);
    this.requestHandler = this.requestHandler.bind(this);
    console.log('SingleRun View -------------------->');
  }

  componentDidMount() {
    const { runId } = this.props.match.params;
    this.props.getSingleRun(runId);
  }

  backHandler() {
    this.props.back();
  }

  requestHandler() {
    this.props.request(this.props.run.id);
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
            <Text>Location: {run.locationName}</Text>
            <Text>Date: {moment(run.startTimeframe).format('MMMM Do')}</Text>
            <Text>
              Time: {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
              {moment(run.endTimeframe).format('h:mm:ss a')}
            </Text>
            <Button title="Request Run" onPress={this.requestHandler} />
            <Link to="/" onPress={this.backHandler}>
              <Text>Back</Text>
            </Link>
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
