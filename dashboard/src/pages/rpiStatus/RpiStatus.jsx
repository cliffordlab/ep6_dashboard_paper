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

export default function RpiStatus(props) {
    const [statusData, setStatusData] = useState({ data: [] });
    useEffect(() => {
        fetch("/visual/get-status")
            .then((res) => res.json())
            .then((data) => {
                setStatusData(data);
                console.log("response");
                console.log(data);
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
                <Grid item xs={5} className="item-padding">
                    <Paper style={styles.itemContainer} ref={ref}>
                        {widthRef && (
                            <RpiMap
                                width={widthRef}
                                height={560}
                                onclick={(e) => {}}
                            />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={7} className="item-padding">
                    <Paper style={styles.itemContainer}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            color: theme[mode].backgroundColor,
                                            fontSize: 15,
                                        }}
                                    >
                                        Node Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            color: theme[mode].backgroundColor,
                                            fontSize: 15,
                                        }}
                                    >
                                        Location
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            color: theme[mode].backgroundColor,
                                            fontSize: 15,
                                        }}
                                    >
                                        IP Address
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            color: theme[mode].backgroundColor,
                                            fontSize: 15,
                                        }}
                                    >
                                        Status
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            color: theme[mode].backgroundColor,
                                            fontSize: 15,
                                        }}
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {statusData.data.map((row) => (
                                    <TableRow
                                    key={row.name}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                    color: theme[mode].color,
                                                },
                                        }}
                                    >
                                        <TableCell
                                            align="center"
                                            sx={{ color: theme[mode].color }}
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ color: theme[mode].color }}
                                        >
                                            {row.location}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ color: theme[mode].color }}
                                        >
                                            {row.ipAddress}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ color: theme[mode].color }}
                                        >
                                            {statusIcon(row.status)}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ color: theme[mode].color }}
                                        >
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
        minHeight: "94.9vh",
    },
    itemContainer: {
        backgroundColor: theme[mode].opposite,
        height: "100%",
        color: theme[mode].backgroundColor,
    },
    // tableWrapper: {
    //     paddingLeft: "10px",
    //     paddingRight: "50px",
    //     paddingTop: "50px",
    //     textColor: theme[mode].color,
    // },
    // textCenter: {
    //     textAlign: "center",
    // },
});
