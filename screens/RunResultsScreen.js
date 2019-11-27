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
  View,
} from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-native';

import { getRuns } from '../store/runs';

class RunResultsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRuns('potential');
  }

  render() {
    console.log('RunResults ------------->');
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.props.runs.map(run => {
            return (
              <Link to={`/runs/${run.id}`} key={run.id}>
                <View style={styles.runAd}>
                  <Image
                    source={{
                      uri: run.Creator.imageUrl,
                    }}
                    style={styles.runImage}
                  />
                  <Text>Creator Name: {run.Creator.firstName}</Text>
                  <Text>Location: {run.locationName}</Text>
                  <Text>
                    Date: {moment(run.startTimeframe).format('MMMM Do')}
                  </Text>
                  <Text>
                    Time: {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
                    {moment(run.endTimeframe).format('h:mm:ss a')}
                  </Text>
                </View>
              </Link>
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
    marginTop: Constants.statusBarHeight,
    backgroundColor:"#4d4dff",
  },
  runAd: {
    padding: 10,
    flex: 1,
    // width:200,
    // padding:20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor:"#228b22",
    borderWidth: 1,
    borderColor: 'black',
  },
  runImage: {
    width: 150,
    height: 110,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    // backgroundColor:"#ff4dff"
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
  };
};

export default connect(mapState, mapDispatch)(RunResultsScreen);
