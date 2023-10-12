import React from "react"
import logo from './logo.svg';
import './App.css';
import StandingsTable from './components/standings/StandingsTable';
import Header from "./components/header/Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Welcome to the website for the PCM Sim game. Join our discord for more information.
      </p>
      <p>
        PCM Sim game UCI Standings
      </p>
      <StandingsTable />
    </div>
  );
}

export default App;
