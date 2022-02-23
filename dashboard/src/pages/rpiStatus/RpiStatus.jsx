import React, { useEffect, useRef, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    Tooltip,
    IconButton,
    Grid,
    Paper,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";
import RestartAltTwoToneIcon from "@mui/icons-material/RestartAltTwoTone";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// import "./rpiStatus.css";
import RpiMap from "../../components/rpiMap/RpiMap";

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";
import {config} from "../../environment";
import { TableContainer } from "@material-ui/core";

export default function RpiStatus(props) {
    const [statusData, setStatusData] = useState({ data: [] });
    console.log("Starman");
    console.log(process.env);
    console.log(config.url.API_HOST + "/visual/get-status");
    useEffect(() => {
        fetch(config.url.API_HOST + "/visual/get-status")
            .then((res) => res.json())
            .then((data) => {
                setStatusData(data);
                console.log("response");
                console.log(data);
                console.log("Lightyear");
                console.log(process.env);
            });
    }, []);

    // Reference
    const [widthRef, setWidthRef] = React.useState();
    const ref = useRef(null);

    useEffect(() => {
        const width = ref.current.offsetWidth;
        setWidthRef(width);
    }, [widthRef]);

    const [tab, setTab] = React.useState("table");

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const statusIcon = (status) => {
        if (status === "connected") {
            return <CheckCircleIcon style={{ fill: "green", fontSize: 20 }} />;
        } else if (status === "disconnected") {
            return <CancelIcon style={{ fill: "red", fontSize: 20 }} />;
        }
        return <WarningIcon style={{ fill: "orange", fontSize: 20 }} />;
    };

    const { mode } = React.useContext(ThemeContext);
    const styles = rpiStatusStyles(mode);

    return (
        <div style={styles.rpiStatus}>
            <Grid container justifyContent="center">
                <Grid item xs={6} className="item-padding">
                    <Paper style={styles.mapContainer} ref={ref} heigh>
                        {widthRef && (
                            <RpiMap
                                width={widthRef}
                                height={560}
                                onclick={(e) => {}}
                            />
                        )}
                    </Paper>
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
                                    IP Address
                                </TableCell>
                                <TableCell align="center" sx={{ color: theme[mode].backgroundColor, fontSize: 15, }} >
                                    Status
                                </TableCell>
                                <TableCell align="center" sx={{ color: theme[mode].backgroundColor, fontSize: 15, }} >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {statusData.data.map((row) => (
                                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0, color: theme[mode].backgroundColor, }, }} >
                                    <TableCell align="center" sx={{ color: theme[mode].backgroundColor }} >
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: theme[mode].backgroundColor }} >
                                        {row.ipAddress}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: theme[mode].backgroundColor }} >
                                        {statusIcon(row.status)}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: theme[mode].backgroundColor }} >
                                        {" "}
                                        <Tooltip title="Reboot">
                                            <IconButton>
                                                <RestartAltTwoToneIcon
                                                    style={{
                                                        fill: "blue",
                                                        fontSize: 25,
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        
                    </Table>
                    </TableContainer>
                </Paper>

                </Grid>
            </Grid>

            {/* <div style={styles.tableWrapper}></div> */}
        </div>
    );
}

const rpiStatusStyles = (mode) => ({
    rpiStatus: {
        flexGrow: 1,
        backgroundColor: theme[mode].backgroundColor,
    },
    mapContainer: {
        backgroundColor: theme[mode].opposite,
        color: theme[mode].backgroundColor,
        height : "90vh"
    },
    tableContainer: {
        backgroundColor: theme[mode].opposite,
        color: theme[mode].backgroundColor,
        overflowY : 'auto',
        height : "90vh"
    },

});
