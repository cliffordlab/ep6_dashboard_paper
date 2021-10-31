import React, { useEffect, useState } from "react";
import { Chart, Line } from "react-chartjs-2";

import zoomPlugin from "chartjs-plugin-zoom";

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";

Chart.register(zoomPlugin);

const Humidity = (props) => {
    const { mode } = React.useContext(ThemeContext);
    const styles = humidityStyles(mode);

    const [humidityData, setHumidityData] = useState({
        data: { x: [], humidity: [], temperature: [] },
    });
    useEffect(() => {
        fetch("/humidity/get-data")
            .then((res) => res.json())
            .then((data) => {
                setHumidityData(data);
            });
    }, []);

    return (
        <div style={styles.humidity}>
            <div style={styles.humidityChartWrapper}>
                <Line
                    data={{
                        labels: humidityData.data.x,
                        datasets: [
                            {
                                label: "Temperature",
                                data: humidityData.data.humidity,
                                borderColor: "brown",
                                borderWidth: 2,
                                fill: false,
                                lineTension: 0.5,
                                pointRadius: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgb(127,127,127)",
                            },
                        ],
                    }}
                    height={400}
                    weidth={600}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: {
                                title: {
                                    padding: {
                                        top: 5,
                                    },
                                    display: true,
                                    text: "Y: Some Values",
                                    color: "gray",
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
                                    color: "gray",
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
                                    speed: 100,
                                },
                            },
                        },
                    }}
                />
                <Line
                    data={{
                        labels: humidityData.data.x,
                        datasets: [
                            {
                                label: "Humidity",
                                data: humidityData.data.temperature,
                                borderColor: "gold",
                                borderWidth: 2,
                                fill: false,
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
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: {
                                title: {
                                    padding: {
                                        top: 5,
                                    },
                                    display: true,
                                    text: "Y: Some Values",
                                    color: "gray",
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
                                    color: "gray",
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

const humidityStyles = (mode) => ({
    humidity: {
        flex: 4, 
        backgroundColor: theme[mode].backgroundColor,
    },
    humidityChartWrapper: {
        height: "60vh",
        width: "96%",
        marginRight: "15px",
    },
});
