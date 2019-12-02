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
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.brandName}>SoleMate</Text>
            <Image source={logo} style={styles.welcomeImage} />
            <KeyboardAvoidingView>
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
              />
              <Button
                title="Sign In"
                onPress={this.submitHandler}
                color={'#0F3E15'}
              />
            </KeyboardAvoidingView>
            <Button
              title="Create New User"
              onPress={() => navigate('SignUp')}
              color={'#0F3E15'}
            />
            {this.props.error && this.props.error.response && (
              <Text style={styles.error}>
                {' '}
                {this.props.error.response.data}{' '}
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
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
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
