import React from 'react'
import CameraMap from '../../components/cameraMap/CameraMap';
import MicMap from '../../components/micMap/MicMap';

import './map.css'


export default function Map() {


    return (
        <div className="map">
            <CameraMap height={600} width={800}/>
        </div>
    )
}