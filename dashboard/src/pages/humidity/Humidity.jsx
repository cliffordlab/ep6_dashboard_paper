import React, {useEffect, useState} from 'react'
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';


import HumidityPlot from '../../components/humidityPlot/HumidityPlot';
import MicMap from '../../components/micMap/MicMap';

import './humidity.css'

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";


const Humidity = (props) => {

   const [humidityData, setHumidityData ] = useState({   data : { x : [], humidity: [], temperature : [] } });
   const [showHumidityPlot, setShowHumidityPlot] = useState(false)

   useEffect(() => {
      fetch('/humidity/get-data').then(res => res.json()).then(data => {
         setHumidityData(data);
      });
   }, []);

   const regionClickHandler = (data) => {
      setShowHumidityPlot(data.showMap);
   }

   const { mode } = React.useContext(ThemeContext);
   const styles = humidityStyles(mode);


   console.log(humidityData)

   return (
      <div style={styles.humidity}>

         {showHumidityPlot && <Tooltip title="Close Graph"><IconButton aria-label="Close Graph" className="close-button" onClick={() => setShowHumidityPlot(false)}> <CancelIcon style={{fill: styles.humidity.color}} /> </IconButton></Tooltip> }  

         <div style={styles.humidityChartWrapper}>
            { !showHumidityPlot && <MicMap height={350} width={450} onclick={(e) => {regionClickHandler(e)}}/> }

            { showHumidityPlot && <HumidityPlot height={350} width={600} data={humidityData.data} style={styles.HumidityPlot} /> }
         </div>
      </div>
   )
}

export default Humidity

const humidityStyles = (mode) => ({
   humidity: {
       flex: 4, 
       backgroundColor: theme[mode].backgroundColor,
       color: theme[mode].color
   },
   
   humidityChartWrapper: {
       height: "50vh",
       width: "95%",
       marginRight: "15px",
   },

   HumidityPlot: {
      color: theme[mode].color
   }

});