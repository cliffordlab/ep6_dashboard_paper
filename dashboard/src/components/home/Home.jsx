import React from 'react'
import Stats from '../stats/Stats'
import Chart from '../charts/Chart'
import './home.css'

export default function Home() {
    return (
        <div className="home">
            <Stats />
            <Chart />
        </div>
    )
}
