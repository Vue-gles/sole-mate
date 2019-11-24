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

import { removeSingleRun } from '../store/singleRun';

class SingleRunScreen extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    console.log('SingleRun View -------------------->');
  }
  static navigationOptions = {
    title: 'Single Run',
  };

  clickHandler() {
    this.props.back();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Single Run</Text>
        <Button title="Back to all runs" onPress={this.clickHandler} />
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
    width: 150,
    height: 110,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {
    back: () => dispatch(removeSingleRun()),
  };
};

export default connect(mapState, mapDispatch)(SingleRunScreen);
