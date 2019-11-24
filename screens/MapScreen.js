import React, {Component} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions'
import key from '../keys'
import GooglePlacesInput from '../components/GooglePlacesInput'

export default class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude : 40.7128,
      longitude : -74.0060,
      error : null,
      markers: []
    };
  }

  componentDidMount() {
    navigator.geolocation.watchPosition(
       (position) => {
         console.log("wokeeey");
         console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }

  render() {
    return (
      <View style={styles.container}>
        <Text>IS THIS SHOWING?</Text>
        <MapView 
          provider = "google"
          style={styles.mapStyle}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0125,
            longitudeDelta: 0.0121 
          }}>
          <Marker coordinate={this.state} />
          <Marker coordinate = {{latitude: 40.7128, longitude: -74.0060 }} />
          
          <MapViewDirections 
            origin = {this.state}
            destination = {{latitude: 40.7128, longitude: -74.0060 }}
            apikey = {key}
            strokeWidth = {3}
            strokeColor = 'blue'
          
          />
        </MapView>
      </View>
    );
  }
}
MapScreen.navigationOptions = {
  title: 'Map',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
  },
});