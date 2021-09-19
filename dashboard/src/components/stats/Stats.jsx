import React from 'react'
import './stats.css'

export default function Stats(props) {
    return (
        <div className="stats">
            <div className="statsItem">
                <span className="statsTitle">Mean</span>
                <div className="statsContainer">
                    <span className="statsValues">{props.stats.mean}</span>
                </div>
            </div>
            <div className="statsItem">
                <span className="statsTitle">Variance</span>
                <div className="statsContainer">
                    <span className="statsValues">{props.stats.variance}</span>
                </div>
            </div>
            <div className="statsItem">
                <span className="statsTitle">Median</span>
                <div className="statsContainer">
                    <span className="statsValues">{props.stats.median}</span>
                </div>
            </div>
            <div className="statsItem">
                <span className="statsTitle">Last 10</span>
                <div className="statsContainer">
                    <span className="statsValues">{props.stats.last10}</span>
                </div>
            </div>

        </div>
    )
}
