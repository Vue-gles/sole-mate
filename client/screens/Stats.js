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
import runs from '../../client-expo/client/store/runs';
import RunResultsScreen from '../../client-expo/client/screens/RunResultsScreen';

export default class Stats extends Component {
  render() {
    const pastRuns = this.props.navigation.getParams('pastRuns');
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
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: [
                {
                  data: [
                    runsPerMonth.January,
                    runsPerMonth.February,
                    runsPerMonth.March,
                    runsPerMonth.April,
                    runsPerMonth.May,
                    runsPerMonth.June,
                    runsPerMonth.July,
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
            yAxisLabel={'$'}
            yAxisSuffix={'k'}
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

// import * as scale from 'd3-scale';
// import * as shape from 'd3-shape';
// import * as d3Array from 'd3-array';

// const d3 = {
//   scale,
//   shape,
// };

// const y = d3.scale.scaleLinear().domain([0, 100]).range([0, 640])
// const x = d3.scale.scaleTime().domain([new Date(2000, 0, 1), new Date (2000, 0, 8)]).range([0, 640])

// const data = [
//   {date: new Date(2000, 1, 1), value: 83.24},
//   {date: new Date(2000, 1, 2), value: 85.35},
//   {date: new Date(2000, 1, 3), value: 98.84},
//   {date: new Date(2000, 1, 4), value: 79.92},
//   {date: new Date(2000, 1, 5), value: 83.80},
//   {date: new Date(2000, 1, 6), value: 88.47},
//   {date: new Date(2000, 1, 7), value: 94.47},
// ];

// const line = d3.shape.line()
//   // For every x value create the x accessor,
//   // which uses our x scale function.
//   .x(function(d) { return x(d.date); })
//   // Make our y accessor.
//   .y(function(d) { return y(d.value); });

// export function createLineGraph({
//   // This is the data that we get from the API.
//   data,
//   width,
//   height,
// }) {
//   // Get last item in the array.
//   const lastDatum = data[data.length - 1];

//   // Create our x-scale.
//   const scaleX = d3.scale.scaleTime().domain([data[0].time, lastDatum.time]).range([0, width])

//   // Collect all y values.
//   const allYValues = data.reduce((all, datum) => {
//     all.push(datum.temperatureMax);
//     return all;
//   }, []);

//   // Get the min and max y value.
//   const extentY = d3Array.extent(allYValues);

//   // Create our y-scale.
//   const scaleY = d3.scale.scaleLinear().domain([extentY[0], extentY[1]]).range([0, height])

//   // Use the d3-shape line generator to create the `d={}` attribute value.
//   const lineShape = d3.shape
//     .line()
//     // For every x and y-point in our line shape we are given an item from our
//     // array which we pass through our scale function so we map the domain value
//     // to the range value.
//     .x(d => scaleX(d.time))
//     .y(d => scaleY(d.temperatureMax));

//   return {
//     // Pass in our array of data to our line generator to produce the `d={}`
//     // attribute value that will go into our `<Shape />` component.
//     path: lineShape(data),
//   };
// }

// const lineGraph = createLineGraph({
//   data,
//   width: 200,
//   height: 100
// })

// import React from 'react';
// import {
//   ART,
//   View,
// } from 'react-native';
// const {
//   Surface,
//   Group,
//   Shape,
// } = ART;

// function ReactNativeART() {
//   return (
//     <View>
//       <Surface width={500} height={500}>
//         <Group x={100} y={0}>
//           <Shape
//             d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
//             stroke="#000"
//             strokeWidth={1} />
//         </Group>
//       </Surface>
//     </View>
//   )
// }
