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
  Item,
  Picker,
} from 'react-native';
import { connect } from 'react-redux';

import { auth } from '../store/user';

import { MonoText } from '../components/StyledText';
import logo from '../../assets/images/logo.png';

import { createUserThunk } from '../store/user';

class SignUpRunForm extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      email: navigation.getParam('email', 'default value'),
      password: navigation.getParam('password', 'default value'),
      firstName: navigation.getParam('firstName', 'default value'),
      lastName: navigation.getParam('lastName', 'default value'),
      defaultAddress: navigation.getParam('defaultAddress', 'default value'),
      imageUrl: navigation.getParam('imageUrl', 'default value'),
      avgPace: null,
      avgMileage: null,
      goal: 'fitness',
      bio: '',
    };
  }

  static navigationOptions = {
    title: 'SignUpRun',
  };

  submitHandler = async () => {
    if (
      this.state.avgPace === '' ||
      typeof Number(this.state.avgPace) !== 'number'
    )
      alert('Please enter an average Pace');
    if (
      this.state.avgMileage === '' ||
      typeof Number(this.state.avgPace) !== 'number'
    )
      alert('Please enter an average mileage');
    if (this.state.goal === '') alert('Please choose a goal');
    if (this.state.bio === '') alert('Please enter a bio');
    if (
      this.state.email &&
      this.state.password &&
      this.state.firstName &&
      this.state.lastName &&
      this.state.defaultAddress &&
      this.state.imageUrl &&
      this.state.avgPace &&
      this.state.avgPace &&
      this.state.goal &&
      this.state.bio
    ) {
      const inputs = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        defaultAddress: this.state.defaultAddress,
        imageUrl: this.state.imageUrl,
        avgPace: this.state.avgPace,
        avgMileage: this.state.avgMileage,
        goal: this.state.goal,
        bio: this.state.bio,
      };
      await this.props.createUser(inputs);
      this.props.navigation.navigate('AuthLoading', {
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
            <Text style={styles.details}>Avg. Pace:</Text>
            <TextInput
              value={this.state.avgPace}
              onChangeText={avgPace => this.setState({ avgPace })}
              placeholder={'Average Pace'}
              style={styles.input}
            />

            <Text style={styles.details}>Avg. Mileage:</Text>
            <TextInput
              value={this.state.avgMileage}
              onChangeText={avgMileage => this.setState({ avgMileage })}
              placeholder={'Average Mileage'}
              style={styles.input}
            />

            <View>
              <Text style={styles.details}>Goal:</Text>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.goal}
                style={{ width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ goal: itemValue })
                }
              >
                <Picker.Item label="fitness" value="fitness" />
                <Picker.Item label="hobby" value="hobby" />
                <Picker.Item label="weightloss" value="weightloss" />
              </Picker>
            </View>

            <Text style={styles.details}>Personal Bio:</Text>
            <TextInput
              value={this.state.bio}
              onChangeText={bio => this.setState({ bio })}
              placeholder={'Biography'}
              style={styles.input}
            />
            <Button
              title="Sign Up"
              color={'#0F3E15'}
              onPress={this.submitHandler}
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
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    signin: (inputs, method) => dispatch(auth(inputs, method)),
    createUser: user => dispatch(createUserThunk(user)),
  };
};

export default connect(mapState, mapDispatch)(SignUpRunForm);
