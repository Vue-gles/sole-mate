import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import Slider from 'react-native-slider';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { gotRunNowFormInfo } from '../store/formInfo';
import { getRuns } from '../store/runs';

class RunNowForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      city: '',
      state: '',
      lattitude: 0,
      longitude: 0,
      maxDistance: 5,
      showError: false,
    };

    this.locationHandler = this.locationHandler.bind(this);
    this.handler = this.handler.bind(this);
  }

  static navigationOptions = {
    title: 'Choose what runs to see',
  };

  locationHandler(lattitude, longitude, address) {
    address = address.split(', ');
    const street = address[0].slice(1, address[0].length);
    const city = address[1];
    const state = address[2];
    this.setState({ lattitude, longitude, street, city, state });
  }

  handler(name, lat, long) {
    this.setState({ latitude: lat, longitude: lng });
  }

  render() {
    return (
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View paddingVertical={10} />

        <PlacesAutocomplete locationHandler={this.locationHandler} />
        <View paddingVertical={20} />

        <View style={styles.container}>
          <Slider
            style={(styles.container, { width: 250, alignSelf: 'center' })}
            step={0.2}
            minimumValue={0.2}
            maximumValue={10}
            value={this.state.maxDistance}
            onValueChange={val => this.setState({ maxDistance: val })}
            onSlidingComplete={this.getMaxDistance}
          />
          <Text style={styles.container}>
            Find runs within {this.state.maxDistance.toFixed(1)} miles
          </Text>
        </View>
        <View paddingVertical={15} />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            if (this.state.latitude || this.state.longitude) {
              this.props.setRunNowFormInfo(
                this.state.lattitude,
                this.state.longitude,
                this.state.maxDistance
              );
              this.props.navigation.navigate('RunResults');
            } else {
              this.setState({ showError: true });
            }
          }}
        >
          <Text style={{ color: 'white' }}>Find runs near you</Text>
        </TouchableOpacity>
        {this.state.showError ? (
          <Text style={{ color: 'red' }}>Must fill out location</Text>
        ) : null}
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRunNowFormInfo: (lat, long, maxDistance) =>
      dispatch(gotRunNowFormInfo({ lat, long, maxDistance })),
    getRuns: (type, maxDistance, lat, long) =>
      dispatch(getRuns(type, maxDistance, lat, long)),
  };
};

export default connect(null, mapDispatchToProps)(RunNowForm);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  item: {
    flex: 2,
    paddingTop: Constants.statusBarHeight,
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
  submitButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#04823a',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
});
