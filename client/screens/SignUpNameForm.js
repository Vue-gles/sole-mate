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

class SignUpNameForm extends React.Component {
    
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      email: (navigation.getParam('email', 'default value')),
      password: (navigation.getParam('password', 'default value')),
      firstName: '',
      lastName: '',
      defaultAddress: '',
      imageUrl: '',
      
    };
  }

  static navigationOptions = {
    title: 'SignUpName',
  };

  submitHandler = async () => {
    if(this.state.firstName==='')
      alert("Please enter a first name")
    if(this.state.lastName==='')
      alert("Please enter a last name")
    if(this.state.defaultAddress==='')
      alert("Please enter a address")
    if(this.state.imageUrl==='')
      alert("Please enter a imageUrl")
    if (this.state.firstName && this.state.lastName
        && this.state.defaultAddress && this.state.imageUrl) {
        this.props.navigation.navigate('SignUpRun',{
        email:this.state.email,
        password:this.state.password,
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        defaultAddress:this.state.defaultAddress,
        imageUrl:this.state.imageUrl
      })
    }
  };


  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;

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
            <Text>Email From last page:{this.state.email}</Text>
            <Text>password From last page:{this.state.password}</Text>
            <TextInput
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
              placeholder={'First Name'}
              style={styles.input}
            />
            <TextInput
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
              placeholder={'Last Name'}
              style={styles.input}
            />
            <TextInput
              value={this.state.defaultAddress}
              onChangeText={defaultAddress => this.setState({ defaultAddress })}
              placeholder={'Address'}
              style={styles.input}
            />
            <TextInput
              value={this.state.imageUrl}
              onChangeText={imageUrl => this.setState({ imageUrl })}
              placeholder={'Image Url'}
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

export default connect(mapState, mapDispatch)(SignUpNameForm);
