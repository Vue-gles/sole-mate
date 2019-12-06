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
import { getPastRunsThunk } from '../store/pastRuns';
import { logout } from '../store/user';

import { MonoText } from '../components/StyledText';
//comment
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('hello');
    this.props.getPastRuns('past');
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={{
              uri: this.props.user.imageUrl,
            }}
            style={styles.welcomeImage}
          />
          <View paddingVertical={20} />
          <View style={styles.profDetails}>
            <Text>
              {this.props.user.firstName} {(this.props.user.lastName, '\n')}
            </Text>
            <View style={{alignContent: 'flex-start'}}>
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
            </View>
          </View>
            <View paddingVertical={20} />
          <View style={styles.btnContainer}>
            <Button
              title="Edit Profile"
              color={'white'}
              onPress={() => this.props.navigation.navigate('ProfileForm')}
            />
          </View>
          {this.props.error && this.props.error.response && (
            <Text style={styles.error}> {this.props.error.response.data} </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.workoutButton}
          onPress={() =>
            this.props.navigation.navigate('Stats', {
              pastRuns: this.props.pastRuns,
            })
          }
        >
          <Text>View my stats</Text>
        </TouchableOpacity>
        <Button
          title="Sign Out"
          onPress={this.signOutAsync}
          color={'#124D1A'}
        />
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
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303731',
  },
  profDetails: {
    padding: 30,
    marginVertical: 10,
    marginHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#c8e6d0',
    borderRadius: 8,
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
    marginHorizontal: 130,
  },
});

const mapState = state => {
  return {
    user: state.user,
    error: state.user.error,
    pastRuns: state.pastRuns,
  };
};

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getPastRuns: type => dispatch(getPastRunsThunk(type)),
  };
};

export default connect(mapState, mapDispatch)(ProfileScreen);
