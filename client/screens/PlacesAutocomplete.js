import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import '../../keys'

export default  PlacesAutoComplete = (props) => {
    return (
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
          props.locationHandler(
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
    )
    
}

