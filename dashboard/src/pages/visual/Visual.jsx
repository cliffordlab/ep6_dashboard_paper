import React, { useEffect, useRef, useState } from "react";

import { Container,
         Slider, 
         makeStyles,
         TableContainer
} from "@material-ui/core";


import {    Table,
            TableBody,
            TableCell,
            TableRow,
            TableHead,
            Grid,
            Paper,
} from "@mui/material";


import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";


import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";
import CameraMap from "../../components/cameraMap/CameraMap";
import {config} from "../../environment";


const Visual = (props) => {
    const [showPosnet, setShowPosnet] = useState(false);
    const [piStatusData, setPiStatusData] = useState({"data" : [{"name" : "pi 101", "status" : "Working"}, {"name" : "pi 101", "status" : " No Image"}, {"name" : "pi 101", "status" : " No Image"}, {"name" : "pi 101", "status" : " No Image"}, {"name" : "pi 101", "status" : " No Image"}]})
    const { mode } = React.useContext(ThemeContext);
    const styles = visualStyles(mode);

    // For slider Color
    const test = { mode: mode,};
    const classes = useStyles(test);

    // Reference
    const [widthRef, setWidthRef] = React.useState();
    const ref = useRef(null);

    // For slider
    const [value, setValue] = React.useState([0, 6]);
    const handleChange = (event, newValue) => { setValue(newValue); };
    const valuetext = (value) => { return `${value}`; };
    const valueLabelFormat = (value) => { return value; };
    

    // Handler for map region click
    const regionClickHandler = (data) => {
        setShowPosnet(data.showMap);
    };

    // Setting current offset
    useEffect(() => {
        const width = ref.current.offsetWidth;
        setWidthRef(width);
    }, [widthRef]);


    // Getting the Rpi Status
    useEffect(() => {
        fetch(config.url.API_HOST + "/visual/get-pi-status")
            .then((res) => res.json())
            .then((data) => {
                setPiStatusData(data);
            });
    }, []);

    // Method to generate status icon
    const statusIcon = (status) => {
        if (status.toLowerCase() === "working") {
            return <CheckCircleIcon style={{ fill: "green", fontSize: 20 }} />;
        } else if (status.toLowerCase() === "no image") {
            return <CancelIcon style={{ fill: "red", fontSize: 20 }} />;
        }
        return <WarningIcon style={{ fill: "orange", fontSize: 20 }} />;
    };


    return (
        <div style={styles.visual}>
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
                            <CameraMap
                                width={widthRef}
                                height={560}
                                onclick={(e) => {
                                    regionClickHandler(e);
                                }}
                            />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6} className="item-padding"> Heatmap Space </Grid>
                <Grid item xs={6} className="item-padding">
                    <img src={config.url.API_HOST +"/visual/get-layout"} alt="img"/>
                </Grid>

                <Grid item xs={6} className="item-padding">
                    <Paper style={styles.tableContainer}>
                        <TableContainer>
                        <Table size="small" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ color: theme[mode].backgroundColor, fontSize: 15, }} >
                                        Node Name
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: theme[mode].backgroundColor, fontSize: 15, }} >
                                        Status
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {piStatusData.data.map((row) => (
                                    <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0, color: theme[mode].backgroundColor, }, }} >
                                        <TableCell align="center" sx={{ color: theme[mode].backgroundColor }} >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: theme[mode].backgroundColor }} >
                                            {statusIcon(row.status)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            
                        </Table>
                        </TableContainer>
                    </Paper>
                </Grid>         
            </Grid>
        </div>
    );
};

export default Visual;

const visualStyles = (mode) => ({
    visual: {
        flexGrow: 1,
        backgroundColor: theme[mode].backgroundColor,
        color: theme[mode].color,
    },
    visualPlot: {
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
    bigCard: {
        height: "768px",
        backgroundColor: theme[mode].opposite,
        color: theme[mode].backgroundColor,
    },
    tableContainer: {
        backgroundColor: theme[mode].opposite,
        color: theme[mode].backgroundColor,
        overflowY : 'auto',
        height : "65vh"
    }
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
