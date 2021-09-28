import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import NavBar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'

import Humidity from './pages/humidity/Humidity'
import Visual from './pages/visual/Visual'
import Audio from './pages/audio/Audio'
import RpiStatus from './pages/rpiStatus/RpiStatus'

import './App.css'

function App() {
  return (
    <Router>
        <div className="App">
          <NavBar />
            <div className="container">
              <SideBar />

              <Switch>

              <Route path="/status">
                <RpiStatus />
              </Route>


              <Route path="/audio">
                <Audio />
              </Route>

              <Route path="/visual">
                <Visual />
              </Route>

              <Route path="/humidity">
                <Humidity />
              </Route>
              </Switch>
            </div>
      </div>
    </Router>
    
  );
}

export default App;
