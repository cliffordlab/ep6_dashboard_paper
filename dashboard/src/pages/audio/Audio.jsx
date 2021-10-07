import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MicIcon from '@mui/icons-material/Mic';


import Stats from '../../components/stats/Stats';

import './audio.css'

const Audio = (props) => {

   const [audioData, setAudioData] = useState({ data : { x : [], y: [] } , stat: { mean : 0, median : 0, variance : 0, last10 : 0 } });
   useEffect(() => {
      fetch('/audio/get-data').then(res => res.json()).then(data => {
         setAudioData(data);
      });
   }, []);

   return (
      <div className="audio">

         <Breadcrumbs aria-label="breadcrumb" sx={{ml : 3, mt: 3, mb : 1}}>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="13" font="roboto" />Home</Link>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/getting-started/installation/"> <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard</Link>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
            <MicIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Audio </Typography>
         </Breadcrumbs>

         
         <Stats stats={audioData.stat}/>

         <div className="audiochart-wrapper">
            <Line
               data = {{
                  labels:  audioData.data.x,
                  datasets: [
                     {
                        label: 'Audio 1',
                        data :  audioData.data.y,
                        borderColor: 'brown',
                        borderWidth: 2,
                        fill: true,
                        lineTension: 0.5,
                        pointRadius : 2,
                        pointHoverRadius : 5,
                        pointHoverBackgroundColor : 'rgb(127,127,127)'
                     }
                  ]
               }}
               height = {400}
               width = {600}
               options = {{
                  responsive: true,
                  title: {text: "iron man", display: true},
                  maintainAspectRatio: false,
                  scales: {
                     yAxes: [
                        {
                           scaleLabel: {
                              display: true,
                              labelString: 'Y-Axis'
                           },
                           ticks: {
                              autoSkip: true,
                              maxTicksLimit: 10,
                              beginAtZero: true
                           }
                        }
                     ]
                  },
                  pan: {
                     enabled: true,
                     mode: "xy",
                     speed: 10,
                  },
                  zoom: {
                     wheel: {
                        enabled: true,
                     },
                     drag: false,
                     mode: "xy",
                     limits: {
                        x: {min: 0, max: 400, minRange: 10},
                        y: {min: -200, max: 400, minRange: 10}
                      },
                  }
               }}
            /> 
         </div>
      </div>
   )
}

export default Audio
