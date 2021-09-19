import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2'

const Chart = (props) => {

   return (
      <div>
         <Line
         data = {{
            labels:  props.audioData.x,
            datasets: [
               {
                  label: 'Audio 1',
                  data :  props.audioData.y,
                  borderColor: 'brown',
                  borderWidth: 2,
                  fill: true,
                  lineTension: 0.5,
		  pointRadius : 2,
	    	  pointHoverRadius : 5,
	    	  pointHoverBackgroundColor : 'rgb(127,127,127)'
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
   )
}

export default Chart
