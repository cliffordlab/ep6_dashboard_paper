import * as React from "react";
import "./navbar.css";

import { Tooltip, IconButton } from "@mui/material";
import { ThemeContext } from "../../theme/ThemeProvider";
import { theme } from "../../theme/Themes";

export default function NavBar() {
    const { mode } = React.useContext(ThemeContext);
    const styles = navBarStyles(mode);
    return (
        <div style={styles.navbar}>
            <div style={styles.navbarWrapper}>
                <span style={styles.logo}>
                    EP6 Dashboard
                </span>
            </div>
        </div>
    );
}

const navBarStyles = (mode) => ({
    navbar: {
        height: "50px",
        width: "10",
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
        fontAlign: "center",
        fontFamily: "roboto",
        fontWeight: 700,
        color: theme[mode].color,
        cursor: "pointer",
    },
    icons: {
        fill: theme[mode].color,
        fontSize: 25,
    },
});
