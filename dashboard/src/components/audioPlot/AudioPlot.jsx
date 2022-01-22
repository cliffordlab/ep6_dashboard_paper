import React from "react";

import { Chart, Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

export default function AudioPlot(props) {
    console.log(props);

    return (
        <div style={props.style}>
            <Line
                data={{
                    labels: props.data.x,
                    datasets: [
                        {
                            label: "Channel 1",
                            data: props.data.Channel1,
                            borderColor: "maroon",
                            borderWidth: 2,
                            fill: false,
                            lineTension: 0.5,
                            pointRadius: 2,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgb(127,127,127)",
                        },
                        {
                            label: "Channel 2",
                            data: props.data.Channel2,
                            borderColor: "green",
                            borderWidth: 2,
                            fill: false,
                            lineTension: 0.5,
                            pointRadius: 2,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgb(127,127,127)",
                            hidden: true,
                        },
                        {
                            label: "Channel 3",
                            data: props.data.Channel3,
                            borderColor: "gold",
                            borderWidth: 2,
                            fill: false,
                            lineTension: 0.5,
                            pointRadius: 2,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgb(127,127,127)",
                            hidden: true,
                        },
                        {
                            label: "Channel 4",
                            data: props.data.Channel4,
                            borderColor: "blue",
                            borderWidth: 2,
                            fill: false,
                            lineTension: 0.5,
                            pointRadius: 2,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgb(127,127,127)",
                            hidden: true,
                        },
                    ],
                }}
                height={350}
                width={600}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    // color: props.style.color,
                    scales: {
                        yAxes: {
                            title: {
                                color: "red", // For X axis
                                padding: {
                                    top: 5,
                                },
                                display: true,
                                text: " Power (dB) ",
                                font: {
                                    size: 12,
                                    weight: 500,
                                },
                            },
                        },
                        xAxes: {
                            title: {
                                color: "red", // For Y axis
                                padding: {
                                    top: 5,
                                },
                                display: true,
                                text: "Time (sec)",
                                font: {
                                    size: 12,
                                    weight: 500,
                                },
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: "red", // For Labels on top
                            },
                        },
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
    );
}
