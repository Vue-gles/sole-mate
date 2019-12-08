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
import {Spinner} from 'native-base'

import { getMessageThreads } from '../store/messageThreads';
import { getMessages } from '../store/singleMessageThread';
import { getPartner } from '../store/partner';

class MessageThreads extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);

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
    console.log('------->',this.props.isFetching)
    return !this.props.isFetching ? (this.props.threads.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.props.threads.map(thread => {
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
                    Messages with {thread.firstName} {thread.lastName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.container}>
        <View style={styles.nothreads}>
          <Text style={styles.none}>No messages</Text>
        </View>
      </SafeAreaView>
    )) : <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Spinner color='green'/>
</View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nothreads: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    margin: 5,
    marginRight: 15,
    borderRadius: 60 / 2,
    overflow: 'hidden',
  },
  none: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303731',
  },
});

const mapState = state => {
  return {
    threads: state.messageThreads,
    isFetching: state.isFetching.messageThreads
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
