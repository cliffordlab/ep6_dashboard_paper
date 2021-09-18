import React from 'react'
import NavBar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'
import Home from './components/home/Home'
import './App.css'

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <SideBar />
        <Home />
      </div>
    </div>
  );
}

export default App;
