import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import moment from 'moment';


export default class Stats extends Component {
  render() {
    const pastRuns = this.props.navigation.getParam('pastRuns');
    let runsPerMonth = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
    pastRuns.forEach(run => {
      let month = moment(run.endTimeFrame).format('MMMM');
      ++runsPerMonth[month];
    });

    return (
      <ScrollView>
        <View>
          <Text>Bezier Line Chart</Text>
          <LineChart
            data={{
              labels: [
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: [
                {
                  data: [
                    runsPerMonth.August,
                    runsPerMonth.September,
                    runsPerMonth.October,
                    runsPerMonth.November,
                    runsPerMonth.December,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
    );
  }
}