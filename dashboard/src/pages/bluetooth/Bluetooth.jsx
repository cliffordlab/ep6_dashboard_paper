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

    // Initializing the plot data for the first time
    useEffect(() => {
        fetch(config.url.API_HOST + '/audio/get-data')
            .then((res) => res.json())
            .then((data) => {
                setCohortData(data);
            });
    }, []);


    // Handler for the change in dropdown
    const handleDropdownChange = (event) => {
        // Change the value in dropdown menu
        setDropdownValue(event.target.value);

        //Code to update the image goes here
    }
    
   
    return (
        // Style from the bottom of the style dictionary
        <div style={styles.bluetooth}>
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
                                <MenuItem value={10}>7</MenuItem>
                                <MenuItem value={21}>8</MenuItem>
                                <MenuItem value={22}>9</MenuItem>
                                </Select>
                            </FormControl>
                        </Paper>
                    </Container>
                </Grid>

                
                <Grid item xs={6}  className="item-padding">
                    <img src={config.url.API_HOST +"/bluetooth/get-data"} alt="img" />
                </Grid>

            </Grid>
        </div>
    );
};

export default Bluetooth;

const bluetoothStyles = (mode) => ({
    bluetooth: {
        flexGrow: 1,
        backgroundColor: theme[mode].backgroundColor,
        color: theme[mode].color,
    },
    itemContainer: {
        backgroundColor: theme[mode].opposite,
        height: "100%",
        color: theme[mode].backgroundColor,
    },
});
