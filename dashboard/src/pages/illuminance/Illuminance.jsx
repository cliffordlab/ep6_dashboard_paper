import React, {useEffect, useState} from 'react';

import IconButton from '@mui/material/IconButton'; 
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';

import MicMap from '../../components/micMap/MicMap';
import IlluminancePlot from '../../components/illuminancePlot/IlluminancePlot'; 

import './illuminance.css'

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";

const Illuminance = (props) => {

   const [illuminanceData, setIlluminanceData] = useState({ data: { x: [], Channel1: [], Channel2: [], Channel3: [], Channel4: [], Channel5: [] }});
   const [showIlluminanceGraph, setShowIlluminanceGraph] = useState(false);

   const regionClickHandler = (data) => {
      setShowIlluminanceGraph(data.showMap);
   }

   useEffect(() => {
      fetch('/illuminance/get-data').then(res => res.json()).then(data => {
         setIlluminanceData(data);
      }); }, []);

 
   const { mode } = React.useContext(ThemeContext);
   const styles = illuminanceStyles(mode);
   

   return (
      <div style={styles.illuminance}>

            {showIlluminanceGraph && <Tooltip title="Close Graph"><IconButton aria-label="Close Graph" className="close-button" onClick={() => setShowIlluminanceGraph(false)}> <CancelIcon style={{fill: styles.illuminance.color}} /> </IconButton></Tooltip> }  
  
         <div style={styles.illuminancechartWrapper}>
            { !showIlluminanceGraph && <MicMap height={350} width={450} onclick={(e) => {regionClickHandler(e)}}/> }
            
            { showIlluminanceGraph && <IlluminancePlot height={350} width={600} data={illuminanceData.data} style={styles.illuminancePlot}/> }
         </div>
      </div>
   )
}

export default Illuminance


const illuminanceStyles = (mode) => ({
   illuminance: {
       flex: 4,
       backgroundColor: theme[mode].backgroundColor,
       color: theme[mode].color
   },

   illuminancechartWrapper: {
       height: "50vh",
       width: "95%",
       marginRight: "15px",
   },

   illuminancePlot: {
      color: theme[mode].color
   }

});