import React from 'react'

import { GraphicEq, CameraAltTwoTone, WbSunnyTwoTone} from "@material-ui/icons"
import Button from '@mui/material/Button';
import SettingsInputAntennaTwoToneIcon from '@material-ui/icons/SettingsInputAntennaTwoTone';
import { NavLink, useLocation } from 'react-router-dom'



import './sidebar.css'


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
                    <NavLink to="/status" className="link"><li className={splitLocation[1] === "status" ? "sidebarListItem active" : "sidebarListItem"}><SettingsInputAntennaTwoToneIcon className="sidebarIcon" /> RPI Network</li></NavLink>
                    </ul>

                    <h3 className="sidebarTitle">Dashboard</h3>

                    <ul className="sidebarList">
                    <NavLink to="/audio" className="link"><li className={splitLocation[1] === "audio" ? "sidebarListItem active" : "sidebarListItem"}><GraphicEq className="sidebarIcon" /> Audio</li></NavLink>
                    <NavLink to="/visual" className="link"><li className={splitLocation[1] === "visual" ? "sidebarListItem active" : "sidebarListItem"}><CameraAltTwoTone className="sidebarIcon" /> Visuals</li></NavLink>
                    <NavLink to="/humidity" className="link"><li className={splitLocation[1] === "humidity" ? "sidebarListItem active" : "sidebarListItem"}><WbSunnyTwoTone className="sidebarIcon" /> Temperature</li></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}
