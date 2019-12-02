import React, { Component } from 'react';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Button } from 'react-native';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { getDistance } from 'geolib';
import { connect } from 'react-redux';
import { updateRoute, updateDistance } from '../store/runs';

const demoMode = true;

const data = [
  {
    latitude: 40.276141,
    longitude: -74.592255,
  },
  {
    latitude: 40.276386,
    longitude: -74.592501,
  },
  {
    latitude: 40.276976,
    longitude: -74.593167,
  },
  {
    latitude: 40.276444,
    longitude: -74.593918,
  },
  {
    latitude: 40.275625,
    longitude: -74.594883,
  },
  {
    latitude: 40.273684,
    longitude: -74.595895,
  },
  {
    latitude: 40.27177,
    longitude: -74.59691,
  },
  {
    latitude: 40.270652,
    longitude: -74.593449,
  },
  {
    latitude: 40.270652,
    longitude: -74.593449,
  },
  {
    latitude: 40.268052,
    longitude: -74.589062,
  },
  {
    latitude: 40.267023,
    longitude: -74.587219,
  },
];
let dataIndex = -1;

class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      latitude: 40.7128,
      longitude: -74.006,
      distance: 0,
      error: null,
      markers: [],
      currentLat: 40.7128,
      currentLng: -74.006,
      coordinates: data,
      startButtonDisabled: false,
      stopButtonDisabled: true,
      clearButtonDisabled: true,
      handlerEnabled: false,
    };

    this.handler = this.handler.bind(this);
  }


  componentDidMount() {
    navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          currentLat: position.coords.latitude,
          currentLng: position.coords.longitude,
          coordinates: [
            ...this.state.coordinates,
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          ],
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
  }

  handler(name, lat, lng) {
    this.state.handlerEnabled = true;
    this.setState({ name: name, latitude: lat, longitude: lng });
  }

  render() {
    const notRenderDirection =
      this.state.latitude == 0 || this.state.coordinates.length == 0;

    let searchedRegion = this.state.handlerEnabled
      ? {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.011,
          longitudeDelta: 0.011,
        }
      : {
          latitude: this.state.currentLat,
          longitude: this.state.currentLng,
          latitudeDelta: 0.011,
          longitudeDelta: 0.011,
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
              strokeColor="dodgerblue"
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
