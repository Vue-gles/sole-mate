import React, {Component} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
// import GooglePlaceInput from '../components/GooglePlacesInput'
export default class Map extends Component {
  render() {
    return (
      <View style={styles.container}>
        
       
          <MapView provider = "google"
                  style={styles.mapStyle}
                  showUserLocation = {true}
                  center = {{lat: 41, lng: -78}}
                  defaultZoom = {this.props.zoom} />
      
        
        
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});