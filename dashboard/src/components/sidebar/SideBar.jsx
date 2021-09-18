import React from 'react'
import { GraphicEq, CameraAltTwoTone, WbSunnyTwoTone } from "@material-ui/icons"

import './sidebar.css'



export default function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active"><GraphicEq className="sidebarIcon" /> Audio</li>
                        <li className="sidebarListItem"><CameraAltTwoTone className="sidebarIcon" /> Visuals</li>
                        <li className="sidebarListItem"><WbSunnyTwoTone className="sidebarIcon" /> Temperature</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
