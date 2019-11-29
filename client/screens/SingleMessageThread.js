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
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import moment from 'moment';

class SingleMessageThread extends React.Component {
  constructor(props) {
    super(props);
    console.log('Single MessageThread View -------------------->');
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('partnerName', 'Messages'),
    };
  };

  componentDidUpdate() {
    console.log('this.props.messages', this.props.messages);
    if (this.props.messages && this.props.messages.Sender) {
      this.props.navigation.setParams({
        partnerName: this.props.messages.Sender.firstName,
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.props.messages && this.props.messages.length ? (
            this.props.messages.map(message => {
              return (
                <View key={message.id} style={styles.message}>
                  <Image
                    source={{
                      uri: message.Sender.imageUrl,
                    }}
                    style={styles.userImage}
                  />
                  <Text>{message.content}</Text>
                </View>
              );
            })
          ) : (
            <View style={styles.message}>
              <Text>No messages</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  message: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  userImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    borderRadius: 60 / 2,
    overflow: 'hidden',
  },
});

const mapState = state => {
  return {
    messages: state.singleMessageThread,
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(SingleMessageThread);
