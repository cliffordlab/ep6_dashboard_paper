import React, {useState} from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';

import Stats from '../../components/stats/Stats'
import './visual.css'

const Visual = (props) => {

   const [imageData, setImageData ] = useState({ stats :  { mean : 0, median : 0, variance : 0, correlation : 0 } 
   });

   return (
      <div className="visual">

         <Breadcrumbs aria-label="breadcrumb" sx={{ml : 3, mt: 3, mb : 1}}>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="13" font="roboto" />Home</Link>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/getting-started/installation/"> <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard</Link>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary"> <CameraAltIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Visuals </Typography>
         </Breadcrumbs>

         <Stats stats={imageData}/>
         <div className="visualplot-wrapper">
            <img src='/visual/get-data' alt="home-map" useMap="#image-map">
            </img>   
         </div>
      </div>
   )
}

export default Visual
