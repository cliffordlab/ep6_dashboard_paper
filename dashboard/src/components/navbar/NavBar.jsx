import * as React from 'react'
import './navbar.css'
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import {Tooltip, IconButton }from '@mui/material';


export default function NavBar() {
    return (
        <div className="navbar">
            <div className="navbarWrapper">
                <span className="logo">EP6 Dashboard</span>
                <div>
                <Tooltip title="Export Data"><IconButton><SaveAltIcon style={{fill:"white",fontSize:25}}/></IconButton></Tooltip>
                <Tooltip title="Settings"><IconButton><SettingsIcon style={{fill:"white", fontSize:25}}/></IconButton></Tooltip>
                <Tooltip title="Profile"><IconButton><AccountCircleIcon style={{fill:"white", fontSize:25}}/></IconButton></Tooltip>
                </div>
            </div>
        </div>
    )
}
