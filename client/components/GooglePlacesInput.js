import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import key from '../../keys';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 40.771209, lng: -73.9673991 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 40.7050758, lng: -74.0091604 } },
};

export default class GooglePlacesInput extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.helperFunction = this.helperFunction.bind(this);
  }

  helperFunction(lat, lng) {
    console.log('HELPER', lat, lng, this.state.address);
    // console.log("PROPS",this.props)
    this.props.handler(this.state, lat, lng);
  }

  render() {
    // console.log("CHILD PROPS", this.props)
    const currentLocation = {
      description: 'Current Location',
      geometry: {
        location: {
          lat: this.props.currentCoordinates.latitude,
          lng: this.props.currentCoordinates.longitude,
        },
      },
    };

    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={1} // minimum length of text to search
        autoFocus={true}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          this.setState({ address: JSON.stringify(data.description) });
          this.helperFunction(
            details.geometry.location.lat,
            details.geometry.location.lng
          );
        }}
        getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: key,
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
        currentLocationCoordinates={{
          latitude: this.props.currentCoordinates.latitude,
          latitude: this.props.currentCoordinates.longitude,
        }}
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
        predefinedPlaces={[currentLocation, homePlace, workPlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        renderLeftButton={() => <Image source={require('./TabBarIcon')} />}
        //   renderRightButton={() => <Text>Custom text after the input</Text>}
      />
    );
  }
}