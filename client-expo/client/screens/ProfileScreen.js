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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Textarea} from 'native-base';
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
      <ScrollView>
        <Container style={{backgroundColor: '#ebf0ec'}}>
        <Image
            source={{
              uri: this.props.user.imageUrl,
            }}
            style={styles.welcomeImage}
          />
          <Content>
            <List>
              <ListItem>
                <Text style={{ fontWeight: 'bold' }}>Name:</Text>
                <Text>
                  {' '}
                  {this.props.user.firstName} {this.props.user.lastName}
                </Text>
              </ListItem>
              <ListItem>
                <Text style={{ fontWeight: 'bold' }}>Email:</Text>
                <Text> {this.props.user.email}</Text>
              </ListItem>
              <ListItem>
                <Text style={{ fontWeight: 'bold' }}>Average pace:</Text>
                <Text> {this.props.user.avgPace} </Text>
              </ListItem>
              <ListItem>
                <Text style={{ fontWeight: 'bold' }}>Average mileage:</Text>
                <Text> {this.props.user.avgMileage}</Text>
              </ListItem>
              <ListItem>
                <Text style={{ fontWeight: 'bold' }}>Goal:</Text>
                <Text> {this.props.user.goal}</Text>
              </ListItem>
              <View paddingVertical={5}/>
              <Text style={{ fontWeight: 'bold', textAlign:'center', fontSize: 15 }}>Bio</Text>
              <Textarea rowSpan={5} style={{marginHorizontal: 10}} bordered placeholder={this.props.user.bio} disabled={true}/>
            </List>
            <View paddingVertical={8}/>
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
          </Content>
        </Container>
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
    borderRadius: 100,
    overflow: 'hidden',
    marginTop: 30,
    alignSelf: 'center'
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
    marginHorizontal: 50
  },
  workoutButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#bad4c1',
    padding: 12,
    margin: 5,
    borderRadius: 10,
    marginHorizontal: 50,
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
