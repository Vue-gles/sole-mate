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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import Constants from 'expo-constants'
import { createRunThunk } from '../store/runs';
import '../../keys'

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
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      prefferedMileage: 0,
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
            {/* <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={address => this.handleAddressChange(address)}
              value={this.state.address}
            /> */}

            <GooglePlacesAutocomplete
              placeholder="Search"
              minLength={1} // minimum length of text to search
              autoFocus={true}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed="false" // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                this.locationHandler(
                  details.geometry.location.lat,
                  details.geometry.location.lng,
                  JSON.stringify(data.description)
                );
              }}
              getDefaultValue={() => ''}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: process.env.GOOGLE_API_KEY,
                language: 'en', // language of the results
                // types: 'establishment' && 'geocode' // default: 'geocode'
              }}
              styles={{
                textInputContainer: {
                  width: '100%',
                  height: '35%',
                },
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
              // currentLocationLabel="Current location"

              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={
                {
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }
              }
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food',
              }}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

              //   renderRightButton={() => <Text>Custom text after the input</Text>}
            />
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
          <View style={styles.item}>
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
          <View style={styles.item}>
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
          </View>
          <View style={styles.item}>
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