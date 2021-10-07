import React, {useEffect, useState} from 'react'

import {Table, TableBody, TableCell, TableRow, TableHead, Tooltip, IconButton }from '@mui/material';

import SettingsInputAntennaOutlinedIcon from '@mui/icons-material/SettingsInputAntennaOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import AirplayIcon from '@mui/icons-material/Airplay';


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
        if(status === "connected"){
            return(<CheckCircleIcon style={{fill:"green", fontSize:20}}/>)
        }
        else if(status === "disconnected"){
            return(<CancelIcon style={{fill:"red", fontSize:20}}/>)
        }
        return(<WarningIcon style={{fill:"orange", fontSize:20}}/>)
    }

    console.log("Roger that")
    console.log(statusData)

    return (
        <div className="rpistatus">    

         <Breadcrumbs aria-label="breadcrumb" sx={{ml : 3, mt: 3, mb : 1}}>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="13" font="roboto" />Home</Link>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/getting-started/installation/"> <AirplayIcon sx={{ mr: 0.5 }} fontSize="inherit" />Status and Control</Link>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
            <SettingsInputAntennaOutlinedIcon sx={{ mr: 1 }} fontSize="inherit" />RPI Network </Typography>
         </Breadcrumbs>

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