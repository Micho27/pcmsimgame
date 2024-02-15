import { useState } from "react"
import logo from './PCM_SimGame_Picture.png';
import './App.css';
import UciStandingsTabs from './components/standings/UciStandingsTabs';
import RaceDaysLevelTabs from "./components/raceDays/RaceDaysLevelTabs";
import Header from "./components/header/Header";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import RaceQueryContainer from "./components/raceQuerys/RaceQueryContainer";
import { StandingsTabPanel } from "./components/StandingsTabPanel";

const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Header />
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Welcome to the website for the PCM Sim game. Join our discord for more information.
      </p>
      <Box sx={{ width: '100%' }} className="homeTabs">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} 
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example">
            <Tab label="UCI Standings" />
            <Tab label="Rider race Days used" />
            <Tab label="Race Results" />
          </Tabs>
        </Box>
        <StandingsTabPanel value={value} index={0}>
          <UciStandingsTabs />
        </StandingsTabPanel>
        <StandingsTabPanel value={value} index={1}>
          <RaceDaysLevelTabs />
        </StandingsTabPanel>
        <StandingsTabPanel value={value} index={2}>
            <RaceQueryContainer />
        </StandingsTabPanel>
      </Box>
    </div>
  );
}

export default App;
