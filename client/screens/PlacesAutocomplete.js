import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import '../../keys'

export default  PlacesAutoComplete = (props) => {

  let currentLocation = {
    description: 'Current Location',
    geometry: {
      location: {
        lat: 0,
        lng: 0,
      },
    },
  }
  navigator.geolocation.getCurrentPosition(position => {
    currentLocation.geometry.location.lat = position.lattitude
    currentLocation.geometry.location.lng = position.longitude
  })
    return (
        <GooglePlacesAutocomplete
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
          key: process.env.GOOGLE_API_KEY,
          language: 'en', // language of the results
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

        nearbyPlacesAPI="GooglePlacesSearch" 
        GoogleReverseGeocodingQuery={
          {
          }
        }
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'food',
        }}
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3',
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        predefinedPlaces={[currentLocation]}
        
        //   renderRightButton={() => <Text>Custom text after the input</Text>}
        />
    )
    
}
