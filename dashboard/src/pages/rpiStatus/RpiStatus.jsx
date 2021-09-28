import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';

import './rpiStatus.css'

export default function RpiStatus(props) {

    const rows = [  {'name' : "Kitchen PI - 04", 'location' : 'Kitchen', 'ipAddress' : '192.168.0.13', 'status' : 'connected'}, 
                    {"name" : "Kitchen PI - 01", 'location' : 'Kitchen', 'ipAddress' : '192.168.0.7', 'status' : 'disconnected'}, 
                    {"name" : "Kitchen PI - 02", 'location' : 'Kitchen', 'ipAddress' : '192.168.0.19', 'status' : 'disconnected'}, 
                    {"name" : "Kitchen PI - 03", 'location' : 'Kitchen', 'ipAddress' : '192.168.0.29', 'status' : 'booting'}]

    const statusIcon = (status) => {
        if(status == "connected"){
            return(<CheckCircleIcon style={{fill:"green"}}/>)
        }
        else if(status == "disconnected"){
            return(<CancelIcon style={{fill:"red"}}/>)
        }
        return(<WarningIcon style={{fill:"orange"}}/>)
    }

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
                        {rows.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.location}</TableCell>
                            <TableCell align="center">{row.ipAddress}</TableCell>
                            <TableCell align="center">{statusIcon(row.status)}</TableCell>
                            <TableCell align="center"><RestartAltTwoToneIcon style={{fill:"blue"}}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}
