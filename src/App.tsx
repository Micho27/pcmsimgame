import React from "react"
import logo from './logo.svg';
import './App.css';
import StandingsTable from './standings/StandingsTable';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the website for the PCM Sim game. Join our discord for more information. 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          PCM SIm game
        </a>
        <StandingsTable />
      </header>
    </div>
  );
}

export default App;
