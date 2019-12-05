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
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';

import { auth } from '../store/user';

import { MonoText } from '../components/StyledText';
import logo from '../../assets/images/logo.png';

import { createUserThunk } from '../store/user';

class SignUpNameForm extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      email: navigation.getParam('email', 'default value'),
      password: navigation.getParam('password', 'default value'),
      firstName: '',
      lastName: '',
      defaultAddress: '',
      imageUrl:
        'https://galileo-camps.com/wp-content/themes/galileo-learning/library/img/default-person.png',
    };
  }

  static navigationOptions = {
    title: 'Sign Up',
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ imageUrl: result.uri });
    }
  };

  submitHandler = async () => {
    if (this.state.firstName === '') alert('Please enter a first name');
    if (this.state.lastName === '') alert('Please enter a last name');
    if (this.state.defaultAddress === '') alert('Please enter a address');
    if (this.state.imageUrl === '') alert('Please enter a imageUrl');
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.defaultAddress &&
      this.state.imageUrl
    ) {
      this.props.navigation.navigate('SignUpRun', {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        defaultAddress: this.state.defaultAddress,
        imageUrl: this.state.imageUrl,
      });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const { imageUrl } = this.state;
    return (
      <ScrollView>

    
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={64}
        behavior="padding"
        enabled
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.inner}>
            <Text style={styles.details}>First Name:</Text>
            <TextInput
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
              placeholder={'First Name'}
              style={styles.input}
            />

            <Text style={styles.details}>Last Name:</Text>
            <TextInput
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
              placeholder={'Last Name'}
              style={styles.input}
            />

            <Text style={styles.details}>Address:</Text>
            <TextInput
              value={this.state.defaultAddress}
              onChangeText={defaultAddress => this.setState({ defaultAddress })}
              placeholder={'Address'}
              style={styles.input}
            />

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                color={'#0F3E15'}
                title="Select Profile Picture"
                onPress={this._pickImage}
              />
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
              />
            </View>
            <Button
              title="Next"
              onPress={this.submitHandler}
              color={'#0F3E15'}
            />
            {this.props.error && this.props.error.response && (
              <Text style={styles.error}>
                {' '}
                {this.props.error.response.data}{' '}
              </Text>
            )}
          </View>
        </SafeAreaView>
       
      </KeyboardAvoidingView>
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
  details: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F3E15',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'flex-start',
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

export default connect(mapState, mapDispatch)(SignUpNameForm);
