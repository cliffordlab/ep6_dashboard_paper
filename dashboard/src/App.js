import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import NavBar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'

import Humidity from './pages/humidity/Humidity'
import Visual from './pages/visual/Visual'
import Audio from './pages/audio/Audio'
import RpiStatus from './pages/rpiStatus/RpiStatus'
import Dashboard from "./pages/dashboard/Dashboard";
import Illuminance from "./pages/illuminance/Illuminance";
 
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

                      <Route path="/illuminance">
                          <Illuminance />
                      </Route>

                      <Route path="/dashboard">
                          <Dashboard />
                      </Route>
                  </Switch>
              </div>
          </div>
      </Router>
  );
}

export default App;