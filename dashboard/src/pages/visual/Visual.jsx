import React, {useState} from 'react'
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";
import CameraMap from '../../components/cameraMap/CameraMap';

import './visual.css'

const Visual = (props) => {

   const [imageData, setImageData ] = useState({ stats :  { mean : 0, median : 0, variance : 0, correlation : 0 }});
   const [showPosnet, setShowPosnet] = useState(false)
   
   const regionClickHandler = (data) => {
      setShowPosnet(data.showMap);
   }

   const { mode } = React.useContext(ThemeContext);
   const styles = visualStyles(mode);

   return (
      <div style={styles.visual}>

         {showPosnet && <Tooltip title="Close Graph"><IconButton aria-label="Close Image" className="close-button" onClick={() => setShowPosnet(false)}> <CancelIcon /> </IconButton></Tooltip> }  
         
         <div style={styles.visualchartWrapper}>
            { !showPosnet && <CameraMap height={350} width={450}  onclick={(e) => {regionClickHandler(e)}} /> }
            { showPosnet && <img src="/visual/get-data" style={{"margin-top":"30px"}} />}
            
         </div>
      </div>
   )
}

export default Visual

const visualStyles = (mode) => ({
   visual: {
       flex: 4,
       backgroundColor: theme[mode].backgroundColor,
       color: theme[mode].color
   },

   visualchartWrapper: {
       height: "50vh",
       width: "95%",
       marginRight: "15px",
   },

   visualPlot: {
      color: theme[mode].color
   }

});