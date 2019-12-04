import React, { Component } from 'react';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Button } from 'react-native';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { getDistance } from 'geolib';
import { connect } from 'react-redux';
import { completeRun } from '../store/upcomingRuns';
import { saveRun } from '../store/pastRuns';

import socket from '../socket/index';

const circleColor = 'rgba(204, 255, 255, 0.2)';
const circle2Color = 'rgba(225, 204, 153, 0.5)';
const radius_1 = 0.5 * 1609.34; // meters
const radius_2 = 1 * 1609.34; // meters

const demoMode = false;
const data = [];

let dataIndex = -1;

class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clockId: '',
      name: '',
      seconds: 0,
      latitude: 40.7128,
      longitude: -74.006,
      distance: 0,
      error: null,
      markers: [],
      currentLat: 40.7128,
      currentLng: -74.006,
      circle: null,
      circle2: null,
      coordinates: [],
      startButtonDisabled: false,
      stopButtonDisabled: true,
      clearButtonDisabled: true,
      handlerEnabled: false,
    };

    this.onRegionChangeHandler = this.onRegionChangeHandler.bind(this);
    this.startTracking = this.startTracking.bind(this);
    this.stopTracking = this.stopTracking.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.getCurrentLocationMock = this.getCurrentLocationMock.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handler = this.handler.bind(this);
    this.clearTracking = this.clearTracking.bind(this);
    this.saveTracking = this.saveTracking.bind(this);
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.stopWatch = this.stopWatch.bind(this);
  }

  getCurrentLocationMock() {
    if (dataIndex < data.length - 1) {
      dataIndex = dataIndex + 1;
      loc = data[dataIndex];
      let distance = 0;
      if (this.state.coordinates.length > 0) {
        distance =
          getDistance(
            this.state.coordinates[this.state.coordinates.length - 1],
            loc
          ) * 0.000621371;
      }
      this.setState({
        coordinates: [...this.state.coordinates, loc],
        distance: this.state.distance + distance,
      });
    }
  }

  getCurrentLocation() {
    let loc = null;
    navigator.geolocation.watchPosition(
      position => {
        loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        let distance = 0;
        if (this.state.coordinates.length > 0) {
          distance =
            getDistance(
              this.state.coordinates[this.state.coordinates.length - 1],
              loc,
              (accuracy = 1)
            ) * 0.000621371;
        }
        this.setState({
          coordinates: [...this.state.coordinates, loc],
          distance: this.state.distance + distance,
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
    return loc;
  }

  startTracking(interval = 10000) {
    this.setState({
      stopButtonDisabled: false,
      startButtonDisabled: true,
      clearButtonDisabled: true,
      handlerEnabled: false,
    });

    if (demoMode) {
      this.getCurrentLocationMock();
    } else {
      this.getCurrentLocation();
    }

    this._interval = setInterval(() => {
      if (demoMode) {
        this.getCurrentLocationMock();
      } else {
        this.getCurrentLocation();
      }
    }, interval);
  }

  stopTracking() {
    clearInterval(this._interval);
    this.setState({
      stopButtonDisabled: true,
      startButtonDisabled: false,
      clearButtonDisabled: false,
      handlerEnabled: false,
    });
  }

  clearTracking() {
    dataIndex = -1;
    this.setState({
      milliseconds: 0,
      coordinates: [],
      distance: 0,
      clearButtonDisabled: true,
      handlerEnabled: false,
    });
  }

  saveTracking() {
    dataIndex = -1;
    const runId = this.props.currentRun.id;
    const distance = this.state.distance.toFixed(2);
    const coords = JSON.stringify(this.state.coordinates);
    this.props.saveRun(runId, coords, distance);
    this.props.completeRun(runId);
    const payload = { runId, coords, distance };
    socket.emit('completeRun', payload);
    this.setState({
      milliseconds: 0,
      coordinates: [],
      distance: 0,
      clearButtonDisabled: true,
      handlerEnabled: false,
    });
    console.log('dumdum dummmm', this.state);
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

  onRegionChangeHandler(evt) {
    this.circle2.setNativeProps({ fillColor: circle2Color });
    this.circle.setNativeProps({ fillColor: circleColor });
  }
  handler(name, lat, lng) {
    this.state.handlerEnabled = true;
    this.setState({ name: name, latitude: lat, longitude: lng });
  }
  handlePress(evt) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: evt.nativeEvent.coordinate,
        },
      ],
    });
  }

  stopWatch() {
    this.setState({ seconds: ++this.state.seconds });
    console.log('Seconds are: ', this.state.seconds);
  }
  startClock() {
    let clockId = setInterval(this.stopWatch, 1000);
    this.setState({ clockId });
  }

  stopClock() {
    clearInterval(this.state.clockId);
  }

  toSecs(secs) {
    const mins = Math.floor(secs / 60);
    const remaining = secs - mins * 60;
    const time =
      secs > 60
        ? `${mins}:${remaining < 10 ? '0' + String(remaining) : remaining}`
        : 10 > remaining
        ? '0' + String(remaining)
        : remaining;
    return time;
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
          onPress={this.handlePress}
          showsUserLocation={true}
          showsCompass={true}
          followsUserLocation={true}
          showsScale={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
          loadingIndicatorColor="green"
          loadingBackgroundColor="green"
        >
          <GooglePlacesInput
            currentCoordinates={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            handler={this.handler}
          />
          {this.state.handlerEnabled === false}
          {/* bigger circle must be rendered frist */}
          <Circle
            ref={ref => {
              this.circle2 = ref;
            }}
            center={{
              latitude: this.state.currentLat,
              longitude: this.state.currentLng,
            }}
            radius={radius_2}
            fillColor={circle2Color}
          />
          <Circle
            ref={ref => {
              this.circle = ref;
            }}
            center={{
              latitude: this.state.currentLat,
              longitude: this.state.currentLng,
            }}
            radius={radius_1}
            fillColor={circleColor}
          />
          <Marker
            pinColor="green"
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
          />
          {this.state.markers.map(marker => {
            return (
              <Marker
                key={
                  (marker.coordinate.latitude * marker.coordinate.longitude) /
                  3.14159265358979323
                }
                {...marker}
              />
            );
          })}
          {notRenderDirection ? null : (
            <Polyline
              coordinates={this.state.coordinates}
              strokeColor="dodgerblue"
              strokeWidth={5}
            />
          )}
        </MapView>

        <View style={styles.rowButtonStyle}>
          <Button
            title="Start"
            ref={ref => {
              this.startButton = ref;
            }}
            disabled={this.state.startButtonDisabled}
            onPress={() => {
              this.startClock();
              this.startTracking(5000);
            }}
          />
          <Button
            title="Stop"
            ref={ref => {
              this.stopButton = ref;
            }}
            disabled={this.state.stopButtonDisabled}
            onPress={() => {
              this.stopClock();
              this.stopTracking();
            }}
          />
          <Button
            title="Clear"
            ref={ref => {
              this.clearButton = ref;
            }}
            disabled={this.state.clearButtonDisabled}
            onPress={() => this.clearTracking()}
          />
          <Button
            title="Save"
            ref={ref => {
              this.saveButton = ref;
            }}
            disabled={this.state.clearButtonDisabled}
            onPress={() => this.saveTracking()}
          />
          <Text style={styles.distanceTextStyle}>
            {this.state.distance.toFixed(2)} miles
          </Text>
          <Text>{this.toSecs(this.state.seconds)}</Text>
        </View>
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
    currentRun: state.singleRun,
  };
};

const mapDispatch = dispatch => {
  return {
    setCurrentCoords: coords => dispatch(setCurrentCoordsThunk(coords)),
    saveRun: (id, route, distance) => dispatch(saveRun(id, route, distance)),
    completeRun: id => dispatch(completeRun(id)),
  };
};

export default connect(mapState, mapDispatch)(MapScreen);
