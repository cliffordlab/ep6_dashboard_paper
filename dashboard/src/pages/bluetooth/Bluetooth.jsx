import React, { useEffect, useRef, useState , useContext} from "react";

import MicMap from "../../components/micMap/MicMap";
import AudioPlot from "../../components/audioPlot/AudioPlot";

import "./bluetooth.css";

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";
import { Container, Grid, Paper, Slider, makeStyles } from "@material-ui/core";
import {config} from "../../environment";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Bluetooth = (props) => {

    // States for the graph
    const [cohortData, setCohortData] = useState(['AS006', 'RS007', 'KM008']);
    const [dropdownValue, setDropdownValue] = useState('');
    const { mode } = useContext(ThemeContext);
    const styles = bluetoothStyles(mode);
    const [widthRef, setWidthRef] = useState();
    const ref = useRef(null);


   // Callback Handler for Region Clicking - To be removed later
    const regionClickHandler = (data) => {
    let region_id = data.region_id.slice(4);
    fetch(config.url.API_HOST + '/audio/get-data?region_id='+region_id).then(res => res.json()).then(data => {setCohortData(data)});
    }

    // Handler for the change in dropdown
    const handleDropdownChange = (event) => {
        // Change the value in dropdown menu
        setDropdownValue(event.target.value);

        //Code to update the image goes here
    }

    // Initializing the plot data for the first time
    useEffect(() => {
        fetch(config.url.API_HOST + '/audio/get-data')
            .then((res) => res.json())
            .then((data) => {
                setCohortData(data);
            });
    }, []);


    useEffect(() => {
        const width = ref.current.offsetWidth;
        setWidthRef(width);
    }, [widthRef]);

   
    return (
        // Style from the bottom of the style dictionary
        <div style={styles.audio}>
            <Grid container>
                <Grid item xs={12} className="item-padding">
                    <Container>
                        <Paper
                            style={styles.itemContainer}
                            className="item-padding"
                        >
                            <FormControl sx={{ m: 1, width: 300, backgroundColor: "white" }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Cohort ID</InputLabel>
                                <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={dropdownValue}
                                onChange={handleDropdownChange}
                                autoWidth
                                label="Cohort ID"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Twenty</MenuItem>
                                <MenuItem value={21}>Twenty one</MenuItem>
                                <MenuItem value={22}>Twenty one and a half</MenuItem>
                                </Select>
                            </FormControl>
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
            </Grid>
        </div>
    );
};

export default Bluetooth;

const bluetoothStyles = (mode) => ({
    markers: {
        color: theme[mode].color,
    },
    heatMapCard: {
        width: "100%",
        height: "100%",
    },
    audio: {
        flexGrow: 1,
        backgroundColor: theme[mode].backgroundColor,
        color: theme[mode].color,
    },
    audioPlot: {
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
