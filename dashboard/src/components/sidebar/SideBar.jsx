import React, {useContext} from 'react'
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

import { ThemeContext } from "../../theme/ThemeProvider";
import { theme } from "../../theme/Themes.js";


export default function SideBar() {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const { setTheme, mode } = useContext(ThemeContext);
    console.log("mode", mode);

    const styles = sideBarStyles(mode);

    const ToggleBtn = (e) => {
        setTheme(e);
        console.log(mode);
    };

    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarWrapper}>
                <div style={styles.sidebarMenu}>

                    <h3 style={styles.sidebarTitle}>Status and Control</h3>

                    <ul style={styles.sidebarList}>
                    <NavLink to="/status" className="link"><li className={splitLocation[1] === "status" ? "sidebarListItem active" : "sidebarListItem"}><SettingsInputAntennaOutlinedIcon style={styles.sidebarIcon}/> RPI Network</li></NavLink>
                    </ul>

                    <h3 style={styles.sidebarTitle}>Dashboard</h3>

                    <ul className="sidebarList">
                    <NavLink to="/" className="link"><li className={splitLocation[1] === "home" ? "sidebarListItem active" : "sidebarListItem"}><HomeIcon style={styles.sidebarIcon} />Home</li></NavLink>
                    <NavLink to="/visual" className="link"><li className={splitLocation[1] === "visual" ? "sidebarListItem active" : "sidebarListItem"}><CameraAltOutlinedIcon style={styles.sidebarIcon} /> Visuals</li></NavLink>
                    <NavLink to="/audio" className="link"><li className={splitLocation[1] === "audio" ? "sidebarListItem active" : "sidebarListItem"}><KeyboardVoiceOutlinedIcon style={styles.sidebarIcon} /> Audio</li></NavLink>
                    <NavLink to="/humidity" className="link"><li className={splitLocation[1] === "humidity" ? "sidebarListItem active" : "sidebarListItem"}><WbSunnyOutlinedIcon style={styles.sidebarIcon} /> Temperature</li></NavLink>
                    <NavLink to="/map" className="link"><li className={splitLocation[1] === "map" ? "sidebarListItem active" : "sidebarListItem"}><MapIcon style={styles.sidebarIcon} />Map</li></NavLink>
                    </ul>
                </div>
                <div style={styles.toggleTheme}>
                    <div style={styles.darkMode}>
                        <DarkModeIcon {styles.darkMode} className="darkMode"/>
                        Dark Mode
                    </div>
                    <Switch color = "primary" size = "large" onChange={ToggleBtn} defaultChecked/>
                </div>

            </div>
        </div>
    )
}

const sideBarStyles = (mode) => ({
    sidebar: {
        flex: 1,
        backgroundColor: theme[mode].backgroundColor,
        height: "calc(100vh - 50px)",
        position: "sticky",
        top: "50px",
    },
    sidebarWrapper: {
        padding: "20px",
        color: theme[mode].color,
        // "rgb(255, 255, 255)"
    },
    sidebarMenu: {
        marginBottom: "10px",
    },
    sidebarTitle: {
        color: theme[mode].text,
        // "rgb(187, 186, 186)",
        fontSize: "13px",
    },
    sidebarList: {
        listStyle: "none",
        padding: "5px",
    },
    sidebarIcon: {
        marginRight: "5px",
        fontSize: "20px !important",
    },
    toggleTheme: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "70px",
        position: "fixed",
        bottom: "20px",
        alignItems: "center",
    },
    darkMode: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
});
