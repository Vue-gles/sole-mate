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

class PastRunsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRuns('past');
  }

  render() {
    console.log("PASTRUNSPROPS", this.props)
    console.log('PastRuns ------------->');

    if(this.props.runs.length > 0){
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
    }else{
      return(
        <Text>No past runs</Text>
      ) 
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  runAd: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  runImage: {
    width: 150,
    height: 110,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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

export default connect(mapState, mapDispatch)(PastRunsScreen);