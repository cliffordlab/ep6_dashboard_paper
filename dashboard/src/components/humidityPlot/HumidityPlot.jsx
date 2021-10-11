import React from 'react'
import { Line } from 'react-chartjs-2';


export default function HumidityPlot(props) {

    return (
      <div>
      <Line
         data = {{
            labels:  props.data.x,
            datasets: [
               {
                  label: "Channel 1",
                  data :  props.data.humidity,
                  borderColor: '#7a5195',
                  borderWidth: 2,
                  fill: true,
                  lineTension: 0.5,
                  pointRadius : 2,
                  pointHoverRadius : 5,
                  pointHoverBackgroundColor : 'rgb(127,127,127)'
               },                     {
                  label: "Channel 2",
                  data :  props.data.temperature,
                  borderColor: '#202020',
                  borderWidth: 2,
                  fill: true,
                  lineTension: 0.5,
                  pointRadius : 2,
                  pointHoverRadius : 5,
                  pointHoverBackgroundColor : 'rgb(127,127,127)',
                  hidden: true
               }
            ]
         }}
         height = {props.height}
         width = {props.width}
         options = {{
            responsive: true,
            title: {text: "Audio", display: true},
            maintainAspectRatio: false,
            scales: {
               yAxes: [
                  {
                     scaleLabel: {
                        display: true,
                        labelString: 'dB'
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
    )
}
