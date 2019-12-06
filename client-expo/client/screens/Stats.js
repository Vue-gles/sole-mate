import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
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
    let withPartners = { yes: 0, no: 0 };
    let paceAvg = {
      January: { miles: 0, amt: 0 },
      February: { miles: 0, amt: 0 },
      March: { miles: 0, amt: 0 },
      April: { miles: 0, amt: 0 },
      May: { miles: 0, amt: 0 },
      June: { miles: 0, amt: 0 },
      July: { miles: 0, amt: 0 },
      August: { miles: 0, amt: 0 },
      September: { miles: 0, amt: 0 },
      October: { miles: 0, amt: 0 },
      November: { miles: 0, amt: 0 },
      December: { miles: 0, amt: 0 },
    };

    pastRuns.forEach(run => {
      let month = moment(run.endTimeFrame).format('MMMM');
      ++runsPerMonth[month];

      if (run.distance && run.seconds) {
        console.log('distsance', run.distance, 'seconds', run.seconds)
        paceAvg[month].paces = paceAvg[month].paces + run.distance;
        ++paceAvg[month].amt;
      }

      if (run.partnerId) {
        ++withPartners['yes'];
      } else {
        ++withPartners['no'];
      }
    });

    console.log('data is',  [paceAvg.September.distance / (paceAvg.September.seconds * 3600),
    paceAvg.October.distance / (paceAvg.October.seconds * 3600),
    paceAvg.November.distance / (paceAvg.November.seconds * 3600),
    paceAvg.December.distance / (paceAvg.December.seconds * 3600)])

    const paceData = {
      labels: ['September', 'October', 'November', 'December'],
      datasets: [
        {
          data: [
            paceAvg.September.distance / (paceAvg.September.seconds * 3600),
            paceAvg.October.distance / (paceAvg.October.seconds * 3600),
            paceAvg.November.distance / (paceAvg.November.seconds * 3600),
            paceAvg.December.distance / (paceAvg.December.seconds * 3600),
          ],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
    };

    const runsWithPartners = [
      {
        name: 'With a partner',
        population: withPartners['no'],
        color: 'green',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Without a partner',
        population: withPartners['yes'],
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];

    return (
      <ScrollView>
        <View paddingVertical={10} />
        <View paddingVertical={10} />
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
        <PieChart
          data={runsWithPartners}
          width={Dimensions.get('window').width - 10}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
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
          accessor="population"
          backgroundColor="transparent"
          paddingLeft={5}
          absolute
        />

        <View alignItems={'center'}>
          <Text style={styles.chartTitle}>Runs per month</Text>
          
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

const styles = StyleSheet.create({
  chartTitle: {
    fontWeight: 'bold',
  },
});
