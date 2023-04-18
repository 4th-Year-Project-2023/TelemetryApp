import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, Dimensions} from 'react-native';
import axios from 'axios';
import {
    LineChart
  } from "react-native-chart-kit";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [telemetry, setTelemetry] = useState([]);
  let [humidity, setHumidity] = useState([]);
  let [tid, setTid] = useState([]);
  let [temperature, setTemperature] = useState([]);


  const fetchData = async () => {
    try {
      const res = await axios.get("http://64.227.170.83:8080/api/v1/get-telemetry");
      console.log(res.data);
      const temp = res.data;
      setTelemetry(temp);

      tid.splice(0, tid.length)
      const tempId = temp.map(temp=>tid.push(temp.id));

      humidity.splice(0, humidity.length)
      const tempHumidity = temp.map(temp=>humidity.push(temp.humidity));

      temperature.splice(0, temperature.length)
      const temTemperature = temp.map(temp=>temperature.push(temp.temperature));
      setLoading(false);
    } catch (error) {
      // handle error
    }
  }

  useEffect(() => {
    setInterval(fetchData, 10000);
  },[])

  return (
    <View style={{flex: 1, paddingTop: 50}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
      <View style={{width: Dimensions.get("window").width}}>
        <Text style={{marginTop: 20, marginLeft:20}}>Humidity Graph</Text>
        <LineChart
          data={{
            labels: tid,
            datasets: [
              {
                data: humidity
              }
            ]
          }}
          
          width={Dimensions.get("window").width} // from react-native
          height={220}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />

        <Text style={{marginTop: 50, marginLeft: 20}}>Temperature Graph</Text>
        <LineChart
          data={{
            labels: tid,
            datasets: [
              {
                data: temperature
              }
            ]
          }}
          
          width={Dimensions.get("window").width} // from react-native
          height={220}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
        
      )}
    </View>
  );
};

export default App;