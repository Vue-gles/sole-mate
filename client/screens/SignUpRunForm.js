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

class SignUpRunForm extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      email: (navigation.getParam('email', 'default value')),
      password: (navigation.getParam('password', 'default value')),
      firstName: (navigation.getParam('firstName', 'default value')),
      lastName: (navigation.getParam('lastName', 'default value')),
      defaultAddress: (navigation.getParam('defaultAddress', 'default value')),
      imageUrl: (navigation.getParam('imageUrl', 'default value')),
      avgPace: null,
      avgMileage: null,
      goal: '',
      bio: '',
    };
  }

  static navigationOptions = {
    title: 'SignUpRun',
  };

  submitHandler = async () => {
    
    if(this.state.avgPace===''||typeof Number(this.state.avgPace)!=='number')
      alert("Please enter an average Pace")
    if(this.state.avgMileage===''|| typeof Number(this.state.avgPace) !=='number')
      alert("Please enter an average mileage")
    if(this.state.goal==='')
      alert("Please choose a goal")
    if(this.state.bio==='')
      alert("Please enter a bio")
    if (this.state.email && this.state.password
      && this.state.firstName && this.state.lastName
      && this.state.defaultAddress && this.state.imageUrl
      && this.state.avgPace && this.state.avgPace
      && this.state.goal && this.state.bio) {
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
      this.props.createUser(inputs);
      this.props.navigation.navigate('AuthLoading')
    }
  };

  render() {
      console.log(typeof this.state.avgMileage)
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
            <Text>Email From last page:{this.state.email}</Text>
            <Text>password From last page:{this.state.password}</Text>
            <Text>firstName From last page:{this.state.firstName}</Text>
            <Text>lastName From last page:{this.state.lastName}</Text>
            <Text>defaultAddress From last page:{this.state.defaultAddress}</Text>
            <Text>imageUrl From last page:{this.state.imageUrl}</Text>
            <TextInput
              value={this.state.avgPace}
              onChangeText={avgPace => this.setState({ avgPace })}
              placeholder={'Average Pace'}
              style={styles.input}
            />
            <TextInput
              value={this.state.avgMileage}
              onChangeText={avgMileage => this.setState({ avgMileage })}
              placeholder={'Average Mileage'}
              style={styles.input}
            />
            <TextInput
              value={this.state.goal}
              onChangeText={goal => this.setState({ goal })}
              placeholder={'Goal'}
              style={styles.input}
            />
            <Picker
              selectedValue={this.state.goal}
              style={{width: 100}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({goal: itemValue})
              }>
              <Picker.Item label="fitness" value="fitness" />
              <Picker.Item label="hobby" value="hobby" />
              <Picker.Item label="weightloss" value="weightloss" />
            </Picker>
            <TextInput
              value={this.state.bio}
              onChangeText={bio => this.setState({ bio })}
              placeholder={'Biography'}
              style={styles.input}
            />
            <Button title="Sign Up" onPress={this.submitHandler} />
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

export default connect(mapState, mapDispatch)(SignUpRunForm);
