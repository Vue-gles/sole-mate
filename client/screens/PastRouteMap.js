import React, { Component } from 'react';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    const data = this.props.navigation.getParam('runInfo').runRoute;
    const routeMidpoint = data[Math.floor(data.length / 2)];
    const runDistance = this.props.navigation.getParam('runInfo').distance;
    this.state = {
      name: '',
      error: null,
      markers: [],
      currentLat: routeMidpoint.latitude,
      currentLng: routeMidpoint.longitude,
      coordinates: data,
      distance: runDistance,
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
    const coordLength = this.state.coordinates.length - 1;
    let searchedRegion = {
      latitude: this.state.currentLat,
      longitude: this.state.currentLng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
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
          <Marker
            title="Beginning of route"
            pinColor="green"
            coordinate={{
              latitude: this.state.coordinates[0].latitude,
              longitude: this.state.coordinates[0].longitude,
            }}
          />
          <Marker
            title="End of route"
            description={`Route distance: ${this.state.distance} miles`}
            isPreselected={true}
            pinColor="purple"
            coordinate={{
              latitude: this.state.coordinates[coordLength].latitude,
              longitude: this.state.coordinates[coordLength].longitude,
            }}
          />
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
