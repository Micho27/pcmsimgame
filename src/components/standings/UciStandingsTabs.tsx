import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import TeamStandingsTable from './teamStandings/TeamStandingsTable';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { TabPanelProps } from '../../commonTypes';
import RiderStandingsTable from './riderStandings/RiderStandingsTable';
import NationStandingsTable from './nationsStandings/NationStandingsTable';

const  StandingsTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`race-days-tabpanel-${index}`}
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

const UciStandingsTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    
    return (
        <Box sx={{ width: '100%' }} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} 
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example">
                    <Tab label="Team Standings" />
                    <Tab label="Rider Standings"/>
                    <Tab label="Nation Standings"/>
              </Tabs>
            </Box>
            <StandingsTabPanel value={value} index={0}>
                <TeamStandingsTable />
            </StandingsTabPanel>
            <StandingsTabPanel value={value} index={1}>
                <RiderStandingsTable />
            </StandingsTabPanel>
            <StandingsTabPanel value={value} index={2}>
                <NationStandingsTable />
            </StandingsTabPanel>
        </Box>
    )
}

export default UciStandingsTabs;