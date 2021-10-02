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
            <map name="image-map">
                  <area target="" alt="Exercise" title="Exercise" href="" coords="115,549,276,215" shape="rect"/>
                  <area target="" alt="Dining" title="Dining" href="" coords="115,79,412,216" shape="rect"/>
                  <area target="" alt="Coffee" title="Coffee" href="" coords="276,508,460,550" shape="rect"/>
                  <area target="" alt="Group Rooms" title="Group Rooms" href="" coords="704,424,963,550" shape="rect"/>
                  <area target="" alt="Kitchen" title="Kitchen" href="" coords="672,225,412,77" shape="rect"/>
                  <area target="" alt="Staff Area" title="Staff Area" href="" coords="819,189,922,422" shape="rect"/>
                  <area target="" alt="Lobby and Tech Aread" title="Lobby and Tech Aread" href="" coords="386,388,695,389,696,549,625,550,625,506,386,508" shape="poly"/>
            </map>

            </img>   
         </div>
      </div>
   )
}

export default Visual
