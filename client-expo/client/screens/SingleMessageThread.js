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
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import moment from 'moment';

import socket from '../socket/index';

import { sendMessage } from '../store/singleMessageThread';

class SingleMessageThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
    this.submitHandler = this.submitHandler.bind(this);

  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('partnerName', 'Messages'),
    };
  };

  componentDidMount() {
    if (this.props.partner && this.props.partner.firstName) {
      const { firstName, lastName } = this.props.partner;
      this.props.navigation.setParams({
        partnerName: `${firstName} ${lastName}`,
      });
    }
  }

  async submitHandler() {
    console.log('this.state', this.state);
    if (this.state.content) {
      await this.props.sendMessage(this.props.partner.id, this.state.content);
      socket.emit('newMessage', this.props.partner.id);
      this.setState({ content: '' });
    }
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={64}
        behavior="padding"
        enabled
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.msgContainer}
            ref={ref => (this.scrollView = ref)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}
          >
            {this.props.messages && this.props.messages.length ? (
              this.props.messages.map(message => {
                return (
                  <View
                    key={message.id}
                    style={
                      message.Sender.id === this.props.user.id
                        ? styles.user
                        : styles.partner
                    }
                  >
                    <Image
                      source={{
                        uri: message.Sender.imageUrl,
                      }}
                      style={styles.userImage}
                    />
                    <Text
                      style={
                        message.Sender.id === this.props.user.id
                          ? styles.userMsg
                          : styles.partnerMsg
                      }
                    >
                      {message.content}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View style={styles.message}>
                <Text>No messages</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.bottomView}>
            <View style={styles.keyboard}>
              <TextInput
                value={this.state.content}
                onChangeText={content => this.setState({ content })}
                placeholder={'Text Message'}
                style={styles.input}
              ></TextInput>
              <View style={styles.btnContainer}>
                <Button
                  title="↑ "
                  onPress={this.submitHandler}
                  color={'white'}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    height: '85%',
  },
  msgContainer: { width: '100%', marginBottom: 50 },
  partner: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  partnerMsg: {
    backgroundColor: '#dfe5eb',
    marginLeft: 5,
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  user: {
    padding: 10,
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userMsg: {
    backgroundColor: '#21752B',
    color: 'white',
    marginRight: 5,
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  userImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 40 / 2,
    overflow: 'hidden',
  },
  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
  keyboard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
    flex: 1,
  },
  btnContainer: {
    marginRight: 10,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#124D1A',
  },
  textStyle: {
    fontSize: 22,
  },
});

const mapState = state => {
  return {
    messages: state.singleMessageThread,
    user: state.user,
    partner: state.partner,
  };
};

const mapDispatch = dispatch => {
  return {
    sendMessage: (id, content) => dispatch(sendMessage(id, content)),
  };
};

export default connect(mapState, mapDispatch)(SingleMessageThread);
