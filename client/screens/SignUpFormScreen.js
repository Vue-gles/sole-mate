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
  Picker,
} from 'react-native';
import { connect } from 'react-redux';

import { auth } from '../store/user';

import { MonoText } from '../components/StyledText';
import logo from '../../assets/images/logo.png';

import { createUserThunk } from '../store/user';

class SignUpFormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  static navigationOptions = {
    title: 'Sign Up',
  };

  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  submitHandler = async () => {
    const isValid = this.emailIsValid(this.state.email);
    if (this.state.email === '') alert('Please enter an email');
    else if (!isValid) alert('Please enter a valid email');
    else if (this.state.password === '') alert('Please enter a password');
    if (this.state.email && isValid && this.state.password) {
      this.props.navigation.navigate('SignUpName', {
        email: this.state.email,
        password: this.state.password,
      });
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
            <Text style={styles.details}>Email:</Text>
            <TextInput
              value={this.state.email}
              onChangeText={email =>
                this.setState({ email: email.toLowerCase() })
              }
              placeholder={'Email'}
              style={styles.input}
            />
            <Text style={styles.details}>Password:</Text>
            <TextInput
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              placeholder={'Password'}
              style={styles.input}
              secureTextEntry={true}
            />
            <Button
              title="Next"
              color={'#0F3E15'}
              onPress={this.submitHandler}
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
    paddingTop: 100,
  },
  details: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F3E15',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
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
  error: {
    color: `#eb4034`,
  },
});

const mapState = state => {
  return {
    user: state.user,
    // error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    signin: (inputs, method) => dispatch(auth(inputs, method)),
    createUser: user => dispatch(createUserThunk(user)),
  };
};

export default connect(mapState, mapDispatch)(SignUpFormScreen);
