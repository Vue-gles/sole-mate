import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import PlacesAutocomplete from './PlacesAutocomplete';
import Slider from 'react-native-slider';
import Constants from 'expo-constants';

// import TempGoogleInput from '../components/TempGoogleInput'
// import GooglePlacesInput from '../components/GooglePlacesInput';

export default class RunNowForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      city: '',
      state: '',
      lattitude: 0,
      longitude: 0,
      maxDistance: 20,
    };
    this.locationHandler = this.locationHandler.bind(this);
    this.handler = this.handler.bind(this);
  }

  locationHandler(lattitude, longitude, address) {
    address = address.split(', ');
    const street = address[0].slice(1, address[0].length);
    const city = address[1];
    const state = address[2];

    this.setState({ lattitude, longitude, street, city, state });
  }

  handler(name, lat, long) {
    this.setState({ latitude: lat, longitude: lng });
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('IT ISSSsss', position);
    });
  }

  render() {
    return (
      <ScrollView>
        <Text>Where would you like to start your run?</Text>
        <View style={styles.container}>
          <PlacesAutocomplete locationHandler={this.locationHandler} />
        </View>
        <View style={styles.container}>
          <Slider
            style={{ width: 300 }}
            step={1}
            minimumValue={18}
            maximumValue={71}
            value={this.state.maxDistance}
            onValueChange={val => this.setState({ maxDistance: val })}
            onSlidingComplete={val => this.getVal(val)}
          />
          <Text>Value: {this.state.value}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  item: {
    flex: 2,
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    borderBottomEndRadius: 30,
    height: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    height: 50,
  },
  picker: {
    alignSelf: 'center',
    fontSize: 15,
  },
});

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
