import React, {useEffect, useState} from 'react';

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

            {showAudioGraph && <Tooltip title="Close Graph"><IconButton aria-label="Close Graph" className="close-button" onClick={() => setShowAudioGraph(false)}> <CancelIcon style={{fill: styles.audio.color}} /> </IconButton></Tooltip> }  
  


         <div className="audiochart-wrapper">
            { !showAudioGraph && <MicMap height={600} width={800} onclick={(e) => {regionClickHandler(e)}}/> }
            
            { showAudioGraph && <AudioPlot height={550} width={1200} data={audioData.data} /> }
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
       height: "50vh",
       width: "95%",
       marginRight: "15px",
   },

   audioPlot: {
      color: theme[mode].color
   }

});