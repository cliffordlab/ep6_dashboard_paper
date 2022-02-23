import * as React from "react";
import "./navbar.css";

import { Tooltip, IconButton } from "@mui/material";
import { ThemeContext } from "../../theme/ThemeProvider";
import { theme } from "../../theme/Themes";
import { AccountCircleOutlined } from "@material-ui/icons";

export default function NavBar() {
    const { mode } = React.useContext(ThemeContext);
    const styles = navBarStyles(mode);
    return (
        <div style={styles.navbar}>
            <div style={styles.navbarWrapper}>
                <span style={styles.logo}>EP6 Dashboard</span>
                <img
                    src="http://gdclifford.info/assets/img/gari_square.jpg"
                    style={styles.icons}
                    alt="Person"
                />
            </div>
        </div>
    );
}

const navBarStyles = (mode) => ({
    navbar: {
        height: "50px",
        width: "100%",
        zIndex: 3,
        backgroundColor: theme[mode].backgroundColor,
        position: "fixed",
        top: 0,
        borderBottom: `2px solid ${theme[mode].color}`,
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
        width: "35px",
        height: "35px",
        borderRadius: "100%",
    },
});
