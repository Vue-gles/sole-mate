import React, { Component } from 'react';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { getDistance } from 'geolib';
import { connect } from 'react-redux';
import { completeRun } from '../store/upcomingRuns';
import MapViewDirections from 'react-native-maps-directions';
import getEnvVars from '../../environment';
const { GOOGLE_API_KEY } = getEnvVars();
import { saveRun } from '../store/pastRuns';
import { Chevron } from 'react-native-shapes';
import RNPickerSelect from 'react-native-picker-select';
import { computeDestinationPoint } from 'geolib';

import socket from '../socket/index';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';

const circleColor = 'rgba(93, 173, 226, 0.2)';
const circle2Color = 'rgba(231, 76, 60  , 0.2)';

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
      bigCircleRadius: 0.0,
      smallCircleRadius: 0.0,
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
      seconds: 0,
      coordinates: [],
      distance: 0,
      clearButtonDisabled: true,
      handlerEnabled: false,
    });
  }

  saveTracking() {
    console.log('----------->', this.state.seconds);
    dataIndex = -1;
    const runId = this.props.currentRun.id;
    const distance = this.state.distance.toFixed(2);
    const coords = JSON.stringify(this.state.coordinates);
    const seconds = this.state.seconds;
    this.props.saveRun(runId, coords, distance, seconds);
    this.props.completeRun(runId);
    const payload = { runId, coords, distance };
    socket.emit('completeRun', payload);
    this.setState({
      seconds: 0,
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
          currentLat: 40.6726,
          currentLng: -73.95232,
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

    let searchedRegion = {
      latitude: this.state.currentLat,
      longitude: this.state.currentLng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const milesToMeters = miles => {
      return miles / 0.00062137;
    };

    const getRandomPointsInRadius = (startingLat, startingLong, milesToRun) => {
      const metersToRun = milesToMeters(milesToRun);
      const triangleRatio = 0.2928932188134525;
      const radius = (metersToRun * 0.623) * triangleRatio;
      const angle = Math.random() * 360;
      const angleForSecondPoint = angle - 90;
      const firstPoint = computeDestinationPoint(
        { latitude: startingLat, longitude: startingLong },
        radius,
        angle
      );
      const secondPoint = computeDestinationPoint(
        { latitude: startingLat, longitude: startingLong },
        radius,
        angleForSecondPoint
      );

      return [firstPoint, secondPoint];
    };

    const randPoints = getRandomPointsInRadius(
      this.state.currentLat,
      this.state.currentLng,
      8
    );

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
            radius={this.state.bigCircleRadius}
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
            radius={this.state.smallCircleRadius}
            fillColor={circleColor}
          />
          <Marker
            pinColor="green"
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
          />
          {/* <MapViewDirections
            origin={'792 Sterling Place, Brooklyn, NY'}
            destination={'2 Broad Street, New York, NY'}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
          /> */}
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

          <MapViewDirections
            origin={'792 Sterling Place, Brooklyn, NY'}
            destination={{
              latitude: randPoints[0].latitude,
              longitude: randPoints[0].longitude,
            }}
            waypoints={[ {
                latitude: randPoints[0].latitude,
                longitude: randPoints[0].longitude,
              }, {
                latitude: randPoints[1].latitude,
                longitude: randPoints[1].longitude,
              }, '792 Sterling Place, Brooklyn, NY']}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            mode={'WALKING'}
            strokeColor="hotpink"
            onReady={(params) => console.log('Params are ------->', params.distance)}
          />
        </MapView>
        <ScrollView horizontal={true}>
          <View style={styles.rowButtonStyle}>
            <RaisedTextButton
              style={styles.button}
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
            <RaisedTextButton
              style={styles.button}
              title="Pause"
              ref={ref => {
                this.stopButton = ref;
              }}
              disabled={this.state.stopButtonDisabled}
              onPress={() => {
                this.stopClock();
                this.stopTracking();
              }}
            />
            <RaisedTextButton
              style={styles.button}
              title="Clear"
              ref={ref => {
                this.clearButton = ref;
              }}
              disabled={this.state.clearButtonDisabled}
              onPress={() => this.clearTracking()}
            />
            <RaisedTextButton
              style={styles.button}
              title="Save"
              ref={ref => {
                this.saveButton = ref;
              }}
              disabled={this.state.clearButtonDisabled}
              onPress={() => this.saveTracking()}
            />
          </View>

          <View style={styles.rowButtonStyle2}>
            <View style={styles.stats}>
              <Text style={styles.distanceTextStyle}>
                {this.state.distance.toFixed(2)} miles
              </Text>
              <Text style={styles.distanceTextStyle}>
                {' '}
                {this.toSecs(this.state.seconds)}
              </Text>
              <RNPickerSelect
                placeholder={{ label: 'Circle 1' }}
                items={[
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                  21,
                  22,
                  23,
                  24,
                  25,
                ].map(mile => {
                  return {
                    label: `${mile} miles`,
                    value: parseFloat(mile) * 1609.34,
                  };
                })}
                onValueChange={value =>
                  this.setState({ bigCircleRadius: value })
                }
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 7,
                    right: 12,
                  },
                }}
                value={this.state.bigCircleRadius}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: 'red' }}
                Icon={() => {
                  return <Chevron size={1} color="red" />;
                }}
              />
              <RNPickerSelect
                placeholder={{ label: 'Circle 2' }}
                items={[
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                  21,
                  22,
                  23,
                  24,
                  25,
                ].map(mile => {
                  return {
                    label: `${mile} miles`,
                    value: parseFloat(mile) * 1609.34,
                  };
                })}
                onValueChange={value =>
                  this.setState({ smallCircleRadius: value })
                }
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 7,
                    right: 12,
                  },
                }}
                value={this.state.smallCircleRadius}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: 'blue' }}
                Icon={() => {
                  return <Chevron size={1} color="blue" />;
                }}
              />
            </View>
          </View>
        </ScrollView>
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
    flex: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  rowButtonStyle: {
    width: Dimensions.get('window').width,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 12,
    flexWrap: 'wrap',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowButtonStyle2: {
    width: Dimensions.get('window').width,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 12,
    flexWrap: 'wrap',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceTextStyle: {
    fontWeight: 'bold',
    color: 'skyblue',
    paddingBottom: '3%',
    paddingRight: '3%',
    fontSize: 20,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'skyblue',
    color: 'yellow',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    padding: '1%',
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 8,
    color: 'whitesmoke',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 12,
    borderWidth: 0.5,
    borderColor: 'skyblue',
    borderRadius: 8,
    color: 'whitesmoke',
    paddingRight: 30, // to ensure the text is never behind the icon
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
    saveRun: (id, route, distance, seconds) =>
      dispatch(saveRun(id, route, distance, seconds)),
    completeRun: id => dispatch(completeRun(id)),
  };
};

export default connect(mapState, mapDispatch)(MapScreen);