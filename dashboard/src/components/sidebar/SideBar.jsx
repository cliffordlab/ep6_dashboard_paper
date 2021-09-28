import React from 'react'
import { GraphicEq, CameraAltOutlined, WbSunnyOutlined} from "@material-ui/icons"
import {Switch} from '@material-ui/core'
import SettingsInputAntennaTwoToneIcon from '@material-ui/icons/SettingsInputAntennaTwoTone';
import { NavLink, useLocation } from 'react-router-dom'
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
                    <NavLink to="/audio" className="link"><li className={splitLocation[1] === "network" ? "sidebarListItem active" : "sidebarListItem"}><SettingsInputAntennaTwoToneIcon className="sidebarIcon" /> RPI Network</li></NavLink>
                    </ul>

                    <h3 className="sidebarTitle">Dashboard</h3>

                    <ul className="sidebarList">
                    <NavLink to="/audio" className="link"><li className={splitLocation[1] === "audio" ? "sidebarListItem active" : "sidebarListItem"}><GraphicEq className="sidebarIcon" /> Audio</li></NavLink>
                    <NavLink to="/visual" className="link"><li className={splitLocation[1] === "visual" ? "sidebarListItem active" : "sidebarListItem"}><CameraAltOutlined className="sidebarIcon" /> Visuals</li></NavLink>
                    <NavLink to="/humidity" className="link"><li className={splitLocation[1] === "humidity" ? "sidebarListItem active" : "sidebarListItem"}><WbSunnyOutlined className="sidebarIcon" /> Temperature</li></NavLink>
                    </ul>
                </div>
                <Switch
                color = "primary"
                size = "medium"
                onChange={ToggleBtn}
                />
            </div>
        </div>
    )
}
