import React from 'react';
import {
  AsyncStorage,
  Button,
  StatusBar,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { getRuns } from '../store/runs';

class RunResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('RunResults View -------------------->');
  }

  static navigationOptions = {
    title: 'Run Results',
  };

  componentDidMount() {
    this.props.getRuns();
  }

  render() {
    return (
      <View>
        {this.props.runs.map(run => {
          return (
            <View key={run.id} style={styles.runAd}>
              <Image
                source={{
                  uri: run.Creator.imageUrl,
                }}
                style={styles.runImage}
              />
              <Text>Creator Name: {run.Creator.firstName}</Text>
              <Text>Run ID: {run.id}</Text>
              <Text>Location: {run.locationName}</Text>
              <Text>Date: {moment(run.startTimeframe).format('MMMM Do')}</Text>
              <Text>
                Time: {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
                {moment(run.endTimeframe).format('h:mm:ss a')}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  runAd: {
    padding: 10,
  },
  runImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});

const mapState = state => {
  return {
    runs: state.runs,
  };
};

const mapDispatch = dispatch => {
  return {
    getRuns: () => dispatch(getRuns()),
  };
};

export default connect(mapState, mapDispatch)(RunResultsScreen);
