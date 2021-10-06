import React from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import { theme } from "../../theme/Themes";
import "./stats.css";

export default function Stats(props) {
    const { mode } = React.useContext(ThemeContext);
    const styles = statsStyles(mode);

    return (
        <div className="stats">
            <div style={styles.statsItem}>
                <span style={styles.statsTitle}>Mean</span>
                <div className="statsContainer">
                    <span className="statsValues">{props.stats.mean}</span>
                </div>
            </div>
            <div className="statsItem">
                <span style={styles.statsTitle}>Variance</span>
                <div className="statsContainer">
                    <span className="statsValues">{props.stats.variance}</span>
                </div>
            </div>
            <div className="statsItem">
                <span style={styles.statsTitle}>Median</span>
                <div className="statsContainer">
                    <span className="statsValues">{props.stats.median}</span>
                </div>
            </div>
            <div className="statsItem">
                <span style={styles.statsTitle}>Last 10</span>
                <div className="statsContainer">
                    <span className="statsValues">{props.stats.last10}</span>
                </div>
            </div>
        </div>
    );
}

const statsStyles = (mode) => ({
    statsTitle: {
        fontSize: "20px",
        color: theme[mode].oppositeColor,
    },
    statsItem: {
        flex: 1,
        margin: "20px",
        padding: "30px",
        borderRadius: "15px",
        cursor: "pointer",
        "-webkit-box-shadow": "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
        boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
    },
});
