import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import RaceDaysTable from './RaceDaysTable';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { TabPanelProps } from '../../../commonTypes';

const  RaceDaysTabPanel = (props: TabPanelProps) => {
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

const RaceDaysLevelTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    
    return (
        <Box sx={{ width: '100%', color:'black' }} >
            <p>
                Last updated after Clasica de Almeria
            </p>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} 
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example">
                    <Tab label="World Tour" />
                    <Tab label="Pro Tour"/>
                    <Tab label="Continental Tour" />
              </Tabs>
            </Box>
            <RaceDaysTabPanel value={value} index={0}>
                <RaceDaysTable level='wt'/>
            </RaceDaysTabPanel>
            <RaceDaysTabPanel value={value} index={1}>
                <RaceDaysTable level='pt'/>
            </RaceDaysTabPanel>
            <RaceDaysTabPanel value={value} index={2}>
                <RaceDaysTable level='ct'/>
            </RaceDaysTabPanel>
        </Box>
    )
}

export default RaceDaysLevelTabs;