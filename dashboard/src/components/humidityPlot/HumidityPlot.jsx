import React from 'react'
import { Chart, Line } from 'react-chartjs-2';
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

export default function HumidityPlot(props) {

    return (
      <div style={props.style}>
      <Line
          data={{
              labels: props.data.x,
              datasets: [
                  {
                      label: "Temperature",
                      data: props.data.humidity,
                      borderColor: "brown",
                      borderWidth: 2,
                      fill: false,
                      lineTension: 0.5,
                      pointRadius: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgb(127,127,127)",
                  },
                  {
                      label: "Humidity",
                      data: props.data.temperature,
                      borderColor: "gold",
                      borderWidth: 2,
                      fill: false,
                      lineTension: 0.5,
                      pointRadius: 2,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgb(127,127,5)",
                      hidden: true
                  },
              ],
          }}
          height={350}
          width={600}
          options={{
              responsive: true,
              maintainAspectRatio: false,
              color: props.style.color,
              scales: {
                  yAxes: {
                      title: {
                          padding: {
                              top: 5,
                          },
                          display: true,
                          text: "Y: Some Values",
                          color: props.style.color,
                          font: {
                              size: 12,
                              weight: 500,
                          },
                      },
                  },
                  xAxes: {
                      title: {
                          padding: {
                              top: 5,
                          },
                          display: true,
                          text: "X: Time Dependent",
                          color: props.style.color,
                          font: {
                              size: 12,
                              weight: 500,
                          },
                      },
                  },
              },
              plugins: {
                  zoom: {
                      pan: {
                          enabled: true,
                          mode: "x",
                      },
                      zoom: {
                          wheel: {
                              enabled: true,
                          },
                          mode: "x",
                          speed: 50,
                      },
                  },
              },
          }}
      />
  </div>
    )
}
