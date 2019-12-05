import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import TabBarIcon from '../components/TabBarIcon';

import { connect } from 'react-redux';
import { Notifications } from 'expo';
import { MonoText } from '../components/StyledText';
import { NavigationEvents } from 'react-navigation';

import logo from '../../assets/images/logo.png';

import registerForPushNotificationsAsync from './PushNotifications';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   notification: {},
    // };
  }

  componentDidMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    // this.setState({ notification: notification });
    alert(notification.data.title);
  };

  render() {
    console.log('HomeScreen View ------------------->');
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text style={styles.brandName}>SoleMate</Text>
            <Image source={logo} style={styles.welcomeImage} />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.subheader}>
              Welcome, {this.props.user.firstName}!
            </Text>
            <View style={styles.buttons}>
              <View style={styles.btnContainer}>
                <Button
                  title="Run Now"
                  onPress={() => this.props.navigation.navigate('RunNowForm')}
                  color={'white'}
                />
              </View>
              <View style={styles.btnContainer}>
                <Button
                  title="Run Later"
                  onPress={() => this.props.navigation.navigate('RunForm')}
                  color={'white'}
                />
              </View>
              <Button
                title="My Profile"
                onPress={() => this.props.navigation.navigate('Profile')}
                color={'#124D1A'}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  brandName: {
    fontSize: 50,
    color: 'forestgreen',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 20,
    color: 'forestgreen',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  buttons: {
    marginTop: 30,
  },
  btnContainer: {
    backgroundColor: '#124D1A',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

const mapState = state => {
  return {
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(HomeScreen);
