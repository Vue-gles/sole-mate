import React, { Component } from 'react';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Button } from 'react-native';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { getDistance } from 'geolib';
import { connect } from 'react-redux';
import { updateRoute, updateDistance } from '../store/runs';

const demoMode = true;

const data = [
  { latitude: 40.7048122617505, longitude: -74.00922672983373 },
  { latitude: 40.7048122617505, longitude: -74.00922672983373 },
  { latitude: 40.704709131146245, longitude: -74.009193160318 },
  { latitude: 40.70475566262779, longitude: -74.00922734268705 },
  { latitude: 40.70478099151111, longitude: -74.00925000112234 },
  { latitude: 40.704836250219714, longitude: -74.00917575894216 },
  { latitude: 40.704836250219714, longitude: -74.00917575894216 },
  { latitude: 40.704836250219714, longitude: -74.00917575894216 },
  { latitude: 40.70483872327929, longitude: -74.00923824126313 },
  { latitude: 40.70483872327929, longitude: -74.00923824126313 },
  { latitude: 40.70483872327929, longitude: -74.00923824126313 },
  { latitude: 40.704780505809374, longitude: -74.00927106474569 },
  { latitude: 40.704780505809374, longitude: -74.00927106474569 },
  { latitude: 40.704853430060055, longitude: -74.00926297135064 },
  { latitude: 40.704853430060055, longitude: -74.00926297135064 },
];
let dataIndex = -1;

class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      latitude: 40.27177,
      longitude: -74.594883,
      distance: 0,
      error: null,
      markers: [],
      currentLat: 40.704836250219714,
      currentLng: -74.00923824126313,
      coordinates: data,
      startButtonDisabled: false,
      stopButtonDisabled: true,
      clearButtonDisabled: true,
      handlerEnabled: false,
    };

    this.handler = this.handler.bind(this);
  }

  handler(name, lat, lng) {
    this.state.handlerEnabled = true;
    this.setState({ name: name, latitude: lat, longitude: lng });
  }

  render() {
    const notRenderDirection =
      this.state.latitude == 0 || this.state.coordinates.length == 0;

    let searchedRegion = {
      latitude: this.state.currentLat,
      longitude: this.state.currentLng,
      latitudeDelta: 0.016,
      longitudeDelta: 0.016,
    };

    return (
      <View style={styles.container}>
        <MapView
          provider="google"
          style={styles.mapStyle}
          type="retro"
          onRegionChange={this.onRegionChangeHandler}
          region={searchedRegion}
          showsUserLocation={false}
          showsCompass={true}
          followsUserLocation={false}
          showsScale={true}
          showsMyLocationButton={false}
          loadingEnabled={true}
          loadingIndicatorColor="green"
          loadingBackgroundColor="green"
        >
          {
            <Polyline
              coordinates={this.state.coordinates}
              strokeColor="forestgreen"
              strokeWidth={5}
            />
          }
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    opacity: 0.8,
  },
  mapStyle: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  rowButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 12,

    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  distanceTextStyle: {
    fontWeight: 'bold',
    color: 'yellow',
    textAlignVertical: 'bottom',
    padding: '4%',
  },
});
const mapState = state => {
  return {
    currentCoords: state.currentCoords,
  };
};

const mapDispatch = dispatch => {
  return {
    setCurrentCoords: coords => dispatch(setCurrentCoordsThunk(coords)),
    updateRoute: route => dispatch(updateRoute(route)),
    updateDistance: distance => dispatch(updateDistance(distance)),
  };
};

export default connect(mapState, mapDispatch)(MapScreen);
