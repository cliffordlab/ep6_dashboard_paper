import React, { useEffect, useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";

Chart.register(zoomPlugin);

const Illuminance = (props) => {
    const [illuminanceData, setIlluminanceData] = useState({
        data: { x: [], Channel1: [], Channel2: [], Channel3: [], Channel4: [] },
    });
    useEffect(() => {
        fetch("/illuminance/get-data")
            .then((res) => res.json())
            .then((data) => {
                setIlluminanceData(data);
                console.log("data fetched", data);
            });
    }, []);

    const Chart = () => {
        const [chartData, SetChartData] = useState({});
    };

    const { mode } = React.useContext(ThemeContext);
    const styles = illuminanceStyles(mode);

    return (
        <div style={styles.illuminance}>
            
            <div style={styles.illuminancechartWrapper}>
                <Line
                    data={{
                        labels: illuminanceData.data.x,
                        datasets: [
                            {
                                label: "Channel 1",
                                data: illuminanceData.data.Channel1,
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
                                data: illuminanceData.data.Channel2,
                                borderColor: "green",
                                borderWidth: 2,
                                fill: false,
                                lineTension: 0.5,
                                pointRadius: 2,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgb(127,127,127)",
                            },
                            {
                                label: "Channel 3",
                                data: illuminanceData.data.Channel3,
                                borderColor: "gold",
                                borderWidth: 2,
                                fill: false,
                                lineTension: 0.5,
                                pointRadius: 2,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgb(127,127,127)",
                            },
                            {
                                label: "Channel 4",
                                data: illuminanceData.data.Channel4,
                                borderColor: "blue",
                                borderWidth: 2,
                                fill: false,
                                lineTension: 0.5,
                                pointRadius: 2,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgb(127,127,127)",
                            },
                            {
                                label: "Channel 5",
                                data: illuminanceData.data.Channel5,
                                borderColor: "gray",
                                borderWidth: 2,
                                fill: false,
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

export default Illuminance;

const illuminanceStyles = (mode) => ({
    illuminance: {
        flex: 4,
        backgroundColor: theme[mode].backgroundColor,
    },
    illuminancechartWrapper: {
        height: "60vh",
        width: "96%",
        marginRight: "15px",
    },
});
