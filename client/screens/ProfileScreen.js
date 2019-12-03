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
          <Text style={styles.name}>Your Profile</Text>
            <Image
              source={{
                uri:
                this.props.user.imageUrl,
              }}
              style={styles.welcomeImage}
            />
            <Text style={styles.name}>{this.props.user.firstName} {this.props.user.lastName}</Text>
            <Text style={styles.details}>Email: {this.props.user.email}</Text>
            <Text style={styles.details}>Address: {this.props.user.defaultAddress}</Text>
            <Text style={styles.details}>Average Pace: {this.props.user.avgPace}</Text>
            <Text style={styles.details}>Average Mileage: {this.props.user.avgMileage}</Text>
            <Text style={styles.details}>Goal: {this.props.user.goal}</Text>
            <Text style={styles.details}>Bio: {this.props.user.bio}</Text>
            <Button title="Edit Profile" color={'#0F3E15'} onPress={() => this.props.navigation.navigate('ProfileForm')} />

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
    marginTop: 3,
    marginLeft: -10,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    padding: '14%',
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
