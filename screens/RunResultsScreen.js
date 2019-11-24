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
        <Text>All runs</Text>
      </View>
    );
  }
}

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
