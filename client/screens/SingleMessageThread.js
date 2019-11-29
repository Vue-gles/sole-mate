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

class SingleMessageThread extends React.Component {
  constructor(props) {
    super(props);
    console.log('Single MessageThread View -------------------->');
  }

  static navigationOptions = {
    title: 'Messages',
  };

  render() {
    return (
      <View>
        <Text>Single Message Thread View</Text>
      </View>
    );
  }
}

const mapState = state => {
  return {
    singleThread: state.singleMessageThread,
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(SingleMessageThread);
