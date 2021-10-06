import React, { useEffect, useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import Stats from "../../components/stats/Stats";
import zoomPlugin from "chartjs-plugin-zoom";

import "./audio.css";

Chart.register(zoomPlugin);

const Audio = (props) => {
    const [audioData, setAudioData] = useState({
        data: { x: [], y: [] },
        stat: { mean: 0, median: 0, variance: 0, last10: 0 },
    });
    useEffect(() => {
        fetch("/audio/get-data")
            .then((res) => res.json())
            .then((data) => {
                setAudioData(data);
                console.log("data fetched", data);
            });
    }, []);

    const Chart = () => {
        const [chartData, SetChartData] = useState({});
    };

    return (
        <div className="audio">
            <Stats stats={audioData.stat} />

            <div className="audiochart-wrapper">
                <Line
                    data={{
                        labels: audioData.data.x,
                        datasets: [
                            {
                                label: "Audio 1",
                                data: audioData.data.y,
                                borderColor: "brown",
                                borderWidth: 2,
                                fill: true,
                                lineTension: 0.5,
                                pointRadius: 2,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgb(127,127,127)",
                            },
                        ],
                    }}
                    height={400}
                    width={600}
                    options={{
                        responsive: true,
                        // title: { text: "iron man", display: true },
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Average Personal Income",
                                        fontColor: "#546372",
                                    },
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 10,
                                        beginAtZero: true,
                                    },
                                    title: {
                                        display: true,
                                        text: "Y axis title",
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

export default Audio;
