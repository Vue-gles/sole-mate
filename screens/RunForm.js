import React from 'react';
import { View, TextInput, ScrollView, StyleSheet, Text } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'; 

export default class RunForm extends React.Component {
  constructor() {
    super();
    this.state = {
        address: '',
        startTime: '',
        endTime: ''
    }
  }

  render() {
    return (
      <ScrollView>
        <Text>Post your run below</Text>
        <TextInput
              placeholder={'Something'}
              style={styles.input}
            />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  input: {
    width: 200,
    height: 44,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  error: {
    color: `#eb4034`,
  },
});
