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


import Stats from '../../components/stats/Stats';
import HumidityPlot from '../../components/humidityPlot/HumidityPlot';
import MicMap from '../../components/micMap/MicMap';

import './humidity.css'

const Humidity = (props) => {

   const [humidityData, setHumidityData ] = useState({   data : { x : [], humidity: [], temperature : [] },
                                                         stats :  { mean : 0, median : 0, variance : 0, correlation : 0 } 
                                                      });
   const [showHumidityPlot, setShowHumidityPlot] = useState(false)

   useEffect(() => {
      fetch('/humidity/get-data').then(res => res.json()).then(data => {
         setHumidityData(data);
      });
   }, []);

   const regionClickHandler = (data) => {
      setShowHumidityPlot(data.showMap);
   }

   console.log(humidityData)

   return (
      <div className="humidity">
         <Breadcrumbs aria-label="breadcrumb" sx={{ml : 3, mt: 3, mb : 1}}>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="13" font="roboto" />Home</Link>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/getting-started/installation/"> <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard</Link>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
            <MicIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Temperature </Typography>
         </Breadcrumbs>

         {showHumidityPlot && <Tooltip title="Close Graph"><IconButton aria-label="Close Graph" className="close-button" onClick={() => setShowHumidityPlot(false)}> <CancelIcon /> </IconButton></Tooltip> }  


         <div className="humiditychart-wrapper">
            { !showHumidityPlot && <MicMap height={600} width={800} onclick={(e) => {regionClickHandler(e)}}/> }
            { showHumidityPlot && <Stats stats={humidityData.stats}/> }

            { showHumidityPlot && <HumidityPlot height={400} width={600} data={humidityData.data} /> }
         </div>
      </div>
   )
}

export default Humidity
