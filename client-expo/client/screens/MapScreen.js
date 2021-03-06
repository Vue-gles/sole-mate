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
import { connect } from 'react-redux';
import { getDistance, computeDestinationPoint } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';
import GooglePlacesInput from '../components/GooglePlacesInput';


import { completeRun } from '../store/upcomingRuns';
import getEnvVars from '../../environment';
const { GOOGLE_API_KEY } = getEnvVars();
import { saveRun } from '../store/pastRuns';
import socket from '../socket/index';
import MapScroller from '../components/MapScroller';


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
      randRouteStartLat: 0,
      randRouteStartLong: 0,
      randRoutePrefMiles: 3,
      randRouteDestPoints: [],
      randRouteDistance: 0,
      showRandRoute: false,
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
    this.handleStateChange = this.handleStateChange.bind(this)
    this.toSecs = this.toSecs.bind(this)
    this.generateRandomRoute= this.generateRandomRoute.bind(this)
    this.stopTracking = this.stopTracking.bind(this)
  }
  handleStateChange(stateProp, value) {
    this.setState({[stateProp]: value})
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
          currentLat: position.coords.latitude,
          currentLng: position.coords.longitude,
          randRouteStartLat: position.coords.latitude,
          randRouteStartLong: position.coords.longitude,
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

  generateRandomRoute() {
    const milesToMeters = miles => {
      return miles / 0.00062137;
    };

    const getRandomPointsInRadius = (startingLat, startingLong, milesToRun) => {
      const metersToRun = milesToMeters(milesToRun);
      const triangleRatio = 0.2928932188134525;
      const radius = metersToRun * 0.8 * triangleRatio; //.623
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

    const randRouteDestPoints = getRandomPointsInRadius(
      this.state.randRouteStartLat,
      this.state.randRouteStartLong,
      this.state.randRoutePrefMiles
    );
    this.setState({ randRouteDestPoints });
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
          {this.state.randRouteDestPoints && this.state.showRandRoute ? (
            <MapViewDirections
              origin={{
                latitude: this.state.randRouteStartLat,
                longitude: this.state.randRouteStartLong,
              }}
              destination={{
                latitude: this.state.randRouteStartLat,
                longitude: this.state.randRouteStartLong,
              }}
              waypoints={[
                {
                  latitude: this.state.randRouteDestPoints[0].latitude,
                  longitude: this.state.randRouteDestPoints[0].longitude,
                },
                {
                  latitude: this.state.randRouteDestPoints[1].latitude,
                  longitude: this.state.randRouteDestPoints[1].longitude,
                },
              ]}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              mode={'WALKING'}
              strokeColor="hotpink"
              onReady={params =>
                this.setState({ randRouteDistance: params.distance })
              }
            />
          ) : null}
        </MapView>
        {/* styles = props.styles
    props.startClock
    props.startTracking
    props.stopTracking
    props.clearButton
    props.saveButton
    props.clearTracking
    props.saveTracking */}
        <MapScroller state={this.state} handleStateChange={this.handleStateChange} styles={styles} startClock={this.startClock} startTracking={this.startTracking} stopTracking={this.stopTracking}
        clearButtonDisabled={this.clearButtonDisabled} 
        saveButton={this.saveButton}
        clearTracking={this.clearTracking}
        saveTracking={this.saveTracking}
        toSecs={this.toSecs}
        pickerSelectStyles={pickerSelectStyles}
        pickerSelectStyles2={pickerSelectStyles2}
        generateRandomRoute={this.generateRandomRoute}
        stopTracking={this.stopTracking}
        stopClock = {this.stopClock}
        />
        {/* <ScrollView horizontal={true}>
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
            <View style={styles.stats2}>
              <View style={styles.button2}>
                <Button
                  title="Random route"
                  onPress={() => {
                    this.generateRandomRoute();
                    setTimeout(() => {
                      this.setState({ showRandRoute: true });
                    }, 1000);
                  }}
                />
              </View>
              <View style={styles.button2}>
                <Button
                  title="Hide rand route"
                  disabled={this.state.showRandRoute ? false : true}
                  onPress={() => {
                    this.setState({ showRandRoute: false });
                  }}
                />
              </View>
              <View margin={7}>
                <RNPickerSelect
                  placeholder={{ label: 'Circle 2' }}
                  items={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(mile => {
                    return {
                      label: `${mile} mile route`,
                      value: mile,
                    };
                  })}
                  onValueChange={value =>
                    this.setState({ randRoutePrefMiles: value })
                  }
                  style={{
                    ...pickerSelectStyles2,
                    textAlign: 'center',
                    iconContainer: {
                      top: 7,
                      right: 12,
                    },
                  }}
                  value={this.state.randRoutePrefMiles}
                  useNativeAndroidPickerStyle={false}
                  textInputProps={(style = { textAlign: 'center' })}
                />
              </View>
            </View>
            <View style={styles.stats}>
              {this.state.randRouteDistance && this.state.showRandRoute ? (
                <Text style={{ paddingVertical: -1, marginVertical: -1 }}>
                  Generated route:
                  {(this.state.randRouteDistance / 1.609).toFixed(2)} miles
                </Text>
              ) : null}
            </View>
          </View>
        </ScrollView> */}
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
    marginBottom: 0,
    marginTop: 5,
    paddingTop: 5,
  },
  stats2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 5,
    paddingTop: 5,
  },
  distanceTextStyle: {
    fontWeight: 'bold',
    color: 'skyblue',
    paddingBottom: '3%',
    paddingRight: '3%',
    fontSize: 20,
    flexWrap: 'wrap',
  },
  button2: {
    flex: 1,
    backgroundColor: 'skyblue',
    color: 'yellow',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
  },
  button1: {
    backgroundColor: 'skyblue',
    color: 'yellow',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-evenly',
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

const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    padding: '1%',
    paddingVertical: 10,
    fontSize: 12,
    backgroundColor: '#4287f5',
    borderRadius: 8,
    color: 'black',
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  inputAndroid: {
    fontSize: 12,
    borderWidth: 0.5,
    borderColor: 'skyblue',
    borderRadius: 8,
    color: 'whitesmoke',
    paddingRight: 30, // to ensure the text is never behind the icon
    justifyContent: 'center',
    alignContent: 'center',
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
