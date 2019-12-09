import React from 'react';
import {
  AsyncStorage,
  StatusBar,
  Image,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import moment from 'moment';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Textarea,
} from 'native-base';

import socket from '../socket/index';

import { removeSingleRun, getSingleRun } from '../store/singleRun';
import { makeRequest } from '../store/outgoing';

class SingleRunScreen extends React.Component {
  constructor(props) {
    super(props);
    this.requestHandler = this.requestHandler.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('creatorName', 'Runs'),
    };
  };

  componentDidMount() {
    if (this.props.run && this.props.run.Creator) {
      const { firstName, lastName } = this.props.run.Creator;
      this.props.navigation.setParams({
        creatorName: `${firstName} ${lastName}`,
      });
    }
  }

  async requestHandler() {
    await this.props.request(this.props.run.id);
    socket.emit('newRequest');
    this.props.navigation.navigate('Notifications');
  }

  render() {
    const { run } = this.props;
    return this.props.run && this.props.run.id ? (
      <Container style={{ backgroundColor: '#ebf0ec' }}>
        <Content>
          <Image
            source={{
              uri: run.Creator.imageUrl,
            }}
            style={styles.runImage}
          />
          <List>
            <ListItem>
              <Text style={{ fontWeight: 'bold' }}>Name:</Text>
              <Text>
                {' '}
                {run.Creator.firstName} {run.Creator.lastName}
              </Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontWeight: 'bold' }}>Average Pace:</Text>
              <Text> {run.Creator.avgPace} mph</Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontWeight: 'bold' }}>Average mileage:</Text>
              <Text> {run.Creator.avgMileage}</Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontWeight: 'bold' }}>Miles for this run:</Text>
              <Text> {run.prefferedMileage}</Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontWeight: 'bold' }}>Location of run:</Text>
              <Text>
                {' '}
                {run.street}, {run.city}, {run.state}
              </Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontWeight: 'bold' }}>Date:</Text>
              <Text> {moment(run.startTimeframe).format('MMMM Do')}</Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontWeight: 'bold' }}>Time:</Text>
              <Text>
                {' '}
                {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
                {moment(run.endTimeframe).format('h:mm:ss a')}
              </Text>
            </ListItem>
            <View paddingVertical={5} />
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 15,
              }}
            >
              Bio
            </Text>
            <Textarea
              rowSpan={7}
              style={{ marginHorizontal: 10 }}
              bordered
              placeholder={run.Creator.bio}
              disabled={true}
            />
          </List>
          <View paddingVertical={8} />
        </Content>
        <View style={styles.btnContainer}>
          <Button
            title="Request Run"
            onPress={this.requestHandler}
            color={'white'}
          />
        </View>
      </Container>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303731',
  },
  details: {
    color: '#525E54',
  },
  runImage: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  btnContainer: {
    backgroundColor: '#124D1A',
    padding: 5,
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden',
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
    request: runId => dispatch(makeRequest(runId)),
  };
};

export default connect(mapState, mapDispatch)(SingleRunScreen);

// {this.props.run && this.props.run.id && (
//   <View style={styles.container}>
//     <Image
//       source={{
//         uri: run.Creator.imageUrl,
//       }}
//       style={styles.runImage}
//     />
//     <View style={styles.btnContainer}>
//       <Button
//         title="Request Run"
//         onPress={this.requestHandler}
//         color={'white'}
//       />
//     </View>
//     <View style={styles.subContainer}>
//       <Text style={styles.header}>
//         {run.Creator.firstName} {run.Creator.lastName}{' '}
//       </Text>
//       <Text style={styles.details}>{run.Creator.bio}</Text>
//       <Text style={styles.details}>
//         Avg. Pace {run.Creator.avgPace} mph
//       </Text>
//       <Text style={styles.details}>
//         Avg. Mileage {run.Creator.avgMileage} miles
//       </Text>
//     </View>
//     <View style={styles.subContainer}>
//       <Text style={styles.header}>Run Details</Text>
//       <Text style={styles.details}>{run.prefferedMileage} mile(s)</Text>
//       <Text style={styles.details}>
//         {run.street}, {run.city}, {run.state}
//       </Text>
//       <Text style={styles.details}>
//         {moment(run.startTimeframe).format('MMMM Do')}
//       </Text>
//       <Text style={styles.details}>
//         {moment(run.startTimeframe).format('h:mm:ss a')} -{' '}
//         {moment(run.endTimeframe).format('h:mm:ss a')}
//       </Text>
//     </View>
//   </View>
// )}
// </View>
