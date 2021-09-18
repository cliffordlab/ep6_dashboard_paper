import React from 'react'
import { Line } from 'react-chartjs-2'

const Chart = () => {
   return (
      <div>
         <Line
         data = {{
            labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            datasets: [
               {
                  label: 'Audio',
                  data: [23, 32, 14, 51, 17, 41, 12, 19, 43, 22],
                  borderColor: 'black',
                  borderWidth: 2,
                  fill: false
               },
               {
                  label: 'Visual',
                  data: [35, 28, 43, 19, 37, 32, 53, 9, 18, 12],
                  borderColor: 'brown',
                  borderWidth: 2,
                  fill: false,
                  lineTension: 0.5
               },
               {
                  label: 'Temperature',
                  data: [30, 40, 25, 39, 27, 19, 33, 30, 25, 40],
                  borderColor: '#046c8b',
                  borderWidth: 2,
                  fill: true
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