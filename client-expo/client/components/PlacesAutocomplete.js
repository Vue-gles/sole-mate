import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import getEnvVars from '../../environment';
const { GOOGLE_API_KEY } = getEnvVars();

export default PlacesAutoComplete = props => {
  let currentLocation = {
    description: 'Current Location',
    geometry: {
      location: {
        lat: 0,
        lng: 0,
      },
    },
  };
  navigator.geolocation.getCurrentPosition(position => {
    currentLocation.geometry.location.lat = position.coords.latitude;
    currentLocation.geometry.location.lng = position.coords.longitude;
  });
  return (
    <GooglePlacesAutocomplete
      style={styles.mapStyle}
      placeholder="Where would you like to start?"
      minLength={1}
      autoFocus={true}
      returnKeyType={'search'}
      listViewDisplayed="false"
      fetchDetails={true}
      renderDescription={row => row.description}
      onPress={(data, details = null) => {
        props.locationHandler(
          details.geometry.location.lat,
          details.geometry.location.lng,
          JSON.stringify(data.description)
        );
      }}
      getDefaultValue={() => ''}
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
      }}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderColor: 'black',
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 45,
          color: '#5d5d5d',
          fontSize: 16,
          borderWidth: 1,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      GooglePlacesSearchQuery={{
        rankby: 'distance',
        types: 'food',
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3',
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      predefinedPlaces={[currentLocation]}
    />
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    // justifyContent: 'flex-start',
    // alignItems: 'stretch',
    // width: Dimensions.get('window').width,
    // height: 50,
  },
});
