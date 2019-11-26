// import React from 'react';
// import { View, TextInput, ScrollView, StyleSheet, Text } from 'react-native';
// import {
//   FormLabel,
//   FormInput,
//   FormValidationMessage,
// } from 'react-native-elements';

// export default class RunForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//         address: '',
//         startTime: '',
//         endTime: ''
//     }
//   }

//   render() {
//     return (
//       <ScrollView>
//         <Text>Post your run below</Text>
//         <TextInput
//             value={this.state.address}
//               placeholder={'Something'}
//               style={styles.input}
//             />

//       </ScrollView>
//     );
//   }
// }

import React, { Component } from 'react';
import { Button, View, ScrollView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Text } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import TimePicker from 'react-native-simple-time-picker';

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      isTimePickerVisible: false,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date()
    };
  }

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

  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  };

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };

  handleTimePicked = time => {
    console.log('A date has been picked: ', date);
    this.setState({ startTime });
    this.hideTimePicker();
  };

  handleEndTimePicked(endTime) {
      this.setState({endTime})
      this.hideDateTimePicker
  }


  render() {
    return (
      <ScrollView>
        <View>
          <Button title="Choose a date" onPress={this.showDateTimePicker} />
          <DateTimePicker

            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            minimumDate={new Date()}
          />
        </View>
        <View>
          <Button title="Start" onPress={this.showTimePicker} />
          <DateTimePicker
            mode={'time'}
            isVisible={this.state.isTimePickerVisible}
            onConfirm={this.handleTimePicked}
            onCancel={this.hideTimePicker}
          />
        </View>

      </ScrollView>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 100,
//   },
//   input: {
//     width: 200,
//     height: 44,
//     marginTop: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   error: {
//     color: `#eb4034`,
//   },
// });
