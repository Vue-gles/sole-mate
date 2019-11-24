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
      name: '',
      latitude : 40.7128,
      longitude : -74.0060,
      error : null,
      markers: [],
      currentLat: 40.7128,
      currentLng: -74.0060
    };
    this.handlePress = this.handlePress.bind(this)
    this.handler = this.handler.bind(this)
  }
  handlePress (evt) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: evt.nativeEvent.coordinate
        }
      ]
    })
  }
  handler(name, lat, lng) {
    this.setState({name: name, latitude: lat, longitude: lng})
    // console.log('PARENT STATE', this.state)
  }
  componentDidMount() {
    navigator.geolocation.watchPosition(
       (position) => {
        //  console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           currentLat: position.coords.latitude,
           currentLng: position.coords.longitude,
           
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
        <GooglePlacesInput currentCoordinates = 
        {{latitude: this.state.currentLat, longitude: this.state.currentLng}} 
        handler={this.handler}/>
        <MapView 
          provider = "google"
          style={styles.mapStyle}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0125,
            longitudeDelta: 0.0121
          }}
          onPress = {this.handlePress}
          showsUserLocation={true}
          showsCompass = {true}
          followsUserLocation = {true}
          showsScale = {true}
          showsMyLocationButton = {true}	
          loadingEnabled = {true}
          loadingIndicatorColor = 'orange'
          loadingBackgroundColor = 'purple'

          >
            
          <Marker pinColor = 'blue' coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}} />
          {/* <Marker pinColor = 'green' coordinate={{latitude: this.state.currentLat, longitude: this.state.currentLng}} />  */}
          
          {this.state.markers.map((marker) => {
            console.log("MARKER",marker)
            return <Marker key = {marker.coordinate.latitude * marker.coordinate.longitude/3.14159265358979323} {...marker} />
          })}
          
          <MapViewDirections 
            origin = {{latitude: this.state.currentLat, longitude: this.state.currentLng}}
            destination = {{latitude: this.state.latitude, longitude: this.state.longitude }}
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