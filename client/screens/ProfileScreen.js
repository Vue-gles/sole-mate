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

import { MonoText } from '../components/StyledText';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
          <Text style={styles.getStartedText}>Your Profile</Text>
            <Image
              source={{
                uri:
                this.props.user.imageUrl,
              }}
              style={styles.welcomeImage}
            />
            <Text style={styles.getStartedText}>{this.props.user.firstName} {this.props.user.lastName}</Text>
            <Text style={styles.getStartedText}>Address: {this.props.user.defaultAddress}</Text>
            <Text style={styles.getStartedText}>Average Pace: {this.props.user.avgPace}</Text>
            <Text style={styles.getStartedText}>Average Mileage: {this.props.user.avgMileage}</Text>
            <Text style={styles.getStartedText}>Goal: {this.props.user.goal}</Text>
            <Text style={styles.getStartedText}>Bio: {this.props.user.bio}</Text>
            <Button title="Edit Profile" onPress={() => this.props.navigation.navigate('ProfileForm')} />

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
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(mapState, mapDispatch)(ProfileScreen);
