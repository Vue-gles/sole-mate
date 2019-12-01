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
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import moment from 'moment';

import { getRuns } from '../store/runs';
import { getSingleRun } from '../store/singleRun';

class RunResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  static navigationOptions = {
    title: 'Run Results',
  };

  componentDidMount() {
    this.props.getRuns('potential');
  }

  async clickHandler(id) {
    await this.props.getSingleRun(id);
    this.props.navigation.navigate('SingleRun');
  }

  render() {
    // console.log('RunResults ------------->');
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.props.runs.map(run => {
            return (
              <TouchableWithoutFeedback
                key={run.id}
                onPress={() => this.clickHandler(run.id)}
              >
                <View style={styles.runAd}>
                  <Image
                    source={{
                      uri: run.Creator.imageUrl,
                    }}
                    style={styles.runImage}
                  />
                  <Text>Creator Name: {run.Creator.firstName}</Text>
                  <Text>
                    Location: {run.street}, {run.city}, {run.state}
                  </Text>
                  <Text>
                    Date: {moment(run.startTimeframe).format('MMMM Do')}
                  </Text>
                  <Text>
                    Time: {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
                    {moment(run.endTimeframe).format('h:mm:ss a')}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
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
  runAd: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  runImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    paddingTop: 3,
    marginLeft: -10,
    borderRadius: 150 / 2,
    overflow: 'hidden',
  },
});

const mapState = state => {
  return {
    runs: state.runs,
  };
};

const mapDispatch = dispatch => {
  return {
    getRuns: type => dispatch(getRuns(type)),
    getSingleRun: id => dispatch(getSingleRun(id)),
  };
};

export default connect(mapState, mapDispatch)(RunResultsScreen);
