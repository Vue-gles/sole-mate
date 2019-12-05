import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  Button,
  StatusBar,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import { me } from '../store/user';

import { MonoText } from '../components/StyledText';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getMe();
    this.props.navigation.navigate(
      this.props.user && this.props.user.id ? 'Main' : 'Auth'
    );
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapState = state => {
  return {
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    getMe: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(AuthLoadingScreen);
