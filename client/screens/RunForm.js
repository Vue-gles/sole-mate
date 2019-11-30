import React, { Component } from 'react';
import {
  Button,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Picker,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Text } from 'react-native-elements';

import { connect } from 'react-redux';
import Constants from 'expo-constants'
import { createRunThunk } from '../store/runs';
import PlacesAutocomplete from './PlacesAutocomplete'
// import '../../keys'

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
    this.locationHandler=this.locationHandler.bind(this)
  }

  showDateTimePicker = () => {this.setState({ isDateTimePickerVisible: true })};

  hideDateTimePicker = () => {this.setState({ isDateTimePickerVisible: false })};

  handleDatePicked = date => {
    this.setState({ date });
    this.hideDateTimePicker();
  };

  showEndTimePicker = () => {this.setState({ isEndTimePickerVisible: true })};

  hideEndTimePicker = () => {this.setState({ isEndTimePickerVisible: false })};

  handleEndTimePicked = endTime => {
    endTime = endTime.getHours();
    this.setState({ endTime });
    this.hideEndTimePicker();
  };

  locationHandler(lattitude, longitude, address) {
    address = address.split(', ');
    const street = address[0].slice(1, address[0].length);
    const city = address[1];
    const state = address[2];

    this.setState({ lattitude, longitude, street, city, state});
  }

  submitHandler() {
    this.props.createRun(this.state);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Create a run for others to see</Text>
          <View style={styles.item}>
            <Text style={styles.text}>Where would you like to start?</Text>
          </View>
          <View style={styles.item}>
          <Text>How many miles would you like to run?</Text>
          <RNPickerSelect
            style={styles.picker}
            onValueChange={(value) => this.setState({prefferedMileage: value})}
            items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
              .map(mile => { return {label: `${mile}`, value: mile }})}
          />
          </View>
            <PlacesAutocomplete locationHandler={this.locationHandler}/>

          <View style={styles.item}>
            <Button
              title="Choose a date and start time"
              onPress={this.showDateTimePicker}
              style={styles.button}
            />
            <DateTimePicker
              mode='datetime'
              minuteInterval={30}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              minimumDate={new Date()}
            />
          </View>
          <View style={styles.item}>
          <Button
            title="Choose and end time"
            onPress={this.showEndTimePicker}
            style={styles.button}
          />
          <DateTimePicker
            mode={'time'}
            isVisible={this.state.isEndTimePickerVisible}
            onConfirm={this.handleEndTimePicked}
            onCancel={this.hideEndTimePicker}
            date={new Date}
            minuteInterval={30}
          />
          </View>
          <Button
            title="Submit"
            onPress={() => {
              this.setState({ creatorId: this.props.userId });
              this.submitHandler();
            }}
          />

          
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createRun: runInfo => dispatch(createRunThunk(runInfo)),
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
    justifyContent: 'space-around',
    alignItems: "center"
  },
  item: {
    flex: 2,
    paddingTop: Constants.statusBarHeight
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    borderBottomEndRadius: 30,
    height: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    height: 50,
  },
  picker: {
    alignSelf: 'center',
    fontSize: 15,
  }
});