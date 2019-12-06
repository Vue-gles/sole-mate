import React from 'react';
import {
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import moment from 'moment';
import { LinearGradient } from 'expo';

import { getPastRunsThunk } from '../store/pastRuns';

class PastRunsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('PAAAAAAASSSSSSTTTTT RUUUUUUNNNNNNNN');
    this.props.getPastRuns('past');
  }

  goToMapView(run) {
    this.props.navigation.navigate('PastRouteMap', {
      runInfo: {
        runRoute: JSON.parse(run.route),
        distance: run.distance,
      },
    });
  }

  render() {
    return this.props.pastRuns.length ? (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View paddingVertical={12} />
          {this.props.pastRuns.map(run => {
            return run.creatorId === this.props.user.id ? (
              <TouchableWithoutFeedback
                key={run.id}
                onPress={() => {
                  if (run.route) {
                    this.goToMapView(run);
                  }
                }}
              >

                <View style={styles.runAd} key={run.id}>
                  {run.partnerId && (
                    <Image
                      source={{
                        uri: run.Partner.imageUrl,
                      }}
                      style={styles.runImage}
                    />
                  )}
                  {run.partnerId && (
                    <Text style={styles.name}>
                      {run.Partner.firstName} {run.Partner.lastName}
                    </Text>
                  )}

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
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback
                key={run.id}
                onPress={() => {
                  if (run.route) {
                    this.goToMapView(run);
                  }
                }}
              >
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
              </TouchableWithoutFeedback>
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
    paddingVertical: 12,
    marginVertical: 5,
    marginHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
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
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    getPastRuns: type => dispatch(getPastRunsThunk(type)),
    getSingleRun: id => dispatch(getSingleRun(id)),
  };
};

export default connect(mapState, mapDispatch)(PastRunsScreen);
