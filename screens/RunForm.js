import React, { Component } from 'react';
import { Button, View, ScrollView, StyleSheet, TextInput } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Text } from 'react-native-elements';
import TimePicker from 'react-native-simple-time-picker';

import GooglePlacesInput from '../components/GooglePlacesInput'

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isDateTimePickerVisible: false,
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
    };
  }

  //DATE PICKER
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log('A date has been picked: ', date);
    this.setState({ date });
    this.hideDateTimePicker();
  };

  //START TIME PICKER
  showStartTimePicker = () => {
    this.setState({ isStartTimePickerVisible: true });
  };

  hideStartTimePicker = () => {
    this.setState({ isStartTimePickerVisible: false });
  };

  handleStartTimePicked = startTime => {
    startTime = startTime.getHours();
    this.setState({ startTime });
    this.hideStartTimePicker();
  };

  //END TIME PICKER
  showEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: true });
  };

  hideEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: false });
  };

  handleEndTimePicked = endTime => {
    endTime = endTime.getHours();
    this.setState({ endTime });
    this.hideTimePicker();
  };

  handleAddressChange(address) {
    this.setState({ address });
    console.log(this.state)
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.header}>Create a run for others to see</Text>
          <View>
            <Text style={styles.text}>Where would you like to start?</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={address => this.handleAddressChange(address)}
              value={this.state.address}
            />
          </View>
          <View>
            <Button
              title="Choose a date"
              onPress={this.showDateTimePicker}
              style={styles.button}
            />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              minimumDate={new Date()}
            />
          </View>
            <Button
              title="Start Time"
              onPress={this.showStartTimePicker}
              style={styles.button}
            />
            <DateTimePicker
              mode={'time'}
              isVisible={this.state.isStartTimePickerVisible}
              onConfirm={this.handleStartTimePicked}
              onCancel={this.hideStartTimePicker}
            />


            <Button
              title="End Time"
              onPress={this.showEndTimePicker}
              style={styles.button}
            />
            <DateTimePicker
              mode={'time'}
              isVisible={this.state.isEndTimePickerVisible}
              onConfirm={this.handleEndTimePicked}
              onCancel={this.hideEndTimePicker}
            />

          <Button
          title='Submit'

          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
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
});
