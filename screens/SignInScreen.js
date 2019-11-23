import * as WebBrowser from 'expo-web-browser';
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

import { auth } from '../store/user';

import { MonoText } from '../components/StyledText';

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  static navigationOptions = {
    title: 'Sign in to SoleMate',
  };

  submitHandler = async () => {
    if (this.state.email && this.state.password) {
      const inputs = {
        email: this.state.email,
        password: this.state.password,
      };
      await this.props.signin(inputs, 'login');
    }
    if (this.props.user && this.props.user.id) {
      this.props.navigation.navigate('Main');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri:
              'https://p7.hiclipart.com/preview/751/476/837/running-silhouette-clip-art-silhouette.jpg',
          }}
          style={styles.welcomeImage}
        />
        <Text style={styles.getStartedText}>Sole-Mate</Text>
        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={'Password'}
          style={styles.input}
        />
        <Button title="Sign In" onPress={this.submitHandler} />
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
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});

const mapState = state => {
  return {
    user: state.user,
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    signin: (inputs, method) => dispatch(auth(inputs, method)),
  };
};

export default connect(mapState, mapDispatch)(SignInScreen);
