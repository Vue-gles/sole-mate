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

import { connect } from 'react-redux';
import { logout } from '../store/user';

import { MonoText } from '../components/StyledText';
import { NavigationEvents } from 'react-navigation';


class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Home',
  };

  _signOutAsync = async () => {
    await this.props.logout();
    if (this.props.user && !this.props.user.id) {
      this.props.navigation.navigate('Auth');
    }
  };
  render() {
    console.log('HomeScreen View ------------------->');
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={{
                uri:
                  'https://p7.hiclipart.com/preview/751/476/837/running-silhouette-clip-art-silhouette.jpg',
              }}
              style={styles.welcomeImage}
            />
            <Text style={styles.getStartedText}>SoleMate</Text>
          </View>

          <View style={styles.getStartedContainer}>
            <Text>Welcome, {this.props.user.firstName}!</Text>
            <Button title="Run Now" onPress={() => navigate('Settings')} />
            <Button title="Run Later" onPress={() => this.props.navigation.navigate('RunForm')} />

            <Button
              title="Actually, sign me out :)"
              onPress={this._signOutAsync}
            />
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
    width: 100,
    height: 80,
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
});

const mapState = state => {
  return {
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(HomeScreen);
