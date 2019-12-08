import React from 'react';
import {
  Button,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import moment from 'moment';
import {Spinner} from 'native-base'
import { getSingleRun } from '../store/singleRun';

import { getUpcomingRunsThunk } from '../store/upcomingRuns';

class UpcomingRunsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueValue: 1,
    };
    this.forceRemount = this.forceRemount;
  }
  forceRemount = () => {
    this.props.getUpcomingRuns('upcoming');
    this.setState({
      uniqueValue: this.state.uniqueValue + 1,
    });
  };

  componentDidMount() {
    this.props.getUpcomingRuns('upcoming');
  }
  async clickHandler(id) {
    await this.props.getSingleRun(id);
    this.props.navigation.navigate('Map');
  }

  render() {
    console.log('fetching---------->',this.props.isFetching)
    return !this.props.isFetching.upcomingRuns ? (this.props.upcomingRuns.length ? (
      <SafeAreaView key={this.state.uniqueValue} style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View paddingVertical={7} />
          {this.props.upcomingRuns.map(run => {
            return run.creatorId === this.props.user.id ? (
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

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.clickHandler(run.id)}
                >
                  <Text style={styles.text}>Start run</Text>
                </TouchableOpacity>
              </View>
            ) : (
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
                  {moment(run.startTimeframe).format('h:mm')} -{' '}
                  {moment(run.endTimeframe).format('h:mm a')}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.clickHandler(run.id)}
                >
                  <Text color={'white'}>Start run</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            paddingVertical: 12,
            marginVertical: 5,
            marginHorizontal: 12,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.name}>No upcoming runs</Text>
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
  runAd: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginVertical: 5,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#c8e6d0',
    borderRadius: 8
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
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
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#323633',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
});

const mapState = state => {
  return {
    upcomingRuns: state.upcomingRuns,
    user: state.user,
    isFetching: state.isFetching
  };
};

const mapDispatch = dispatch => {
  return {
    getUpcomingRuns: type => dispatch(getUpcomingRunsThunk(type)),
    getSingleRun: id => dispatch(getSingleRun(id)),
  };
};

export default connect(mapState, mapDispatch)(UpcomingRunsScreen);
