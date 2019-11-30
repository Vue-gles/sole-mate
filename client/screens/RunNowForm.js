import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet, Dimensions} from 'react-native'
import MapView, { Marker, Circle, Polyline  } from 'react-native-maps';



export default class RunNowForm extends React.Component {
    constructor() {
        super()
        this.state = {
            street: '',
            city: '',
            state: '',
            lat: '',
            long: ''
        }
        this.locationHandler=this.locationHandler.bind(this)
    }
    
    locationHandler(lat, long, address) {
        address = address.split(', ');
        const street = address[0].slice(1, address[0].length);
        const city = address[1];
        const state = address[2];
    
        this.setState({ lat, long, street, city, state});
      }

      handlePress (evt) {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: evt.nativeEvent.coordinate,
            },
          ],
        });
      }

      onRegionChangeHandler(evt) {
        this.circle2.setNativeProps({ fillColor: circle2Color });
        this.circle.setNativeProps({ fillColor: circleColor });
      }
    
    render() {
        let searchedRegion = this.state.handlerEnabled ? {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0110,
            longitudeDelta: 0.0110
      } :
        
          {
            latitude: this.state.currentLat,
            longitude: this.state.currentLng,
            latitudeDelta: 0.0110,
            longitudeDelta: 0.0110
          }
        return (
            <View>
                <MapView
          provider="google"
          style={styles.mapStyle}
          type = 'retro'
          onRegionChange={this.onRegionChangeHandler} 
          region={searchedRegion}
          onPress = {this.handlePress}
          showsUserLocation={true}
          showsCompass = {true}
          followsUserLocation = {true}
          showsScale = {true}
          showsMyLocationButton = {true}	
          loadingEnabled = {true}
          loadingIndicatorColor = 'green'
          loadingBackgroundColor = 'green'
        />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: 'dodgerblue',
      opacity: 0.8
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
      textAlign:'center',
      opacity: 0.9,
    
    },
    distanceTextStyle: {
      fontWeight: 'bold',
      color: 'yellow',
      textAlignVertical: 'bottom',
      padding: '4%'
    
    }
  });
// import React, { Component } from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';

// import t from 'tcomb-form-native'; // 0.6.9

// const Form = t.form.Form;

// const User = t.struct({
//   location: t.Date,
//   username: t.String,
//   password: t.String,
//   terms: t.Boolean
// });

// const options = {
//     fields: {
//         location: {
//             "mode":'time'
//         }
//     }

// }

// export default class App extends Component {
  
//     onChange(value) {
//         console.log(value)
//       }

//   render() {
//     return (
//     <ScrollView>
//         <View style={styles.container}>
//         <Form type={User} 
//         onChange={this.onChange}
//         options={options}
//         /> 
//       </View>
//     </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     marginTop: 50,
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
// });