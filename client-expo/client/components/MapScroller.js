import React from 'react'

export default MapScroller = (props) => {
    styles = props.styles
    props.startClock
    props.startTracking
    props.stopTracking
    props.clearButton
    props.saveButton
    props.clearTracking
    props.saveTracking
    props.state.stopButtonDisabled
    props.state.clearButtonDisabled

    return (
        <ScrollView horizontal={true}>
          <View style={styles.rowButtonStyle}>
            <RaisedTextButton
              style={styles.button}
              title="Start"
              ref={ref => {
                this.startButton = ref;
              }}
              disabled={props.state.startButtonDisabled}
              onPress={() => {
                props.startClock();
                props.startTracking(5000);
              }}
            />
            <RaisedTextButton
              style={styles.button}
              title="Stop"
              ref={ref => {
                this.stopButton = ref;
              }}
              disabled={props.state.stopButtonDisabled}
              onPress={() => {
                this.stopClock();
                this.stopTracking();
              }}
            />
            <RaisedTextButton
              style={styles.button}
              title="Clear"
              ref={ref => {
                props.clearButton = ref;
              }}
              disabled={props.state.clearButtonDisabled}
              onPress={() => props.clearTracking()}
            />
            <RaisedTextButton
              style={styles.button}
              title="Save"
              ref={ref => {
                props.saveButton = ref;
              }}
              disabled={props.state.clearButtonDisabled}
              onPress={() => props.saveTracking()}
            />
          </View>

          <View style={styles.rowButtonStyle2}>
            <View style={styles.stats}>
              <Text style={styles.distanceTextStyle}>
                {props.state.distance.toFixed(2)} miles
              </Text>
              <Text style={styles.distanceTextStyle}>
                {' '}
                {this.toSecs(props.state.seconds)}
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
        </ScrollView>
    )
}

