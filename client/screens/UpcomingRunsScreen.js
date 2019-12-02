import React from 'react';
import {
  Button,
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
    console.log('COMPONENT MOUNTED');
    this.props.getUpcomingRuns('upcoming');
  }
  async clickHandler(id) {
    await this.props.getSingleRun(id);
    this.props.navigation.navigate('Map');
  }

  render() {
    console.log('Upcoming Runs ------------->');
    console.log('UPCOMING RUNS PROPS', this.props);

    return this.props.upcomingRuns.length ? (
      <SafeAreaView key={this.state.uniqueValue} style={styles.container}>
        <ScrollView style={styles.scrollView}>
         <Button
                  onPress={this.forceRemount}
                  title="update"
                  color={'#0F3E15'}
                ></Button>
          {this.props.upcomingRuns.map(run => {
            return (
              // <Link to={`/runs/${run.id}`} key={run.id}>
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

                <Button
                  title="Start Run"
                  onPress={() => this.clickHandler(run.id)}
                  color={'#0F3E15'}
                />
                
              </View>
              // <Button
              //     onPress={this.forceRemount}
              //     title="update"
              //     color={'#0F3E15'}
              //   ></Button>
              // </Link>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    ) : (
      <Text>No upcoming runs</Text>
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
    upcomingRuns: state.upcomingRuns,
  };
};

const mapDispatch = dispatch => {
  return {
    getUpcomingRuns: type => dispatch(getUpcomingRunsThunk(type)),
    getSingleRun: id => dispatch(getSingleRun(id))
  };
};

export default connect(mapState, mapDispatch)(UpcomingRunsScreen);
