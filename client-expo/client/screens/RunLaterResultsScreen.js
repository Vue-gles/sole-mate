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
import {Spinner} from 'native-base'
import moment from 'moment';

import { getRuns } from '../store/runs';
import { getSingleRun } from '../store/singleRun';
import { createUpcomingRunThunk } from '../store/upcomingRuns';
import { calculateDistance } from '../../utils';

class RunLaterResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      creatorId: navigation.getParam('creatorId', 'default value'),
      street: navigation.getParam('street', 'default value'),
      city: navigation.getParam('city', 'default value'),
      state: navigation.getParam('state', 'default value'),
      lattitude: navigation.getParam('lattitude', 'default value'),
      longitude: navigation.getParam('longitude', 'default value'),
      isDateTimePickerVisible: navigation.getParam('isDateTimePickerVisible', 'default value'),
      isStartTimePickerVisible: navigation.getParam('isStartTimePickerVisible', 'default value'),
      isEndTimePickerVisible: navigation.getParam('isEndTimePickerVisible', 'default value'),
      startTime: navigation.getParam('startTime', 'default value'),
      endTime: navigation.getParam('endTime', 'default value'),
      prefferedMileage:navigation.getParam('prefferedMileage', 'default value'),
    };
    this.clickHandler = this.clickHandler.bind(this);

  }

  static navigationOptions = {
    title: 'Runs',
  };

  componentDidMount() {
    this.props.getRuns(
      'potential',
      this.props.runNowInfo.maxDistance,
      this.props.runNowInfo.lat,
      this.props.runNowInfo.long
    );
  }

  clickHandler(id) {
    this.props.getSingleRun(id);
    this.props.navigation.navigate('SingleRun');
  }

  async submitHandler() {
      await this.props.createRun(this.state);
      this.props.navigation.navigate('ScheduleStack')//ScheduleStack or RunResults
    }

  render() {
    
    return (
      !this.props.isFetching ? (<SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>

          {this.props.runs && this.props.runs.length ? (
            this.props.runs.map(run => {
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
                      {moment(run.startTimeframe).format('h:mm a')} -
                      {moment(run.endTimeframe).format('h:mm a')}
                    </Text>
                    <Text style={styles.details}>
                      {this.props.runNowInfo.maxDistance
                        ? calculateDistance(
                            run.lat,
                            run.long,
                            this.props.runNowInfo.lat,
                            this.props.runNowInfo.long
                          ).toFixed(1) + ' miles away'
                        : null}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })
          ) : (
            <View style={styles.runAd}>
              <Text style={styles.name}>
                Sorry! There aren't any runs in your area at this time.
              </Text>
            </View>
          )}
          <View style={styles.runAd}>
            <Text style={styles.name}>Dont like what you see?</Text>
            
            <View style={styles.btnContainer}>
                <Button
                  title="Create a new Run"
                  onPress={() => this.submitHandler()}
                  color={'white'}
                />
              </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    ) :       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Spinner color="green" />
    </View> )
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
    width: 150,
    height: 150,
    resizeMode: 'contain',
    paddingTop: 3,
    marginLeft: -10,
    borderRadius: 150 / 2,
    overflow: 'hidden',
  },
  btnContainer: {
    backgroundColor: '#124D1A',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

const mapState = state => {
  return {
    runs: state.runs,
    runNowInfo: state.formInfo.runNowInfo,
    isFetching: state.isFetching.allRuns
  };
};

const mapDispatch = dispatch => {
  return {
    getRuns: (type, maxDistance, lat, long) =>
      dispatch(getRuns(type, maxDistance, lat, long)),
    getSingleRun: id => dispatch(getSingleRun(id)),
    createRun: runInfo => dispatch(createUpcomingRunThunk(runInfo))
  };
};

export default connect(mapState, mapDispatch)(RunLaterResultsScreen);
