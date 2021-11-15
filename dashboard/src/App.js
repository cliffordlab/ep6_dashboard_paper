import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";

import Humidity from './pages/humidity/Humidity'
import Illuminance from './pages/illuminance/Illuminance'
import Visual from './pages/visual/Visual'
import Audio from './pages/audio/Audio'
import RpiStatus from './pages/rpiStatus/RpiStatus'
import Home from './pages/home/Home'
import Map from './pages/map/Map'

import "./App.css";

import { ThemeContext } from "./theme/ThemeProvider";
import { theme } from "./theme/Themes";

function App() {
    const { mode } = React.useContext(ThemeContext);
    const styles = appStyles(mode);
    return (
        <Router>
            <div className="App">
                <NavBar />
                <div className="container">
                    <SideBar />
                    <div style={styles.body}>
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

                            <Route path="/">
                                <Redirect to="/status" />
                            </Route>

                            {/* <Route path="/dashboard">
                          <Dashboard />
                      </Route> */}
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;

const appStyles = (mode) => ({
    body: {
        backgroundColor: theme[mode].backgroundColor,
        paddingTop: "50px",
        paddingLeft: "85px",
        width: "100%",
    },
});
