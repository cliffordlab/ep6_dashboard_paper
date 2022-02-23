import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";

import {
    GraphicEq,
    CameraAltOutlined,
    WbSunnyOutlined,
    RadioButtonCheckedOutlined,
    EqualizerOutlined,
    SettingsOutlined,
    PowerSettingsNewOutlined,
    AccountTreeOutlined,
    GraphicEqOutlined,
    PhotoCameraOutlined,
} from "@material-ui/icons";

import NetworkCheckOutlinedIcon from "@mui/icons-material/NetworkCheckOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

import { style, styled } from "@mui/system";
import { useSwitch } from "@mui/core/SwitchUnstyled";

import "./sidebar.css";

import { ThemeContext } from "../../theme/ThemeProvider";
import { theme } from "../../theme/Themes.js";
import {
    ConnectedTvOutlined,
    SettingsInputComponentOutlined,
    ThermostatAutoOutlined,
} from "@mui/icons-material";

export default function SideBar() {
    const [sideMenuShow, setSideMenuShow] = React.useState(false);
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
        <div
            style={styles.sidebar}
            onMouseEnter={() => setSideMenuShow(true)}
            onMouseLeave={() => setSideMenuShow(false)}
        >
            <div style={styles.sidebarWrapper}>
                <div style={styles.sidebarMenu}>
                    <div style={styles.sidebarTitleFirst}>
                        <ConnectedTvOutlined style={styles.sidebarIcon} />
                        {sideMenuShow && <h3 style={styles.heading}>Status</h3>}
                    </div>

                    <ul style={styles.sidebarList}>
                        <NavLink to="/status" className="link">
                            <li
                                className={
                                    splitLocation[1] === "status"
                                        ? "sidebarListItem active"
                                        : "sidebarListItem"
                                }
                            >
                                <AccountTreeOutlined
                                    style={styles.sidebarIcon}
                                />
                                {sideMenuShow && "RPI Network"}
                            </li>
                        </NavLink>
                    </ul>

                    <ul className="sidebarList">
                        <NavLink to="/audio" className="link">
                            <li
                                className={
                                    splitLocation[1] === "audio"
                                        ? "sidebarListItem active"
                                        : "sidebarListItem"
                                }
                            >
                                <GraphicEqOutlined style={styles.sidebarIcon} />
                                {sideMenuShow && "Audio"}
                            </li>
                        </NavLink>
                        <NavLink to="/illuminance" className="link">
                            <li
                                className={
                                    splitLocation[1] === "illuminance"
                                        ? "sidebarListItem active"
                                        : "sidebarListItem"
                                }
                            >
                                <LightbulbOutlinedIcon
                                    style={styles.sidebarIcon}
                                />
                                {sideMenuShow && "Illuminance"}
                            </li>
                        </NavLink>
                        <NavLink to="/humidity" className="link">
                            <li
                                className={
                                    splitLocation[1] === "humidity"
                                        ? "sidebarListItem active"
                                        : "sidebarListItem"
                                }
                            >
                                <ThermostatAutoOutlined
                                    style={styles.sidebarIcon}
                                />
                                {sideMenuShow && "Temperature"}
                            </li>
                        </NavLink>
                        <NavLink to="/visual" className="link">
                            <li
                                className={
                                    splitLocation[1] === "visual"
                                        ? "sidebarListItem active"
                                        : "sidebarListItem"
                                }
                            >
                                <PhotoCameraOutlined
                                    style={styles.sidebarIcon}
                                />
                                {sideMenuShow && "Visuals"}
                            </li>
                        </NavLink>
                    </ul>

                    <ul className="sidebarList">
                        <div style={styles.otherIconsContainer}>
                            <h3 style={styles.sidebarTitleOther}>
                                <MUISwitch
                                    color="primary"
                                    size="small"
                                    onChange={ToggleBtn}
                                    defaultChecked
                                    style={styles.sidebarIcon}
                                />
                                <span style={styles.others}>
                                    {sideMenuShow && "Theme"}
                                </span>
                            </h3>
                        </div>
                        <h3 style={styles.sidebarTitleOther}>
                            <PowerSettingsNewOutlined
                                style={styles.sidebarIcon}
                            />
                            <span style={styles.team}>
                                {sideMenuShow && "Gari Clifford"}
                            </span>
                        </h3>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const sideBarStyles = (mode) => ({
    sidebar: {
        backgroundColor: theme[mode].backgroundColor,
        position: "fixed",
        top: "50px",
        height: "100%",
        //width: "60px",
        zIndex: 3,
        borderColor: theme[mode].opposite,
        borderStyle: "solid",
        borderWidth: "1px 2px 0 0",
    },
    sidebarWrapper: {
        color: theme[mode].color,
    },
    sidebarMenu: {
        marginBottom: "10px",
    },
    sidebarTitle: {
        display: "flex",
        textTransform: "uppercase",
        alignItems: "center",
        color: theme[mode].text,
        fontSize: "13px",
        fontWeight: "bold",
        padding: "10px",
        // borderColor: theme[mode].opposite,
        // borderStyle: "solid",
        // borderWidth: "0 1px 0 0",
    },
    sidebarTitleFirst: {
        display: "flex",
        textTransform: "uppercase",
        alignItems: "center",
        color: theme[mode].text,
        fontSize: "13px",
        fontWeight: "bold",
        padding: "10px",
        borderColor: theme[mode].opposite,
        borderStyle: "solid",
        borderWidth: "1px 0 0 0",
    },
    heading: {
        width: "140px",
        fontSize: "13px",
        fontWeight: 500,
    },
    sidebarTitleOther: {
        display: "flex",
        textTransform: "uppercase",
        alignItems: "center",
        color: theme[mode].text,
        fontSize: "13px",
        fontWeight: "bold",
        padding: "10px",
        margin: 0,
    },
    sidebarList: {
        listStyle: "none",
        padding: "5px",
        transition: "width 3s ease",
    },
    sidebarIcon: {
        marginRight: "12px",
        marginLeft: "12px",
        fontSize: "20px !important",
        width: "4vh",
        height: "4vh",
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
    others: {
        fontSize: "13px",
        fontWeight: 500,
        marginLeft: "10px",
    },
    team: {
        fontSize: "13px",
        fontWeight: 500,
    },
    otherIconsContainer: {
        // marginBottom: "16px",
        paddingTop: "5px",
        paddingBottom: "5px",
    },
});

const SwitchRoot = styled("span")(`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  padding: 5px;
`);

const SwitchInput = styled("input")(`
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

const SwitchThumb = styled("span")(
    ({ theme }) => `
  position: absolute;
  display: block;
  background-color: ${theme.palette.mode === "dark" ? "#003892" : "#001e3c"};
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
        "#fff"
    )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>') center center no-repeat;
  }

  &.focusVisible {
    background-color: #79B;
  }

  &.checked {
    transform: translateX(16px);
    
    &:before {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>');
    }
  }
`
);

const SwitchTrack = styled("span")(
    ({ theme }) => `
  background-color: ${theme.palette.mode === "dark" ? "#8796A5" : "#aab4be"};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: block;
`
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
            <SwitchInput {...getInputProps()} aria-label="Switch" />
        </SwitchRoot>
    );
}
