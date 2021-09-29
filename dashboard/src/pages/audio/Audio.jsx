import React, {useEffect, useState} from 'react';
import * as Zoom from 'chartjs-plugin-zoom';
import { Line } from 'react-chartjs-2';
import Stats from '../../components/stats/Stats';

import './audio.css'

const Audio = (props) => {

   const [audioData, setAudioData] = useState({ data : { x : [], y: [] } , stat: { mean : 0, median : 0, variance : 0, last10 : 0 } });
   useEffect(() => {
      fetch('/audio/get-data').then(res => res.json()).then(data => {
         setAudioData(data);
      });
   }, []);

   const Chart = () => {
      const [chartData, SetChartData] = useState({});
   }


   return (
      <div className="audio">
         
         <Stats stats={audioData.stat}/>

         <div className="audiochart-wrapper" style={{width: "900px", height: "400px", marginLeft: "auto", marginRight: "auto"}}>
            <Line
               data = {{
                  labels:  audioData.data.x,
                  datasets: [
                     {
                        label: 'Audio 1',
                        data :  audioData.data.y,
                        borderColor: 'black',
                        borderWidth: 2,
                        fill: false,
                        lineTension: 0,
                        pointRadius : 1,
                        pointHoverRadius : 5,
                        pointHoverBackgroundColor : 'rgb(127,127,127)'
                     }
                  ]
               }}
               height = {400}
               width = {600}
               options = {{
                  responsive: true,
                  title: {text: "iron man", display: true},
                  maintainAspectRatio: false,
                  scales: {
                     yAxes: [
                        {
                           scaleLabel: {
                              display: true,
                              labelString: 'Y-Axis'
                           },
                           ticks: {
                              autoSkip: true,
                              maxTicksLimit: 10,
                              beginAtZero: true
                           }
                        }
                     ]
                  },
                  pan: {
                     enabled: true,
                     mode: "xy",
                     speed: 10,
                  },
                  zoom: {
                     wheel: {
                        enabled: true,
                     },
                     drag: false,
                     mode: "xy",
                     limits: {
                        x: {min: 0, max: 400, minRange: 10},
                        y: {min: -200, max: 400, minRange: 10}
                      },
                  }
               }}
            /> 
         </div>
      </div>
   )
}

export default Audio
