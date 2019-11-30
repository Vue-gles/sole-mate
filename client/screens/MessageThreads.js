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
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import moment from 'moment';

import { getMessageThreads } from '../store/messageThreads';
import { getMessages } from '../store/singleMessageThread';
import { getPartner } from '../store/partner';

class MessageThreads extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    console.log('MessageThreads View -------------------->');
  }
  static navigationOptions = {
    title: 'Messages',
  };

  async componentDidMount() {
    await this.props.getThreads();
  }

  async clickHandler(partnerId) {
    await this.props.getMessages(partnerId);
    await this.props.getPartner(partnerId);
    this.props.navigation.navigate('SingleThread');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.props.threads && this.props.threads.length ? (
            this.props.threads.map(thread => {
              return (
                <TouchableWithoutFeedback
                  key={thread.id}
                  onPress={() => this.clickHandler(thread.id)}
                >
                  <View style={styles.thread}>
                    <Image
                      source={{
                        uri: thread.imageUrl,
                      }}
                      style={styles.userImage}
                    />
                    <Text>
                      Message thread with {thread.firstName} {thread.lastName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })
          ) : (
            <View style={styles.thread}>
              <Text>No Message Threads.</Text>
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
  thread: {
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
    threads: state.messageThreads,
  };
};

const mapDispatch = dispatch => {
  return {
    getThreads: () => dispatch(getMessageThreads()),
    getMessages: id => dispatch(getMessages(id)),
    getPartner: id => dispatch(getPartner(id)),
  };
};

export default connect(mapState, mapDispatch)(MessageThreads);
