import React from 'react'
import './stats.css'

export default function Stats() {
    return (
        <div className="stats">
            <div className="statsItem">
                <span className="statsTitle">Mean</span>
                <div className="statsContainer">
                    <span className="statsValues">2.4 mV</span>
                </div>
            </div>
            <div className="statsItem">
                <span className="statsTitle">Variance</span>
                <div className="statsContainer">
                    <span className="statsValues">2.4 mV</span>
                </div>
            </div>
            <div className="statsItem">
                <span className="statsTitle">Median</span>
                <div className="statsContainer">
                    <span className="statsValues">2.4 mV</span>
                </div>
            </div>
            <div className="statsItem">
                <span className="statsTitle">Last 10</span>
                <div className="statsContainer">
                    <span className="statsValues">2.4 mV</span>
                </div>
            </div>

        </div>
    )
}
