import React from 'react'
import {Dialog, DialogTitle, DialogContentText, DialogContent} from '@mui/material'

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";


export default function StatusModal(props) {
  return (
    <div>
    <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle id="status-modal"> {"Sensor Status - Region " + props.region_id} </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <CheckCircleIcon style={{ fill: "green", fontSize: 20 }} /> <span>Camera</span> <br/>
            <CheckCircleIcon style={{ fill: "green", fontSize: 20 }} /> <span>TPU</span> <br/>
            <CheckCircleIcon style={{ fill: "green", fontSize: 20 }} /> <span>Microphone</span> <br/>
            <CheckCircleIcon style={{ fill: "green", fontSize: 20 }} /> <span>Temperature / Humidity</span> <br/>

            </DialogContentText>
        </DialogContent>
    </Dialog>
    </div>
  )
}
