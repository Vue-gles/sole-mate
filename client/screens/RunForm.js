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
  Alert
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Text } from 'react-native-elements';
import moment from 'moment';
import { Chevron } from 'react-native-shapes';

import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { createUpcomingRunThunk } from '../store/upcomingRuns';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import {getUpcomingRunsThunk} from '../store/upcomingRuns'

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
    console.log(date)
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
    console.log('yooo')
    endTime = endTime.getHours();
    this.setState({ endTime });
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
    if (!this.state.state || !this.state.startTime || !this.state.endTime) {
      Alert.alert('Must fill out all of the above before moving on')
    } else {
      await this.props.createRun(this.state);
      this.props.navigation.navigate('ScheduleStack')
    }
    
  }

  render() {
    // return (
    //   <SafeAreaView style={{flex: 1}}>
    //     <ScrollView style={styles.container}>
    //       <View syle={{ padding: 20, margin: 20 }}>
    //         <Text style={styles.text}>Where would you like to start?</Text>
    //         <PlacesAutocomplete locationHandler={this.locationHandler} />
    //       </View>
    //       <View paddingVertical={5} />

    //       <Text>custom icon using react-native-shapes</Text>

    //       <View style={styles.itemRow}>
    //         <View>
    //           <RNPickerSelect
    //           useNativeAndroidPickerStyle={false}
    //             placeholder={{ label: 'Miles to run' }}
    //             style={styles.picker}
    //             onValueChange={value =>
    //               this.setState({ prefferedMileage: value })
    //             }
    //             style={{
    //               inputAndroid: {
    //                 backgroundColor: 'transparent',
    //               },
    //               iconContainer: {
    //                 top: 5,
    //                 right: 15,
    //               },
    //             }}
    //             textInputProps={{ underlineColorAndroid: 'cyan' }}
    //             items={[
    //               1,
    //               2,
    //               3,
    //               4,
    //               5,
    //               6,
    //               7,
    //               8,
    //               9,
    //               10,
    //               11,
    //               12,
    //               13,
    //               14,
    //               15,
    //               16,
    //               17,
    //               18,
    //               19,
    //               20,
    //               21,
    //               22,
    //               23,
    //               24,
    //               25,
    //               26,
    //             ].map(mile => {
    //               return { label: `${mile}`, value: mile };
    //             })}
    //           />
    //         </View>
    //         <Text>
    //           {this.state.prefferedMileage} miles
    //         </Text>
    //       </View>

    //       <View style={styles.itemRow}>
    // <View style={styles.textItem}>
    // <Button
    //   title="Start date & time"
    //   onPress={this.showDateTimePicker}
    // />
    // <DateTimePicker
    //   mode="datetime"
    //   minuteInterval={30}
    //   isVisible={this.state.isDateTimePickerVisible}
    //   onConfirm={this.handleDatePicked}
    //   onCancel={this.hideDateTimePicker}
    //   minimumDate={new Date()}
    // />
    // </View>
    //         <Text styles={styles.valueItem}>
    //           {moment(this.state.startTime).format('MMM Do YY')}
    //         </Text>
    //       </View>

    //       <View style={styles.item} style={{ backgroundColor: 'blue' }}>
    //         <Button
    //           title="Choose and end time"
    //           onPress={this.showEndTimePicker}
    //           style={styles.button}
    //         />
    // <DateTimePicker
    //   mode={'time'}
    //   isVisible={this.state.isEndTimePickerVisible}
    //   onConfirm={this.handleEndTimePicked}
    //   onCancel={this.hideEndTimePicker}
    //   date={new Date()}
    //   minuteInterval={30}
    // />
    //       </View>

          // <View>
          //   <Button
          //     title="Submit"
          //     onPress={() => {
          //       this.setState({ creatorId: this.props.userId });
          //       this.submitHandler();
          //     }}
          //   />
          // </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // );

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
              <DateTimePicker
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
              <DateTimePicker
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
          <Text style={{textAlign: 'center', paddingVertical: 5}}>{moment(this.state.startTime).format('MMMM Do, YYYY')}</Text>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{moment(this.state.startTime).format('h:mm')} to {moment(this.state.endTime).format('h:mm a')}</Text>
          <View paddingVertical={10} />

          <TouchableOpacity style={styles.button}
            onPress={() => {
              this.setState({ creatorId: this.props.userId });
              this.submitHandler()
              }
              }>
                <Text>Submit run!</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createRun: runInfo => dispatch(createUpcomingRunThunk(runInfo))
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
    fontSize: 20
  },
  submitButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#04823a',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  }
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

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     paddingTop: 20
//   },
//   item: {
//     height: 30,
//     flex: 1,
//     paddingTop: Constants.statusBarHeight,
//     flexDirection: 'column',
//   },
//   mapItem: {
//     paddingTop: 30,
//     marginTop: 20,
//   },
//   itemRow: {
//     height: 30,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     backgroundColor: 'yellow',
//   },
//   textItem: {
//     flex: 3,
//     paddingLeft: 0,
//     backgroundColor: 'red',
//   },
//   valueItem: {
//     flex: 1,
//   },
//   text: {
//     textAlign: 'left',
//     // fontSize: 15,
//     // height: 50,
//   },
//   picker: {
//     fontSize: 15,
//   },
//   btnContainer: {
//     backgroundColor: '#124D1A',
//     padding: 5,
//     margin: 5,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
// });
