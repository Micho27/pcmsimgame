import { useState } from "react"
import logo from './PCM_SimGame_Picture.png';
import './App.css';
import UciStandingsTabs from './components/standings/UciStandingsTabs';
import RaceDaysLevelTabs from "./components/standings/raceDays/RaceDaysLevelTabs";
import Header from "./components/header/Header";
import { TabPanelProps } from "./commonTypes";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RaceQueryContainer from "./components/standings/raceQuerys/RaceQueryContainer";

const  CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`home-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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
        <CustomTabPanel value={value} index={0}>
          <UciStandingsTabs />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <RaceDaysLevelTabs />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            <RaceQueryContainer />
        </CustomTabPanel>
      </Box>
    </div>
  );
}

export default App;
