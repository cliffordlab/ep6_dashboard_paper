import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MicIcon from '@mui/icons-material/Mic';

import Stats from '../../components/stats/Stats';

import './humidity.css'

const Humidity = (props) => {

   const [humidityData, setHumidityData ] = useState({   data : { x : [], humidity: [], temperature : [] },
                                                         stats :  { mean : 0, median : 0, variance : 0, correlation : 0 } 
                                                      });
   useEffect(() => {
      fetch('/humidity/get-data').then(res => res.json()).then(data => {
         setHumidityData(data);
      });
   }, []);


   return (
      <div className="humidity">
         <Breadcrumbs aria-label="breadcrumb" sx={{ml : 3, mt: 3, mb : 1}}>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="13" font="roboto" />Home</Link>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/getting-started/installation/"> <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard</Link>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
            <MicIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Temperature </Typography>
         </Breadcrumbs>

         <Stats stats={humidityData}/>
         <div className="humiditychart-wrapper">
            <Line
            data = {{
               labels:  humidityData.data.x,
               datasets: [
                  {
                     label: 'Humidity',
                     data :  humidityData.data.humidity,
                     borderColor: 'red',
                     borderWidth: 2,
                     fill: true,
                     lineTension: 0.5,
                     pointRadius : 1,
                     pointHoverRadius : 5,
                     pointHoverBackgroundColor : 'rgb(127,127,127)'
                  },
                  {
                     label: 'Temperature',
                     data :  humidityData.data.temperature,
                     borderColor: 'blue',
                     borderWidth: 2,
                     fill: true,
                     lineTension: 0.5,
                     pointRadius : 2,
                     pointHoverRadius : 5,
                     pointHoverBackgroundColor : 'rgb(127,127,5)'
                  }
               ]
            }}
               height = {400}
               weidth = {600}
               options = {{
                  maintainAspectRatio: false,
                  scales: {
                     yAxes: [
                        {
                           ticks: {
                              beginAtZero: true
                           }
                        }
                     ]
                  }
               }}
            />

         </div>
      </div>
   )
}

export default Humidity
