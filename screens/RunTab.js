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

  render() {
    return (
      <NativeRouter>
        <Route exact path={'/'} component={RunResultsScreen} />
        <Route path={'/runs/:runId'} component={SingleRunScreen} />
      </NativeRouter>
    );
  }
}

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(RunTab);
