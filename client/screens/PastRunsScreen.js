import React from 'react';
import {
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
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
    console.log('COMPONENT MOUNTED');
    this.props.getPastRuns('past');
  }

  render() {
    console.log('Past Runs ------------->');
    console.log('PAST RUNS PROPS', this.props);

    return this.props.pastRuns.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.props.pastRuns.map(run => {
            return (
              <View style={styles.runAd} key={run.id}>
                <Image
                  source={{
                    uri: run.Creator.imageUrl,
                  }}
                  style={styles.runImage}
                />
                <Text style={styles.name}>
                  {run.Creator.firstName} {run.Creator.lastName}
                </Text>
                <Text style={styles.details}>
                  {run.prefferedMileage} mile(s)
                </Text>
                <Text style={styles.details}>
                  {run.street}, {run.city}, {run.state}
                </Text>
                <Text style={styles.details}>
                  {moment(run.startTimeframe).format('MMMM Do')}
                </Text>
                <Text style={styles.details}>
                  {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
                  {moment(run.endTimeframe).format('h:mm:ss a')}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.container}>
        <View style={styles.runAd}>
          <Text style={styles.name}>No past runs</Text>
        </View>
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
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303731',
  },
  details: {
    color: '#525E54',
  },
  runImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    padding: '14%',
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
