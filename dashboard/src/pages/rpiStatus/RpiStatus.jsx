import React, {useEffect, useState} from 'react'

import {Table, TableBody, TableCell, TableRow, TableHead, Tooltip, IconButton }from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import './rpiStatus.css'
import RpiMap from '../../components/rpiMap/RpiMap';

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";

export default function RpiStatus(props) {

    const [statusData, setStatusData] = useState({data : []});
    useEffect(() => {
        fetch('/visual/get-status').then(res => res.json()).then(data => {
            setStatusData(data);
            console.log("response")
            console.log(data)
        });
    }, []);

    const [tab, setTab] = React.useState('table');

    const handleTabChange = (event, newValue) => {
      setTab(newValue);
    };
  
    const statusIcon = (status) => {
        if(status === "connected"){
            return(<CheckCircleIcon style={{fill:"green", fontSize:20}}/>)
        }
        else if(status === "disconnected"){
            return(<CancelIcon style={{fill:"red", fontSize:20}}/>)
        }
        return(<WarningIcon style={{fill:"orange", fontSize:20}}/>)
    }

    const { mode } = React.useContext(ThemeContext);
    const styles = rpiStatusStyles(mode);

    return (
        <div style={styles.rpiStatus}>

        <Box sx={{ width: '100%', mt:'20px', ml: "60px"}}>
            <Tabs value={tab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" aria-label="Status Tabs">
                <Tab value="map" label="Map" sx = {{ color: theme[mode].color}}/>
                <Tab value="table" label="Table" sx = {{ color: theme[mode].color}}/>
            </Tabs>
        </Box>


            {tab === "map" ?  <RpiMap height={350} width={450} onclick={(e) => {}}/> : (<div style={styles.tableWrapper}>
                

                <Table size="small">
                    <TableHead>
                        <TableRow> 
                            <TableCell align="center" sx = {{ color: theme[mode].color, fontSize: 15 }}>Node Name</TableCell>
                            <TableCell align="center" sx = {{ color: theme[mode].color, fontSize: 15 }}>Location</TableCell>
                            <TableCell align="center" sx = {{ color: theme[mode].color, fontSize: 15 }}>IP Address</TableCell>
                            <TableCell align="center" sx = {{ color: theme[mode].color, fontSize: 15 }} >Status</TableCell>
                            <TableCell align="center" sx = {{ color: theme[mode].color, fontSize: 15 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {statusData.data.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0, color: theme[mode].color } }}>
                            <TableCell align="center" sx = {{ color: theme[mode].color }}>{row.name}</TableCell>
                            <TableCell align="center" sx = {{ color: theme[mode].color }}>{row.location}</TableCell>
                            <TableCell align="center" sx = {{ color: theme[mode].color }}>{row.ipAddress}</TableCell>
                            <TableCell align="center" sx = {{ color: theme[mode].color }}>{statusIcon(row.status)}</TableCell>
                            <TableCell align="center" sx = {{ color: theme[mode].color }}> <Tooltip title="Reboot"><IconButton><RestartAltTwoToneIcon style={{fill:"blue", fontSize:25}}/></IconButton></Tooltip></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>) }
        </div>
    )
}


const rpiStatusStyles = (mode) => ({
    rpiStatus: {
        flex: 4,
        backgroundColor: theme[mode].backgroundColor,
    },
    tableWrapper: {
        paddingLeft: "10px",
        paddingRight: "50px",
        paddingTop: "50px",
        textColor: theme[mode].color,
    },
});