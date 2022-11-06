import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";

import Humidity from "./pages/humidity/Humidity";
import Visual from "./pages/visual/Visual";
import Audio from "./pages/audio/Audio";
import RpiStatus from "./pages/rpiStatus/RpiStatus";
import Illuminance from "./pages/illuminance/Illuminance";
import Bluetooth from "./pages/bluetooth/Bluetooth";
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
        })
        .catch(function(error){
            console.log(error);
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
                        <Routes>
                            <Route path="/status"
                                element={isLogin ? <RpiStatus /> : <Navigate to="/login" /> }
                            />

                            <Route path="/audio"
                                element={isLogin ? <Audio /> : <Navigate to="/login" /> }
                            />

                            <Route path="/visual"
                                element={isLogin ? <Visual /> : <Navigate to="/login" /> }
                            />

                            <Route path="/humidity"
                                element={isLogin ? <Humidity /> : <Navigate to="/login" /> }
                            />

                            <Route path="/illuminance"
                                element={isLogin ? <Illuminance /> : <Navigate to="/login" /> }
                            />

                            <Route path="/bluetooth"
                                element={isLogin ? <Bluetooth /> : <Navigate to="/login" /> }
                            />

                            <Route path="/login"
                                element={isLogin ? <Navigate to="/status"/> : <Login onchange={loginCallback}/> }
                            />

                            <Route path="/register"
                                element={isLogin ? <Navigate to="/status"/> : <Register/> }
                            />

                            <Route path="/forget-password"
                                element={isLogin ? <Navigate to="/status"/> : <ForgetPassword/> }
                            />

                            <Route path="/"
                                element={isLogin ? <Navigate to="/status"/> : <Navigate to="/login"/> }
                            />

                        </Routes>
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
