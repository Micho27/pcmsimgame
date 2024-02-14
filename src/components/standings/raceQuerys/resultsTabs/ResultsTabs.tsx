import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { TabPanelProps } from '../../../../commonTypes';
import { getResultSheet, getTTTCells } from '../../../../services/dbActions';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import ResultsTable from './ResultsTable';

interface ResultsTabsProps {
    abbrv:string;
    stage:number;
}

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

const ResultsTabs = (props:ResultsTabsProps) => {
    const { abbrv, stage } = props;
    const [value, setValue] = useState(0);
    const [loading,setLoading] = useState(false);
    const [raceSheet,setRaceSheet] = useState<Array<GoogleSpreadsheetRow>>([]);
    const [TTTCells,setTTTCells] = useState<Array<string>>([]);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    
    const fetchRaceSheet = async () => {
        setLoading(true)

        const resRace: Array<GoogleSpreadsheetRow> = await getResultSheet(abbrv);
        const resCells: Array<any> = await getTTTCells(abbrv);

        setRaceSheet([...resRace])
        setTTTCells([...resCells]);
        setLoading(false)
    };

    useEffect(()=>{
        fetchRaceSheet();
    }, []);

    const getStageResult = () => {
        const start = (stage-1)*10 + stage;
        let tt;
        let results= raceSheet!.map((row) => {
            return row.get('Stages')
        }).slice(start,start+10);
        
        if(results[0] === '') {
           return TTTCells;
        }

        return results
    };
    const data=getStageResult();
    console.log(data);
    
    return (
        <Box sx={{ width: '100%' }} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example">
                    <Tab label="Stage Result" />
                    <Tab label="Provisional GC" disabled/>
                    <Tab label="Provisional Youth" disabled/>
                    <Tab label="Provisional Points" disabled/>
                    <Tab label="Provisional KOM" disabled/>
              </Tabs>
            </Box>
            <StandingsTabPanel value={value} index={0}>
                <ResultsTable data={data}/>
            </StandingsTabPanel>
        </Box>
    )
}

export default ResultsTabs;