import React, { useEffect, useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import Stats from "../../components/stats/Stats";

import zoomPlugin from "chartjs-plugin-zoom";

import "./humidity.css";

Chart.register(zoomPlugin);

const Humidity = (props) => {
    const [humidityData, setHumidityData] = useState({
        data: { x: [], humidity: [], temperature: [] },
        stats: { mean: 0, median: 0, variance: 0, correlation: 0 },
    });
    useEffect(() => {
        fetch("/humidity/get-data")
            .then((res) => res.json())
            .then((data) => {
                setHumidityData(data);
            });
    }, []);

    return (
        <div className="humidity">
            <Stats stats={humidityData} />
            <div className="humiditychart-wrapper">
                <Line
                    data={{
                        labels: humidityData.data.x,
                        datasets: [
                            {
                                label: "Humidity",
                                data: humidityData.data.humidity,
                                borderColor: "red",
                                borderWidth: 2,
                                fill: true,
                                lineTension: 0.5,
                                pointRadius: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgb(127,127,127)",
                            },
                            {
                                label: "Temperature",
                                data: humidityData.data.temperature,
                                borderColor: "blue",
                                borderWidth: 2,
                                fill: true,
                                lineTension: 0.5,
                                pointRadius: 2,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgb(127,127,5)",
                            },
                        ],
                    }}
                    height={400}
                    weidth={600}
                    options={{
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
        </div>
    );
};

export default Humidity;
