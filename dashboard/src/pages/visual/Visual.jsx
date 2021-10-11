import React, {useState} from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';


import Stats from '../../components/stats/Stats'
import CameraMap from '../../components/cameraMap/CameraMap';
import './visual.css'

const Visual = (props) => {

   const [imageData, setImageData ] = useState({ stats :  { mean : 0, median : 0, variance : 0, correlation : 0 }});
   const [showPosnet, setShowPosnet] = useState(false)
   
   const regionClickHandler = (data) => {
      setShowPosnet(data.showMap);
   }

   return (
      <div className="visual">

         <Breadcrumbs aria-label="breadcrumb" sx={{ml : 3, mt: 3, mb : 1}}>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="13" font="roboto" />Home</Link>
            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/getting-started/installation/"> <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard</Link>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary"> <CameraAltIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Visuals </Typography>
         </Breadcrumbs>

         {showPosnet && <Tooltip title="Close Graph"><IconButton aria-label="Close Image" className="close-button" onClick={() => setShowPosnet(false)}> <CancelIcon /> </IconButton></Tooltip> }  
         
         <div className="visualplot-wrapper">
            { !showPosnet && <CameraMap height={550} width={800}  onclick={(e) => {regionClickHandler(e)}} /> }
            { showPosnet && <img src="/visual/get-data" style={{"margin-top":"30px"}} />}
            
         </div>
      </div>
   )
}

export default Visual
