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


import MicMap from '../../components/micMap/MicMap';
import AudioPlot from '../../components/audioPlot/AudioPlot';

import './audio.css'

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";

const Audio = (props) => {

   const [audioData, setAudioData] = useState({ data: { x: [], Channel1: [], Channel2: [], Channel3: [], Channel4: [] }});
   const [showAudioGraph, setShowAudioGraph] = useState(false);

   const regionClickHandler = (data) => {
      setShowAudioGraph(data.showMap);
   }

   useEffect(() => {
      fetch('/audio/get-data').then(res => res.json()).then(data => {
         setAudioData(data);
      }); }, []);

 
   const { mode } = React.useContext(ThemeContext);
   const styles = audioStyles(mode);
   

   return (
      <div style={styles.audio}>

            <Breadcrumbs aria-label="breadcrumb" sx={{ml : 3, mt: 3, mb : 1}}>
               <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color={styles.audio.color} href="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="13" font="roboto" />Home</Link>
               <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color={styles.audio.color} href="/getting-started/installation/"> <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard</Link>
               <Typography sx={{ display: 'flex', alignItems: 'center' }} color={styles.audio.color}> <MicIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Audio </Typography>
            </Breadcrumbs>

            {showAudioGraph && <Tooltip title="Close Graph"><IconButton aria-label="Close Graph" className="close-button" onClick={() => setShowAudioGraph(false)}> <CancelIcon style={{fill: styles.audio.color}} /> </IconButton></Tooltip> }  
  


         <div style={styles.audiochartWrapper}>
            { !showAudioGraph && <MicMap height={600} width={800} onclick={(e) => {regionClickHandler(e)}}/> }
            
            { showAudioGraph && <AudioPlot height={550} width={1200} data={audioData.data} style={styles.audioPlot}/> }
         </div>
      </div>
   )
}

export default Audio


const audioStyles = (mode) => ({
   audio: {
       flex: 4,
       backgroundColor: theme[mode].backgroundColor,
       color: theme[mode].color
   },

   audiochartWrapper: {
       height: "60vh",
       width: "96%",
       marginRight: "15px",
   },

   audioPlot: {
      color: theme[mode].color
   }

});
