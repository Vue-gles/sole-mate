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

import { getUpcomingRunsThunk } from '../store/upcomingRuns';

class UpcomingRunsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("COMPONENT MOUNTED")
    this.props.getUpcomingRuns('upcoming');
  }
  
  render() {
    console.log('Upcoming Runs ------------->');
    console.log("UPCOMING RUNS PROPS", this.props)
    

    return (this.props.upcomingRuns.length ?
     
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
          
            {this.props.upcomingRuns.map(run => {
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
      :
     
        <Text>No upcoming runs</Text>
      
    )
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
    upcomingRuns: state.upcomingRuns,
  };
};

const mapDispatch = dispatch => {
  return {
    getUpcomingRuns: type => dispatch(getUpcomingRunsThunk(type)),
  };
};

export default connect(mapState, mapDispatch)(UpcomingRunsScreen);
