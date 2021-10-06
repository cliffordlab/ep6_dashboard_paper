import * as React from "react";
import "./navbar.css";

import RestartAltTwoToneIcon from "@mui/icons-material/RestartAltTwoTone";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tooltip, IconButton } from "@mui/material";
import { ThemeContext } from "../../theme/ThemeProvider";
import { theme } from "../../theme/Themes";

export default function NavBar() {
    const { mode } = React.useContext(ThemeContext);
    const styles = navBarStyles(mode);
    return (
        <div style={styles.navbar}>
            <div style={styles.navbarWrapper}>
                <span style={styles.logo}>EP6 Dashboard</span>
                <div>
                    <Tooltip title="Export Data">
                        <IconButton>
                            <SaveAltIcon style={styles.icons} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings">
                        <IconButton>
                            <SettingsIcon style={styles.icons} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Profile">
                        <IconButton>
                            <AccountCircleIcon style={styles.icons} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

const navBarStyles = (mode) => ({
    navbar: {
        height: "50px",
        width: "100%",
        backgroundColor: theme[mode].backgroundColor,
        position: "sticky",
        top: 0,
    },
    navbarWrapper: {
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 20px 0px 20px",
        zIndex: 999,
    },
    logo: {
        fontSize: "30px",
        fontWeight: 700,
        color: theme[mode].color,
        cursor: "pointer",
    },
    icons: {
        fill: theme[mode].color,
        fontSize: 25,
    },
});
