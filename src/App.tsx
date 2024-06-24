import './App.css';
import logo from './PCM_SimGame_Picture.png';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Header from './header/Header';
import UciStandingsTabs from "./components/standings/UciStandingsTabs";
import RaceDaysLevelTabs from './raceDays/RaceDaysLevelTabs';

const App = () => {
  return (
    <div className="App">
      <Header />
      <img src={logo} className="App-logo" alt="logo" />
      <p>
         Welcome to the website for the PCM Sim game. Join our discord for more information.
      </p>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/standings" element={<UciStandingsTabs />} />
        <Route path="/raceDays" element={<RaceDaysLevelTabs />} />
      </Routes>
    </div>
    );
  };

export default App;