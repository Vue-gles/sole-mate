// import React from 'react';
// import { View, TextInput, ScrollView, StyleSheet, Text } from 'react-native';
// import {
//   FormLabel,
//   FormInput,
//   FormValidationMessage,
//   Button
// } from 'react-native-elements'; 
// import DateTimePicker from '@react-native-community/datetimepicker';

// export default class RunForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//         date: new Date('2019-06-12T14:42:42'),
//         mode: 'date',
//         show: false,
//     }
//     this.show = this.show.bind(this)
//     this.timepicker = this.timepicker.bind(this)
//   }
//   timepicker() {
//       this.show('time')
//   }

//   show = mode => {
//     this.setState({
//       show: true,
//       mode,
//     });
//   }

//   render() {
//       const {show, date, mode} = this.state
//     return (
//       <ScrollView>
//         <Text>Post your run below</Text>
//         <TextInput
//             value={this.state.address}
//               placeholder={'Something'}
//               style={styles.input}
//             />
        
//         <View>
//           <Button onPress={this.datepicker} title="Show date picker!" />
//         </View>
//         <View>
//           <Button onPress={this.timepicker} title="Show time picker!" />
//         </View>
//         { show && <DateTimePicker value={date}
//                     mode={mode}
//                     is24Hour={true}
//                     display="default"
//                     onChange={this.setDate} />
//         }
//       </ScrollView>
//     );
//   }
// }

import React, { Component } from "react";
import { Button, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
 
export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }
 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };
 
  render() {
    return (
      <>
        <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </>
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
