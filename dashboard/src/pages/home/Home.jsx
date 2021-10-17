import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GrainIcon from '@mui/icons-material/Grain';

import Layout from '../../components/layout/Layout'

import './home.css'


export default function Home() {
    return (
        <div className="home">
            <Breadcrumbs aria-label="breadcrumb" sx={{ml : 3, mt: 3, mb : 1}}>
                <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="13" font="roboto" />Home</Link>
                <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/getting-started/installation/"> <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard</Link>
                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />Deck</Typography>
            </Breadcrumbs>

            <Layout/>

        </div>
    )
}
