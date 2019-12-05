import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import key from '../../keys';

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
    this.props.handler(this.state, lat, lng);
  }

  render() {
    const currentLocation = {
      description: 'Current Location',
      geometry: {
        location: {
          lat: '',
          lng: '',
        },
      },
    };

    return (
      <GooglePlacesAutocomplete
        placeholder="Where would you like to start?"
        minLength={1}
        autoFocus={true}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed={false} // true/false/undefined
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
          key: process.env.GOOGLE_API_KEY,
          language: 'en', // language of the results
          // types: 'establishment' && 'geocode' // default: 'geocode'
        }}
        styles={{
          textInputContainer: {
            width: '100%',
            height: '15%',
            backgroundColor: 'dodgerblue',
            opacity: '0.5',
          },
          description: {
            fontWeight: 'bold',
            height: '240%',
            margin: '-4%',
            backgroundColor: 'whitesmoke',
            color: 'black',
            padding: '4%',
          },
          predefinedPlacesDescription: {
            color: 'black',
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
        // predefinedPlaces={[currentLocation, homePlace, workPlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        renderLeftButton={() => <Image source={require('./TabBarIcon')} />}
        //   renderRightButton={() => <Text>Custom text after the input</Text>}
        enablePoweredByContainer={false}
      />
    );
  }
}
