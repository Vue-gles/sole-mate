import * as WebBrowser from 'expo-web-browser';
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
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { auth } from '../store/user';

import { MonoText } from '../components/StyledText';

import logo from '../../assets/images/logo.png';

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  submitHandler = async () => {
    if (this.state.email === '') alert('Please enter an email');
    if (this.state.password === '') alert('Please enter a password');
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
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={64}
        behavior="padding"
        enabled
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.inner}>
            <Text style={styles.brandName}>SoleMate</Text>
            <Image source={logo} style={styles.welcomeImage} />
            <TextInput
              value={this.state.email}
              onChangeText={email =>
                this.setState({ email: email.toLowerCase() })
              }
              placeholder={'Email'}
              style={styles.input}
            />
            <TextInput
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              placeholder={'Password'}
              style={styles.input}
              secureTextEntry={true}
            />
            <Button
              title="Sign In"
              onPress={this.submitHandler}
              color={'#124D1A'}
            />
            <Button
              title="Create New User"
              onPress={() => navigate('SignUp')}
              color={'#124D1A'}
            />
            {this.props.error && this.props.error.response && (
              <Text style={styles.error}>
                {' '}
                {this.props.error.response.data}{' '}
              </Text>
            )}
            <View style={{ flex: 1 }} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
  brandName: {
    fontSize: 50,
    color: 'forestgreen',
  },
  input: {
    width: 200,
    height: 44,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 200,
    height: 200,
    marginTop: 3,
  },
  error: {
    color: `#eb4034`,
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
