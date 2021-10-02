import React, {useState} from 'react'
import Stats from '../../components/stats/Stats'
import './visual.css'

const Visual = (props) => {

   const [imageData, setImageData ] = useState({ stats :  { mean : 0, median : 0, variance : 0, correlation : 0 } 
   });

   return (
      <div className="visual">
         <Stats stats={imageData}/>
         <div className="visualplot-wrapper">
            <img src='/visual/get-data' alt="home-map" useMap="#image-map">
            </img>   
         </div>
      </div>
   )
}

export default Visual
