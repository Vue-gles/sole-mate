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

import { updateProfile } from '../store/user';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email,
      // password: '',
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      defaultAddress: this.props.user.defaultAddress,
      imageUrl: this.props.user.imageUrl,
      avgPace: String(this.props.user.avgPace),
      avgMileage: String(this.props.user.avgPace),
      goal: this.props.user.goal,
      bio: this.props.user.bio,
    };
  }

  static navigationOptions = {
    title: 'Edit Profile',
  };

  submitHandler = async () => {
    if (
      this.state.email &&
      //  && this.state.password
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
        // password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        defaultAddress: this.state.defaultAddress,
        imageUrl: this.state.imageUrl,
        avgPace: this.state.avgPace,
        avgMileage: this.state.avgMileage,
        goal: this.state.goal,
        bio: this.state.bio,
      };
      this.props.update(inputs);
      this.props.navigation.navigate('Profile');
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.container}>
          <SafeAreaView>
            {/* <ScrollView style={styles.scrollView}> */}
            <View>
              {/* <Button title="Go Back to Login Screen" onPress={() => navigate('AuthLoading')} /> */}
              <Image
                source={{
                  uri: this.props.user.imageUrl,
                }}
                style={styles.welcomeImage}
              />

              <Text style={styles.details}>Email:</Text>
              <TextInput
                value={this.state.email}
                onChangeText={email =>
                  this.setState({ email: email.toLowerCase() })
                }
                placeholder={'Email'}
                style={styles.input}
              />
              {/* <TextInput
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              placeholder={'Password'}
              style={styles.input}
            /> */}

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
                onChangeText={defaultAddress =>
                  this.setState({ defaultAddress })
                }
                placeholder={'Address'}
                style={styles.input}
              />

              <Text style={styles.details}>Profile Picture:</Text>
              <TextInput
                value={this.state.imageUrl}
                onChangeText={imageUrl => this.setState({ imageUrl })}
                placeholder={'Image Url'}
                style={styles.input}
              />

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

              <Text style={styles.details}>Goal:</Text>
              <Picker
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

              <Text style={styles.details}>Bio:</Text>
              <TextInput
                value={this.state.bio}
                onChangeText={bio => this.setState({ bio })}
                placeholder={'Biography'}
                style={styles.input}
              />
              <View style={styles.btnContainer}>
                <Button
                  title="Update"
                  color={'white'}
                  onPress={this.submitHandler}
                />
              </View>

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
    paddingTop: 30,
  },
  details: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F3E15',
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
    borderRadius: 200 / 2,
    overflow: 'hidden',
    padding: '14%',
  },
  btnContainer: {
    backgroundColor: '#124D1A',
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
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
    update: user => dispatch(updateProfile(user)),
  };
};

export default connect(mapState, mapDispatch)(ProfileForm);
