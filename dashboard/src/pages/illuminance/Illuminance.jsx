import React, { useEffect, useRef, useState } from "react";

import MicMap from "../../components/micMap/MicMap";
import IlluminancePlot from "../../components/illuminancePlot/IlluminancePlot";

import "./illuminance.css";

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";
import { Container, Grid, Paper, makeStyles, Slider } from "@material-ui/core";
import {config} from "../../environment";


const Illuminance = (props) => {
    const [illuminanceData, setIlluminanceData] = useState({
        data: {
            x: [],
            Channel1: [],
            Channel2: [],
            Channel3: [],
            Channel4: [],
            Channel5: [],
        },
    });
    const [showIlluminanceGraph, setShowIlluminanceGraph] = useState(false);

    const regionClickHandler = (data) => {
        setShowIlluminanceGraph(data.showMap);
        let region_id = data.region_id.slice(4);
        fetch(config.url.API_HOST + '/illuminance/get-data?region_id='+region_id).then(res => res.json()).then(data => {setIlluminanceData(data)});
    };

    useEffect(() => {
        fetch(config.url.API_HOST +"/illuminance/get-data")
            .then((res) => res.json())
            .then((data) => {
                setIlluminanceData(data);
            });
    }, []);

    const { mode } = React.useContext(ThemeContext);
    const styles = illuminanceStyles(mode);

    // For slider Color
    const test = {
        mode: mode,
    };
    const classes = useStyles(test);

    // Reference
    const [widthRef, setWidthRef] = React.useState();
    const ref = useRef(null);

    useEffect(() => {
        const width = ref.current.offsetWidth;
        setWidthRef(width);
    }, [widthRef]);

    // For slider

    const [value, setValue] = React.useState([0, 6]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const valuetext = (value) => {
        return `${value}`;
    };

    const valueLabelFormat = (value) => {
        return value;
    };

    return (
        <div style={styles.illuminance}>
            <Grid container>
                <Grid item xs={12} className="item-padding">
                    <Container>
                        <Paper
                            style={styles.itemContainer}
                            className="item-padding"
                        >
                            <Slider
                                getAriaLabel={() => "Temperature range"}
                                value={value}
                                onChange={handleChange}
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
                    <Paper style={styles.itemContainer}>Heat Map Space</Paper>
                </Grid>
                <Grid item xs={12} className="item-padding">
                    <Paper style={styles.itemContainer}>
                        <IlluminancePlot
                            height={450}
                            width={600}
                            data={illuminanceData.data}
                            style={styles.illuminancePlot}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Illuminance;

const illuminanceStyles = (mode) => ({
    illuminance: {
        backgroundColor: theme[mode].backgroundColor,
        color: theme[mode].color,
    },
    illuminancePlot: {
        color: theme[mode].color,
    },
    heatMapCard: {
        width: "100%",
        height: "100%",
    },
    markers: {
        color: theme[mode].color,
    },
    itemContainer: {
        backgroundColor: theme[mode].opposite,
        height: "100%",
        color: theme[mode].backgroundColor,
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
