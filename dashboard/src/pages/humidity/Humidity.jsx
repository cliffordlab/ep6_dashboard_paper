import React, { useEffect, useRef, useState , useContext} from "react";

import MicMap from "../../components/micMap/MicMap";
import HumidityPlot from "../../components/humidityPlot/HumidityPlot";

import "./humidity.css";

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";
import { Container, Grid, Paper, Slider, makeStyles } from "@material-ui/core";
import {config} from "../../environment";

const Humidity = (props) => {

    // States for the graph
    const [humidityData, setHumidityData] = useState({
        data: { x: [], Temperature: [], Humidity: []},
    });
    const { mode } = useContext(ThemeContext);
    const styles = humidityStyles(mode);
    const test = { mode: mode,};
    const classes = useStyles(test);
    const [widthRef, setWidthRef] = useState();
    const ref = useRef(null);
    const [value, setValue] = React.useState([0, 6]);  // For Slider
    const valuetext = (value) => { return `${value} hr`; };
    const valueLabelFormat = (value) => { return value; };


   // Callback Handler for Region Clicking
    const regionClickHandler = (data) => {
    let region_id = data.region_id.slice(4);
    fetch(config.url.API_HOST + '/humidity/get-data?region_id='+region_id).then(res => res.json()).then(data => {setHumidityData(data)});
    }

    // Handler for the change in slider
    const handleSliderChange = (event, sliderValue) => {
        setValue(sliderValue);
    }

    // Initializing the plot data for the first time
    useEffect(() => {
        fetch(config.url.API_HOST + '/humidity/get-data')
            .then((res) => res.json())
            .then((data) => {
                setHumidityData(data);
            });
    }, []);


    useEffect(() => {
        const width = ref.current.offsetWidth;
        setWidthRef(width);
    }, [widthRef]);

   
    return (
        <div style={styles.humidity}>
            <Grid container>
                <Grid item xs={12} className="item-padding">
                    <Container>
                        <Paper
                            style={styles.itemContainer}
                            className="item-padding"
                        >
                            <Slider
                                getAriaLabel={() => "Hour range"}
                                value={value}
                                onChange={handleSliderChange}
                                valueLabelFormat={valueLabelFormat}
                                getAriaValueText={valuetext}
                                step={null}
                                valueLabelDisplay="auto"
                                marks={marks}
                                min={0}
                                max={24}
                                className={classes.sliderRoot}
                            />
                        </Paper>
                    </Container>
                </Grid>
                <Grid item xs={6} className="item-padding">
                    <Paper style={styles.itemContainer} ref={ref}>
                        {widthRef && (
                            <MicMap
                                width={widthRef}
                                height={560}
                                onclick={(e) => {
                                    regionClickHandler(e);
                                }}
                            />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6} className="item-padding">
                    <Paper style={styles.itemContainer}>
                        keep Heat Map here
                    </Paper>
                </Grid>
                <Grid item xs={12} className="item-padding">
                    <Paper style={styles.itemContainer}>
                        <HumidityPlot
                            height={350}
                            width={600}
                            data={humidityData.data}
                            style={styles.humidityPlot}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Humidity;

const humidityStyles = (mode) => ({
    markers: {
        color: theme[mode].color,
    },
    heatMapCard: {
        width: "100%",
        height: "100%",
    },
    humidity: {
        flexGrow: 1,
        backgroundColor: theme[mode].backgroundColor,
        color: theme[mode].color,
    },
    humidityPlot: {
        color: theme[mode].color,
        // flexGrow: 1,
        width: "100%",
    },
    itemContainer: {
        backgroundColor: theme[mode].opposite,
        height: "100%",
        color: theme[mode].backgroundColor,
    },
    slider: {
        color: theme[mode].opposite,
    },
});

const useStyles = makeStyles({
    sliderRoot: {
        // color: "black",
        color: (props) => props.mode === "light" && "white",
        "& .MuiSlider-markLabel": {
            color: (props) => props.mode === "light" && "white",
        },
        "& .PrivateValueLabel-label-8": {
            color: (props) => props.mode === "light" && "black",
        },
    },
});

const marks = [
    {
        value: 0,
        label: "0",
    },
    {
        value: 1,
        label: "1",
    },
    {
        value: 2,
        label: "2",
    },
    {
        value: 3,
        label: "3",
    },
    {
        value: 4,
        label: "4",
    },
    {
        value: 5,
        label: "5",
    },
    {
        value: 6,
        label: "6",
    },
    {
        value: 7,
        label: "7",
    },
    {
        value: 8,
        label: "8",
    },
    {
        value: 9,
        label: "9",
    },
    {
        value: 10,
        label: "10",
    },
    {
        value: 11,
        label: "11",
    },
    {
        value: 12,
        label: "12",
    },
    {
        value: 13,
        label: "13",
    },
    {
        value: 14,
        label: "14",
    },
    {
        value: 15,
        label: "15",
    },
    {
        value: 16,
        label: "16",
    },
    {
        value: 17,
        label: "17",
    },
    {
        value: 18,
        label: "18",
    },
    {
        value: 19,
        label: "19",
    },
    {
        value: 20,
        label: "20",
    },
    {
        value: 21,
        label: "21",
    },
    {
        value: 22,
        label: "22",
    },
    {
        value: 23,
        label: "23",
    },
    {
        value: 24,
        label: "24",
    },
];
