import React, {useState, useEffect} from 'react'
import Stats from '../stats/Stats'
import Chart from '../charts/Chart'
import './home.css'

export default function Home() {

    const [audioData, setAudioData] = useState({ data : { x : [], y: [] } , stat: { mean : 0, median : 0, variance : 0, last10 : 0 } });
    useEffect(() => {
       fetch('/audio/get-data').then(res => res.json()).then(data => {
          setAudioData(data);
       });
    }, []);
 
    return (
        <div className="home">
            <Stats stats={audioData.stat}/>
            <Chart audioData={audioData.data}/>
        </div>
    )
}
