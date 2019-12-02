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
  View,
  Picker,
} from 'react-native';
import { connect } from 'react-redux';

import { auth } from '../store/user';

import { MonoText } from '../components/StyledText';

import { createUserThunk } from '../store/user';

class SignUpFormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  static navigationOptions = {
    title: 'SignUp',
  };

  submitHandler = async () => {
    if(this.state.email==='')
      alert("Please enter an email")
    if(this.state.password==='')
      alert("Please enter a password")
    if (this.state.email && this.state.password) {
      this.props.navigation.navigate('SignUpName',{
        email:this.state.email,
        password:this.state.password
      })
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
       <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* <ScrollView style={styles.scrollView}> */}
          <View style={styles.container}>
            {/* <Button title="Go Back to Login Screen" onPress={() => navigate('AuthLoading')} /> */}
            <Image
              source={{
                uri:
                  'https://p7.hiclipart.com/preview/751/476/837/running-silhouette-clip-art-silhouette.jpg',
              }}
              style={styles.welcomeImage}
            />
            <Text style={styles.getStartedText}>Sole-Mate</Text>
            <Text style={styles.getStartedText}>Sign Up</Text>
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
            
            <Button
              title="Next"
              onPress={this.submitHandler}
            />
            <Button
              title="Go Back to Login Screen"
              onPress={() => navigate('AuthLoading')}
            />
            {this.props.error && this.props.error.response && (
              <Text style={styles.error}>
                {' '}
                {this.props.error.response.data}{' '}
              </Text>
            )}
          </View>
        {/* </ScrollView> */}
      </SafeAreaView>
       </View>
       </ScrollView>
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
    width: 100,
    height: 80,
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
