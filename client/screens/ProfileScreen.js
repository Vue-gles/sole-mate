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
} from 'react-native';
import { connect } from 'react-redux';

import { auth } from '../store/user';
import { logout } from '../store/user';

import { MonoText } from '../components/StyledText';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Profile',
  };

  signOutAsync = async () => {
    await this.props.logout();
    if (this.props.user && !this.props.user.id) {
      this.props.navigation.navigate('Auth');
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Image
              source={{
                uri: this.props.user.imageUrl,
              }}
              style={styles.welcomeImage}
            />
            <Text style={styles.name}>
              {this.props.user.firstName} {this.props.user.lastName}
            </Text>
            <Text style={styles.details}>Email: {this.props.user.email}</Text>
            <Text style={styles.details}>
              Address: {this.props.user.defaultAddress}
            </Text>
            <Text style={styles.details}>
              Average Pace: {this.props.user.avgPace}
            </Text>
            <Text style={styles.details}>
              Average Mileage: {this.props.user.avgMileage}
            </Text>
            <Text style={styles.details}>Goal: {this.props.user.goal}</Text>
            <Text style={styles.details}>Bio: {this.props.user.bio}</Text>
            <View style={styles.btnContainer}>
              <Button
                title="Edit Profile"
                color={'white'}
                onPress={() => this.props.navigation.navigate('ProfileForm')}
              />
            </View>
            <Button
              title="Sign Out"
              onPress={this.signOutAsync}
              color={'#124D1A'}
            />
            {this.props.error && this.props.error.response && (
              <Text style={styles.error}>
                {' '}
                {this.props.error.response.data}{' '}
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.workoutButton}
          onPress={() => this.props.navigation.navigate('Stats')}
          >
            <Text>View my stats</Text>
          </TouchableOpacity>
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
    paddingTop: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303731',
  },
  details: {
    color: '#525E54',
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
    borderRadius: 200 / 2,
    overflow: 'hidden',
  },
  error: {
    color: `#eb4034`,
  },
  btnContainer: {
    backgroundColor: '#124D1A',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },   
  workoutButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffc0cb',
    padding: 10,
    margin: 5,
    borderRadius: 10,
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
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(ProfileScreen);
