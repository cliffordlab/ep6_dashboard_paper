import * as React from 'react';
import './toolbar.css'

export default function ToolBar(props) {
    return (
        <div className="toolbar">
            <div className="toolsItem">
                <span className="toolsTitle">Mean</span>
                <div className="toolsContainer">
                    <span className="toolsValues">{props.tools.mean}</span>
                </div>
            </div>
            <div className="toolsItem">
                <span className="toolsTitle">Variance</span>
                <div className="toolsContainer">
                    <span className="toolsValues">{props.tools.variance}</span>
                </div>
            </div>
            <div className="toolsItem">
                <span className="toolsTitle">Median</span>
                <div className="toolsContainer">
                    <span className="toolsValues">{props.tools.median}</span>
                </div>
            </div>
            <div className="toolsItem">
                <span className="toolsTitle">Last 10</span>
                <div className="toolsContainer">
                    <span className="toolsValues">{props.tools.last10}</span>
                </div>
            </div>

        </div>
    )
}
