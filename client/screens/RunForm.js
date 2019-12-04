import React, { Component } from 'react';
import {
  Button,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Picker,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Text } from 'react-native-elements';
import moment from 'moment';
import { Chevron } from 'react-native-shapes';

import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { createUpcomingRunThunk } from '../store/upcomingRuns';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { getUpcomingRunsThunk } from '../store/upcomingRuns';

class RunForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatorId: NaN,
      street: '',
      city: '',
      state: '',
      lattitude: '',
      longitude: '',
      isDateTimePickerVisible: false,
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
      startTime: new Date(),
      endTime: new Date(),
      prefferedMileage: 0,
    };
    this.locationHandler = this.locationHandler.bind(this);
  }

  static navigationOptions = {
    title: 'Post a run',
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ startTime: date });
    this.hideDateTimePicker();
  };

  showEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: true });
  };

  hideEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: false });
  };

  handleEndTimePicked = endTime => {
    const time = moment(endTime).format('HH:mm');
    const date = moment(this.state.startTime).format('YYYY-MM-DD');
    const dateTime = `${date}T${time}`;
    this.setState({ endTime: new Date(dateTime) });
    this.hideEndTimePicker();
  };

  locationHandler(lattitude, longitude, address) {
    address = address.split(', ');
    const street = address[0].slice(1, address[0].length);
    const city = address[1];
    const state = address[2];
    console.log(lattitude, longitude, address);

    this.setState({ lattitude, longitude, street, city, state });
  }

  async submitHandler() {
    if (!this.state.lattitude || !this.state.prefferedMileage) {
      Alert.alert('Must fill out all of the above before moving on');
    } else {
      await this.props.createRun(this.state);
      this.props.navigation.navigate('ScheduleStack');
    }
  }

  render() {
    console.log('THIS IS MY STATE', this.state);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View paddingVertical={5} />
          <Text>Set a starting location</Text>
          <PlacesAutocomplete locationHandler={this.locationHandler} />
          <View paddingVertical={10} />

          <Text>Preffered mile amount to run</Text>

          {/* and value defined */}
          <RNPickerSelect
            placeholder={{ label: 'Miles to run' }}
            items={[
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
            ].map(mile => {
              return { label: `${mile}`, value: mile };
            })}
            onValueChange={value => this.setState({ prefferedMileage: value })}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            value={this.state.prefferedMileage}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
              return <Chevron size={1.5} color="gray" />;
            }}
          />
          <View paddingVertical={10} />
          <View style={styles.dateContainer}>
            <TouchableOpacity
              onPress={this.showDateTimePicker}
              style={styles.button}
            >
              <Text>Start time & date </Text>
              <DateTimePickerModal
                mode="datetime"
                minuteInterval={30}
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                minimumDate={new Date()}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.showEndTimePicker}
              style={styles.button}
            >
              <Text>End time</Text>
              <DateTimePickerModal
                mode={'time'}
                isVisible={this.state.isEndTimePickerVisible}
                onConfirm={this.handleEndTimePicked}
                onCancel={this.hideEndTimePicker}
                date={new Date()}
                minuteInterval={30}
              />
            </TouchableOpacity>
          </View>
          <View paddingVertical={20} />
          <Text style={{ textAlign: 'center', paddingVertical: 5 }}>
            {moment(this.state.startTime).format('MMMM Do, YYYY')}
          </Text>
          <Text
            style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
          >
            {moment(this.state.startTime).format('h:mm')} to{' '}
            {(this.state.endTime.getHours() > 12
              ? this.state.endTime.getHours() - 12
              : this.state.endTime.getHours()) - 7}
            :{moment(this.state.endTime).format('mm')}{' '}
            {this.state.endTime.getHours() > 12 ? 'a.m.' : 'p.m.'}
          </Text>
          <View paddingVertical={10} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ creatorId: this.props.userId });
              this.submitHandler();
            }}
          >
            <Text>Submit run!</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createRun: runInfo => dispatch(createUpcomingRunThunk(runInfo)),
  };
};

const mapStateToProps = state => {
  return {
    userId: state.user.id,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#04823a',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  dateText: {
    flex: 1,
    textAlign: 'center',
  },
  timeSlotText: {
    fontSize: 20,
  },
  submitButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#04823a',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
