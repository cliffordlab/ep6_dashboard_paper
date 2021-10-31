import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MicIcon from '@mui/icons-material/Mic';
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
         <Breadcrumbs aria-label="breadcrumb" sx={{ml : 3, mt: 3, mb : 1}}>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="13" font="roboto" />Home</Link>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/getting-started/installation/"> <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard</Link>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
            <MicIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Temperature </Typography>
         </Breadcrumbs>

         {showHumidityPlot && <Tooltip title="Close Graph"><IconButton aria-label="Close Graph" className="close-button" onClick={() => setShowHumidityPlot(false)}> <CancelIcon style={{fill: styles.humidity.color}} /> </IconButton></Tooltip> }  


         <div style={styles.humidityChartWrapper}>
            { !showHumidityPlot && <MicMap height={600} width={800} onclick={(e) => {regionClickHandler(e)}}/> }

            { showHumidityPlot && <HumidityPlot height={550} width={1200} data={humidityData.data} style={styles.HumidityPlot} /> }
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
       height: "60vh",
       width: "96%",
       marginRight: "15px",
   },

   HumidityPlot: {
      color: theme[mode].color
   }

});