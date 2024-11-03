import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function SummaryGraph() {
  return (
    <View>
      <LineChart
        data={{
          labels: ['Sep 1', 'Sep 15', 'Oct 1', 'Oct 15', 'Nov 1', 'Nov 15', 'Dec 1'],
          datasets: [
            {
              data: [2, 1, 3, 5, 3, 2, 5],
            },
          ],
        }}
        width={screenWidth*0.9} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientFromOpacity: 0.7,
          backgroundGradientTo: '#ffa726',
          backgroundGradientToOpacity: 0.5,
          decimalPlaces: 0, // optional, defaults to 2dp
          
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '3',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignSelf: "center",
        }}
      />
    </View>
  );
}
