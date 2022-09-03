import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";

import Humidity from "./pages/humidity/Humidity";
import Visual from "./pages/visual/Visual";
import Audio from "./pages/audio/Audio";
import RpiStatus from "./pages/rpiStatus/RpiStatus";
import Illuminance from "./pages/illuminance/Illuminance";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";

import "./App.css";

import { ThemeContext } from "./theme/ThemeProvider";
import { theme } from "./theme/Themes";
import { useState } from "react";
import { useEffect } from "react";
import { config } from "./environment";

function App() {
    const { mode } = React.useContext(ThemeContext);
    const styles = appStyles(mode);
    
    const [isLogin, setIsLogin] = useState(false);
    const [authToken, setAuthToken] = useState('');
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    useEffect(() => {
        let token = localStorage.getItem('token');
        fetch(config.url.API_HOST + '/validate-token',  
            {   method : "POST", 
                headers : { "Content-Type" : "application/json", },
                body : JSON.stringify({"token" : token})
            })
        .then(res => res.json())
        .then(data => {
            setIsLogin(data.success);
            if(data.success){
                setEmail(data.email);
                setUsername(data.username);
                setAuthToken(token);
            }
            else{
                setEmail("");
                setUsername("");
                setAuthToken("");
            }
        });

    })


    const loginCallback = (data) => {
        setIsLogin(data.success);
        setAuthToken(data.token);
        setEmail(data.email);
        setUsername(data.username);
        localStorage.setItem('token', data.token);
    }     

    return (
        <Router>
            <div className="App">
                { isLogin ? <NavBar user={username} /> : null}
                <div className="container">
                    { isLogin ? <SideBar user={username}/> : null }
                    <div style={styles.body}>
                        <Switch>
                            <Route path="/status">
                                {isLogin ? <RpiStatus /> : <Redirect to="/login" /> }
                            </Route>

                            <Route path="/audio">
                                {isLogin ? <Audio /> : <Redirect to="/login" /> }
                            </Route>

                            <Route path="/visual">
                                {isLogin ? <Visual /> : <Redirect to="/login" /> }
                            </Route>

                            <Route path="/humidity">
                                {isLogin ? <Humidity /> : <Redirect to="/login" /> }
                                <Humidity />
                            </Route>

                            <Route path="/illuminance">
                                {isLogin ? <Illuminance /> : <Redirect to="/login" /> }
                                <Illuminance />
                            </Route>

                            <Route path="/login">
                                {isLogin ? <Redirect to="/status"/> : <Login onchange={loginCallback}/> }
                            </Route>

                            <Route path="/register">
                                {isLogin ? <Redirect to="/status"/> : <Register/> }
                            </Route>

                            <Route path="/forget-password">
                                {isLogin ? <Redirect to="/status"/> : <ForgetPassword/> }
                            </Route>

                            <Route path="/">
                                {isLogin ? <Redirect to="/status"/> : <Redirect to="/login"/> }
                            </Route>

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
