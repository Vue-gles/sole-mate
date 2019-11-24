import React from 'react';
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
import Constants from 'expo-constants';
import moment from 'moment';
import { Link } from 'react-router-native';

import { removeSingleRun, getSingleRun } from '../store/singleRun';

class SingleRunScreen extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    console.log('SingleRun View -------------------->');
  }

  componentDidMount() {
    const { runId } = this.props.match.params;
    this.props.getSingleRun(runId);
  }

  clickHandler() {
    this.props.back();
  }

  render() {
    const { run } = this.props;
    return (
      <View style={styles.container}>
        {this.props.run && this.props.run.id && (
          <View style={styles.container}>
            <Image
              source={{
                uri: run.Creator.imageUrl,
              }}
              style={styles.runImage}
            />
            <Text>Creator Name: {run.Creator.firstName}</Text>
            <Text>Location: {run.locationName}</Text>
            <Text>Date: {moment(run.startTimeframe).format('MMMM Do')}</Text>
            <Text>
              Time: {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
              {moment(run.endTimeframe).format('h:mm:ss a')}
            </Text>
            <Button title="Request Run" />
            <Link to="/" onPress={this.clickHandler}>
              <Text>Back</Text>
            </Link>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  runImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 30,
    marginLeft: -10,
  },
});

const mapState = state => {
  return {
    run: state.singleRun,
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleRun: id => dispatch(getSingleRun(id)),
    back: () => dispatch(removeSingleRun()),
  };
};

export default connect(mapState, mapDispatch)(SingleRunScreen);
