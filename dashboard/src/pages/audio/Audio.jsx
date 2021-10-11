import React, {useEffect, useState} from 'react';

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
import MicMap from '../../components/micMap/MicMap';
import AudioPlot from '../../components/audioPlot/AudioPlot';

import './audio.css'

const Audio = (props) => {

   const [audioData, setAudioData] = useState({ data : { x : [], y: [] } , stat: { mean : 0, median : 0, variance : 0, last10 : 0 } });
   const [showAudioGraph, setShowAudioGraph] = useState(false);

   const regionClickHandler = (data) => {
      setShowAudioGraph(data.showMap);
   }

   useEffect(() => {
      fetch('/audio/get-data').then(res => res.json()).then(data => {
         setAudioData(data);
      }); }, []);
   

   return (
      <div className="audio">

            <Breadcrumbs aria-label="breadcrumb" sx={{ml : 3, mt: 3, mb : 1}}>
               <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="13" font="roboto" />Home</Link>
               <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/getting-started/installation/"> <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard</Link>
               <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary"> <MicIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Audio </Typography>
            </Breadcrumbs>

            {showAudioGraph && <Tooltip title="Close Graph"><IconButton aria-label="Close Graph" className="close-button" onClick={() => setShowAudioGraph(false)}> <CancelIcon /> </IconButton></Tooltip> }  
  


         <div className="audiochart-wrapper">
            { !showAudioGraph && <MicMap height={600} width={800} onclick={(e) => {regionClickHandler(e)}}/> }

            { showAudioGraph && <Stats stats={audioData.stat}/> }
            { showAudioGraph && <AudioPlot height={400} width={600} data={audioData.data} /> }
         </div>
      </div>
   )
}

export default Audio
