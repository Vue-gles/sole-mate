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

import { getPastRunsThunk } from '../store/pastRuns';

class PastRunsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("COMPONENT MOUNTED")
    this.props.getPastRuns('past');
  }
  
  render() {
    console.log('Past Runs ------------->');
    console.log("PAST RUNS PROPS", this.props)
    

    return (this.props.pastRuns.length > 0 ?
     
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
          
            {this.props.pastRuns.map(run => {
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
     
        <Text>No past runs</Text>
      
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
    pastRuns: state.pastRuns,
  };
};

const mapDispatch = dispatch => {
  return {
    getPastRuns: type => dispatch(getPastRunsThunk(type)),
  };
};

export default connect(mapState, mapDispatch)(PastRunsScreen);
