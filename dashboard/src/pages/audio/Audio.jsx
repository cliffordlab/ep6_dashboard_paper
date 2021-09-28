import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2'
import Stats from '../../components/stats/Stats';
import './audio.css'

const Audio = (props) => {

   const [audioData, setAudioData] = useState({ data : { x : [], y: [] } , stat: { mean : 0, median : 0, variance : 0, last10 : 0 } });
   useEffect(() => {
      fetch('/audio/get-data').then(res => res.json()).then(data => {
         setAudioData(data);
      });
   }, []);


   return (
      <div className="audio">
         <Stats stats={audioData.stat}/>
         <div className="audiochart-wrapper">
            <Line
               data = {{
                  labels:  audioData.data.x,
                  datasets: [
                     {
                        label: 'Audio 1',
                        data :  audioData.data.y,
                        borderColor: 'brown',
                        borderWidth: 2,
                        fill: false,
                        lineTension: 0,
                        pointRadius : 2,
                        pointHoverRadius : 5,
                        pointHoverBackgroundColor : 'rgb(127,127,127)'
                     }
                  ]
               }}
               height = {400}
               width = {600}
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

export default Audio
