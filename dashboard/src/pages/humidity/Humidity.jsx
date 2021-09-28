import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2'
import Stats from '../../components/stats/Stats';

import './humidity.css'

const Humidity = (props) => {

   const [humidityData, setHumidityData ] = useState({   data : { x : [], humidity: [], temperature : [] },
                                                         stats :  { mean : 0, median : 0, variance : 0, correlation : 0 } 
                                                      });
   useEffect(() => {
      fetch('/humidity/get-data').then(res => res.json()).then(data => {
         setHumidityData(data);
      });
   }, []);


   return (
      <div className="humidity">
         <Stats stats={humidityData}/>
         <div className="humiditychart-wrapper">
            <Line
            data = {{
               labels:  humidityData.data.x,
               datasets: [
                  {
                     label: 'Humidity',
                     data :  humidityData.data.humidity,
                     borderColor: 'black',
                     borderWidth: 2,
                     fill: false,
                     lineTension: 0,
                     pointRadius : 1,
                     pointHoverRadius : 5,
                     pointHoverBackgroundColor : 'rgb(127,127,127)'
                  },
                  {
                     label: 'Temperature',
                     data :  humidityData.data.temperature,
                     borderColor: '#4040a1',
                     borderWidth: 2,
                     fill: false,
                     lineTension: 0,
                     pointRadius : 1,
                     pointHoverRadius : 5,
                     pointHoverBackgroundColor : 'rgb(127,127,5)'
                  }
               ]
            }}
               height = {400}
               weidth = {600}
               options = {{
                  maintainAspectRatio: false,
                  scales: {
                     yAxes: [
                        {
                           ticks: {
                              beginAtZero: true
                           }
                        }
                     ]
                  }
               }}
            />

         </div>
      </div>
   )
}

export default Humidity
