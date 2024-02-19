import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import TeamStandingsTable from './teamStandings/TeamStandingsTable';
import { useState } from 'react';
import RiderStandingsTable from './riderStandings/RiderStandingsTable';
import NationStandingsTable from './nationsStandings/NationStandingsTable';
import { StandingsTabPanel } from '../StandingsTabPanel';
import { lastRaceStandings } from '../../commonTypes';

const UciStandingsTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    
    return (
        <Box sx={{ width: '100%', color: 'black' }} >
            <p>
                Last Race Calculated: {lastRaceStandings}
            </p>
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