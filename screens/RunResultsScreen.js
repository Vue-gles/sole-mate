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
              <Text>Run ID: {run.id}</Text>
              <Text>Location: {run.locationName}</Text>
              <Text>
                Timeframe: {run.startTimeframe} - {run.endTimeframe}
              </Text>
              <Text>Creator ID: {run.creatorId}</Text>
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
