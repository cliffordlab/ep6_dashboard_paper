import React, {useEffect, useState} from 'react'

import {Table, TableBody, TableCell, TableRow, TableHead, Tooltip, IconButton }from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';


import './rpiStatus.css'

export default function RpiStatus(props) {

    const [statusData, setStatusData] = useState({data : []});
    useEffect(() => {
        fetch('/visual/get-status').then(res => res.json()).then(data => {
            setStatusData(data);
            console.log("response")
            console.log(data)
        });
    }, []);
                 

    const statusIcon = (status) => {
        if(status == "connected"){
            return(<CheckCircleIcon style={{fill:"green", fontSize:20}}/>)
        }
        else if(status == "disconnected"){
            return(<CancelIcon style={{fill:"red", fontSize:20}}/>)
        }
        return(<WarningIcon style={{fill:"orange", fontSize:20}}/>)
    }

    console.log("Roger that")
    console.log(statusData)

    return (
        <div className="rpistatus">    
            <div className="table-wrapper">
                <Table size="small">
                    <TableHead>
                        <TableRow> 
                            <TableCell align="center">Node Name</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">IP Address</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {statusData.data.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.location}</TableCell>
                            <TableCell align="center">{row.ipAddress}</TableCell>
                            <TableCell align="center">{statusIcon(row.status)}</TableCell>
                            <TableCell align="center"> <Tooltip title="Reboot"><IconButton><RestartAltTwoToneIcon style={{fill:"blue", fontSize:25}}/></IconButton></Tooltip></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}