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
import { getSingleRun } from '../store/singleRun';

import { getUpcomingRunsThunk } from '../store/upcomingRuns';
import { getPartner } from '../store/partner';


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
    if(this.props.upcomingRuns.partnerId){
      this.props.getPartner(this.props.upcomingRuns.partnerId);
      console.log("PARTNERIDDDDDDDDDDDD", this.props.upcomingRuns.partnerId)
    }else{

    }
  }
  async clickHandler(id) {
    await this.props.getSingleRun(id);
    this.props.navigation.navigate('Map');
  }

  render() {
        // if(this.props.upcomingRuns.Partner !== undefined) {
    //   //you are running with partner and show partner info
    // }
    // else if (this.props.upcomingRuns.Partner === undefined){
    //   //you are running alone and show your info
    // }else{
    //   //NO UpCOMING RUNS TEXT
    // }
    

    return !this.props.upcomingRuns.partnerId ? (
      <SafeAreaView key={this.state.uniqueValue} style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.props.upcomingRuns.map(run => {
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

                <Button
                  title="Start Run"
                  onPress={() => this.clickHandler(run.id)}
                  color={'#0F3E15'}
                />
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.container}>
        <View style={styles.runAd}>
          <Text style={styles.name}>No upcoming runs</Text>
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
    upcomingRuns: state.upcomingRuns,
  };
};

const mapDispatch = dispatch => {
  return {
    getUpcomingRuns: type => dispatch(getUpcomingRunsThunk(type)),
    getSingleRun: id => dispatch(getSingleRun(id)),
    getPartner: id => dispatch(getPartner(id))
  };
};

export default connect(mapState, mapDispatch)(UpcomingRunsScreen);
