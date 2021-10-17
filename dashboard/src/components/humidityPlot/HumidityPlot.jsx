import React from 'react'
import { Chart, Line } from 'react-chartjs-2';
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

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
                     maintainAspectRatio: false,
                     scales: {
                         yAxes: [
                             {
                                 ticks: {
                                     beginAtZero: true,
                                 },
                             },
                         ],
                     },
                     plugins: {
                         zoom: {
                             pan: {
                                 enabled: true,
                                 mode: "xy",
                             },
                             zoom: {
                                 wheel: {
                                     enabled: true,
                                 },
                                 mode: "x",
                                 speed: 100,
                             },
                         },
                     },
                  }}
               /> 
      </div>
    )
}
