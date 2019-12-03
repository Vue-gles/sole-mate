import React, { Component } from 'react';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Button } from 'react-native';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { getDistance } from 'geolib';
import { connect } from 'react-redux';
import { updateRoute, updateDistance } from '../store/runs';

const demoMode = true;

let dataIndex = -1;

class MapScreen extends Component {
  constructor(props) {
    super(props);
    const data = this.props.navigation.getParam('runInfo').runRoute
    const routeMidpoint = data[Math.floor(data.length / 2)]
    this.state = {
      name: '',
      error: null,
      markers: [],
      currentLat: routeMidpoint.latitude,
      currentLng: routeMidpoint.longitude,
      coordinates: data,
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
      latitudeDelta: 0.010,
      longitudeDelta: 0.010,
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
              strokeColor="#590782"
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
