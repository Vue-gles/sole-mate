import React, {Component} from 'react';
import MapView, { Marker, Callout, Circle, Polyline  } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Button} from 'react-native';
import MapViewDirections from 'react-native-maps-directions'
//import key from '../keys'
import GooglePlacesInput from '../components/GooglePlacesInput'
// import { getDistance } from  'geolib'

const circleColor = 'rgba(204, 255, 255, 0.2)'
const circle2Color = 'rgba(225, 204, 153, 0.5)'
const radius_1 = 0.5 * 1609.34 // meters
const radius_2 = 1 * 1609.34 // meters

const demoMode = false
import { connect } from 'react-redux';

import { setCurrentLatThunk,setCurrentLongThunk } from '../store/currentCoord';

class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      latitude : 40.7128,
      longitude : -74.0060,
      error : null,
      markers: [],
      currentLat: 40.7128,
      currentLng: -74.0060,
      circle: null,
      circle2: null,
      coordinates: [],
      startButtonDisabled: false,
      stopButtonDisabled: true,
      clearButtonDisabled: true

    };
    this.handlePress = this.handlePress.bind(this)
    this.handler = this.handler.bind(this)
  }

  getCurrentLocation() {
    let loc = null
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("in getCurrentLocation");
        console.log(position);
        loc = {latitude: position.coords.latitude, longitude: position.coords.longitude}
        let distance = 0
        if (this.state.coordinates.length > 0) {
          distance = getDistance(this.state.coordinates[this.state.coordinates.length-1], loc) * 0.000621371
        }
        this.setState({
          coordinates: [...this.state.coordinates, loc],
          distance: this.state.distance + distance
        })
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
    return loc;
  }
  startTracking(interval=10000) {
    this.setState({
      stopButtonDisabled: false,
      startButtonDisabled: true,
      clearButtonDisabled: true
    })

    if (demoMode) {
      this.getCurrentLocationMock()
    } else {
      this.getCurrentLocation()
    }

    this._interval = setInterval(() => {
      console.log("in timer");
      if (demoMode) {
        this.getCurrentLocationMock()
      } else {
        this.getCurrentLocation()
      }
    }, interval);
  }

  stopTracking() {
    clearInterval(this._interval);
    this.setState({
      stopButtonDisabled: true,
      startButtonDisabled: false,
      clearButtonDisabled: false
    })
  }

  clearTracking() {
    // if you the mock data
    dataIndex = -1
    this.setState({
      coordinates: [],
      distance: 0,
      clearButtonDisabled: true
    })
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

   
    console.log('PARENT STATE', this.state)
  }
  componentDidMount() {
    navigator.geolocation.watchPosition(
       (position) => {
         console.log("MOUNTING",position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           currentLat: position.coords.latitude,
           currentLng: position.coords.longitude,
           coordinates: [...this.state.coordinates, 
            {latitude: position.coords.latitude, longitude: position.coords.longitude}],
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
     );
       console.log('currnet lat: ',this.state.currentLat)
       console.log('currnet long: ',this.state.currentLng)
     this.props.setCurrentLong({currentLong:this.state.currentLng})
     this.props.setCurrentLat({currentLat:this.state.currentLat})

   }

   onRegionChangeHandler(evt) {
    this.circle2.setNativeProps({ fillColor: circle2Color });
    this.circle.setNativeProps({ fillColor: circleColor });
  }

  render() {
    const notRenderDirection = this.state.latitude == 0 || this.state.coordinates.length == 0
    console.log("render() is called: ");
    console.log(this.state.coordinates);

    let currLoc = this.state.coordinates.length > 0 ?  this.state.coordinates[0] 
    : {latitude: this.state.latitude, longitude: this.state.longitude}

    
    return (
      <View style={styles.container}>
        <GooglePlacesInput currentCoordinates = 
        {{latitude: this.state.currentLat, longitude: this.state.currentLng}} 
        handler={this.handler}/>
        <MapView 
          provider = "google"
          style={styles.mapStyle}
          // onRegionChange={this.onRegionChangeHandler} 
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
            <Circle
            ref={ref => {
              this.circle2 = ref;
            }}
            center={{latitude: this.state.latitude, longitude: this.state.longitude}}
            radius={radius_2}
            fillColor={circle2Color}
          />
           <Circle
            ref={ref => {
              this.circle = ref;
            }}
            center={{latitude: currLoc.latitude, longitude: currLoc.longitude}}
            radius={radius_1}
            fillColor={circleColor}
          />
       
            
          <Marker pinColor = 'green' coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}} />
          
          
          {this.state.markers.map((marker) => {
            console.log("MARKER",marker)
            return <Marker key = {marker.coordinate.latitude * marker.coordinate.longitude/3.14159265358979323} {...marker} />
          })}
          
          {/* <MapViewDirections 
            origin = {{latitude: this.state.currentLat, longitude: this.state.currentLng}}
            destination = {{latitude: this.state.latitude, longitude: this.state.longitude }}
            apikey = {'AIzaSyDhdBOqOwo3CNrYXsne-2yEwqaaZ6MvlWo'}
            strokeWidth = {3}
            strokeColor = 'blue'
          
          /> */}
           {
            notRenderDirection ? null :
           <Polyline
            coordinates= {this.state.coordinates}
            strokeColor="hotpink"
            strokeWidth={6}
          />
          }
          
        </MapView>

        <View style={styles.rowButtonStyle}>
          <Button 
            title="Start" 
            ref={ref => {
              this.startButton = ref;
            }} 
            disabled={this.state.startButtonDisabled}
            onPress={() => this.startTracking(5000)}
            />
          <Button 
            title="Stop" 
            ref={ref => {
              this.stopButton = ref;
            }} 
            disabled={this.state.stopButtonDisabled}
            onPress={() => this.stopTracking()}
            />
          <Button 
            title="Clear" 
            ref={ref => {
              this.clearButton = ref;
            }} 
            disabled={this.state.clearButtonDisabled}
            onPress={() => this.clearTracking()}
          />
          <Text>Distance: </Text>
          <Text>
            {this.state.distance}
          </Text>
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
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
});

const mapState = state => {
  return {
    currentCoords: state.currentCoords
  };
};

const mapDispatch = dispatch => {
  return {
    setCurrentLong:(long)=>dispatch(setCurrentLongThunk(long)),
    setCurrentLat:(lat)=>dispatch(setCurrentLatThunk(lat))
  }
};

export default connect(mapState, mapDispatch)(MapScreen);
