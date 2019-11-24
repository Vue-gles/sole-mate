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

import { getRuns } from '../store/runs';
import SingleRunScreen from './SingleRunScreen';
import RunResultsScreen from './RunResultsScreen';

class RunTab extends React.Component {
  constructor(props) {
    super(props);
    console.log('RunTab View -------------------->');
  }

  static navigationOptions = {
    title: 'Run Results',
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        {this.props.singleRun && this.props.singleRun.id ? (
          <SingleRunScreen />
        ) : (
          <RunResultsScreen />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapState = state => {
  return {
    runs: state.runs,
    singleRun: state.singleRun,
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(RunTab);
