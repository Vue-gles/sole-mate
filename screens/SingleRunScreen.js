mport React from 'react';
import {
  AsyncStorage,
  Button,
  StatusBar,
  Image,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

class SingleRunScreen extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View>
        <Text>Single Run</Text>
      </View>
    )
  }
}

const mapState = state => {
  return {
  };
};

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(mapState, mapDispatch)(SingleRunScreen);
