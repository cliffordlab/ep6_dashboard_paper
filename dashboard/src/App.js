import NavBar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar';
import './App.css'

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <SideBar />
        <div className="others"></div>
      </div>
    </div>
  );
}

export default App;
