import React, {useContext} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx';

import {
  GraphicEq,
  CameraAltOutlined,
  WbSunnyOutlined,
} from "@material-ui/icons";

import NetworkCheckOutlinedIcon from '@mui/icons-material/NetworkCheckOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import { styled } from '@mui/system';
import { useSwitch } from '@mui/core/SwitchUnstyled';

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
                    <NavLink to="/status" className="link"><li className={splitLocation[1] === "status" ? "sidebarListItem active" : "sidebarListItem"}><NetworkCheckOutlinedIcon style={styles.sidebarIcon}/> RPI Network</li></NavLink>
                    </ul>

                    <h3 style={styles.sidebarTitle}>Select Component</h3>

                    <ul className="sidebarList">
                    <NavLink to="/audio" className="link"><li className={splitLocation[1] === "audio" ? "sidebarListItem active" : "sidebarListItem"}><GraphicEq style={styles.sidebarIcon} />Audio</li></NavLink>
                    <NavLink to="/humidity" className="link"><li className={splitLocation[1] === "humidity" ? "sidebarListItem active" : "sidebarListItem"}><WbSunnyOutlined style={styles.sidebarIcon} />Temperature</li></NavLink>
                    <NavLink to="/illuminance" className="link"><li className={splitLocation[1] === "illuminance" ? "sidebarListItem active" : "sidebarListItem"}><LightbulbOutlinedIcon style={styles.sidebarIcon} />Illuminance</li></NavLink>
                    <NavLink to="/visual" className="link"><li className={splitLocation[1] === "visual" ? "sidebarListItem active" : "sidebarListItem"}><CameraAltOutlined style={styles.sidebarIcon} />Visuals</li></NavLink>
                    </ul>

                    <h3 style={styles.sidebarTitle}>Summarized View</h3>

                    <ul style={styles.sidebarList}><NavLink to="/dashboard" className="link">
                    <li className={splitLocation[1] === "dashboard" ? "sidebarListItem active" : "sidebarListItem"}><DashboardOutlinedIcon style={styles.sidebarIcon}/>Dashboard </li> </NavLink>
                    </ul>

                </div>
                <div style={styles.toggleTheme}>
                    <div style={styles.darkMode}>
                        <MUISwitch color="primary" size="small" onChange={ToggleBtn} defaultChecked/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const sideBarStyles = (mode) => ({
    sidebar: {
        flex: 1,
        backgroundColor: theme[mode].backgroundColor,
        height: "100vh",
        position: "static",
        top: "50px",
    },
    sidebarWrapper: {
        padding: "20px",
        color: theme[mode].color,
    },
    sidebarMenu: {
        marginBottom: "10px",
    },
    sidebarTitle: {
        color: theme[mode].text,
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

const SwitchRoot = styled('span')(`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  padding: 5px;
`);

const SwitchInput = styled('input')(`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 0;
  margin: 0;
  cursor: pointer;
`);

const SwitchThumb = styled('span')(
  ({ theme }) => `
  position: absolute;
  display: block;
  background-color: ${theme.palette.mode === 'dark' ? '#003892' : '#001e3c'};
  width: 30px;
  height: 30px;
  border-radius: 15px;
  top: 0px;
  left: 2px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:before {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
      '#fff',
    )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>') center center no-repeat;
  }

  &.focusVisible {
    background-color: #79B;
  }

  &.checked {
    transform: translateX(16px);
    
    &:before {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>');
    }
  }
`,
);

const SwitchTrack = styled('span')(
  ({ theme }) => `
  background-color: ${theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: block;
`,
);

function MUISwitch(props) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };

  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)} />
      </SwitchTrack>
      <SwitchInput {...getInputProps()} aria-label="Demo switch" />
    </SwitchRoot>
  );
}