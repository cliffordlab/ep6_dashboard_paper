import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import {Switch} from '@material-ui/core'

import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import SettingsInputAntennaOutlinedIcon from '@mui/icons-material/SettingsInputAntennaOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';


import './sidebar.css'

const ToggleBtn = (e, val) => {
    console.log(val)
}

export default function SideBar() {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">

                    <h3 className="sidebarTitle">Status and Control</h3>

                    <ul className="sidebarList">
                    <NavLink to="/status" className="link"><li className={splitLocation[1] === "status" ? "sidebarListItem active" : "sidebarListItem"}><SettingsInputAntennaOutlinedIcon className="sidebarIcon" /> RPI Network</li></NavLink>
                    </ul>

                    <h3 className="sidebarTitle">Dashboard</h3>

                    <ul className="sidebarList">
<<<<<<< HEAD
                    <NavLink to="/" className="link"><li className={splitLocation[1] === "home" ? "sidebarListItem active" : "sidebarListItem"}><HomeIcon className="sidebarIcon" />Home</li></NavLink>
                    <NavLink to="/visual" className="link"><li className={splitLocation[1] === "visual" ? "sidebarListItem active" : "sidebarListItem"}><CameraAltOutlined className="sidebarIcon" /> Visuals</li></NavLink>
                    <NavLink to="/audio" className="link"><li className={splitLocation[1] === "audio" ? "sidebarListItem active" : "sidebarListItem"}><GraphicEq className="sidebarIcon" /> Audio</li></NavLink>
                    <NavLink to="/humidity" className="link"><li className={splitLocation[1] === "humidity" ? "sidebarListItem active" : "sidebarListItem"}><WbSunnyOutlined className="sidebarIcon" /> Temperature</li></NavLink>
                    <NavLink to="/map" className="link"><li className={splitLocation[1] === "map" ? "sidebarListItem active" : "sidebarListItem"}><MapIcon className="sidebarIcon" />Map</li></NavLink>
                    
=======
                    <NavLink to="/visual" className="link"><li className={splitLocation[1] === "visual" ? "sidebarListItem active" : "sidebarListItem"}><CameraAltOutlinedIcon className="sidebarIcon" /> Visuals</li></NavLink>
                    <NavLink to="/audio" className="link"><li className={splitLocation[1] === "audio" ? "sidebarListItem active" : "sidebarListItem"}><KeyboardVoiceOutlinedIcon className="sidebarIcon" /> Audio</li></NavLink>
                    <NavLink to="/humidity" className="link"><li className={splitLocation[1] === "humidity" ? "sidebarListItem active" : "sidebarListItem"}><WbSunnyOutlinedIcon className="sidebarIcon" /> Temperature</li></NavLink>
>>>>>>> main
                    </ul>
                </div>
                <div className="toggleTheme">
                    <div className="darkMode">
                        <DarkModeIcon className="darkMode"/>
                        Dark Mode
                    </div>
                    <Switch color = "primary" size = "large" onChange={ToggleBtn} defaultChecked/>
                </div>

            </div>
        </div>
    )
}
