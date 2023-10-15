import { useState } from "react"
import logo from './logo.svg';
import './App.css';
import StandingsTable from './components/standings/StandingsTable';
import Header from "./components/header/Header";
import RaceResultsModal from './components/raceResultsHandler/RaceResultsModal';

const App = () => {
  const [token, setToken] = useState("");

  
  return (
    <div className="App">
      <Header token={token}/>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Welcome to the website for the PCM Sim game. Join our discord for more information.
      </p>
      <p>
        PCM Sim game UCI Standings
      </p>
      <RaceResultsModal />
      <StandingsTable />
    </div>
  );
}

export default App;
