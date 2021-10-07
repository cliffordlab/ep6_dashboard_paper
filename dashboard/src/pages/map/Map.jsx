import React from 'react'
import './map.css'
import {render} from 'react-dom'
import { ReactSVG } from 'react';
import * as d3 from "d3";

import logo from "../../svgs/index.jpg";
import img from "../../svgs/cam_regions_states.svg";


console.log(d3.scaleTime())

export default function Home() {
    
    return (
        <div className="map">
            <img src={img} />

            {/* render( <ReactSVG src="../../svgs/cam_regions_states.svg" />, document.getElementById('root') ) */}
            
            
        </div>
    )
}