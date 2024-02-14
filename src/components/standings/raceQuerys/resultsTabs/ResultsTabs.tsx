import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { TabPanelProps } from '../../../../commonTypes';
import { getGcOneDay, getResultSheet, getTTTCells } from '../../../../services/dbActions';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import ResultsTable from './ResultsTable';

interface ResultsTabsProps {
    abbrv:string;
    stage:number;
    oneDay:boolean;
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
    const { oneDay, abbrv, stage } = props;
    const [value, setValue] = useState(0);
    const [loading,setLoading] = useState(false);
    const [raceSheet,setRaceSheet] = useState<Array<GoogleSpreadsheetRow>>([]);
    const [TTTCells,setTTTCells] = useState<Array<string>>([]);
    const [GcResult,setGcResult] = useState<Array<any>>([]);
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    
    const fetchRaceSheet = async () => {
        setLoading(true)

        const resRace: Array<GoogleSpreadsheetRow> = await getResultSheet(abbrv);
        const resCells: Array<any> = await getTTTCells(abbrv);
        const resGc:Array<any> = await getGcOneDay(abbrv);

        setRaceSheet([...resRace]);
        setTTTCells([...resCells]);
        setGcResult([...resGc]);
        setLoading(false);
    };

    const noProvisional = oneDay || stage === 69;
    useEffect(()=>{
        fetchRaceSheet();
    }, []);

    const getStageResult = () => {
        const start = (stage-1)*10 + stage;
        
        let results= raceSheet!.map((row) => {
            return row.get('Stages')
        }).slice(start,start+10);
      
        if(noProvisional) {
          return GcResult;
        }

        if(results[0] === '') {
           return TTTCells;
        }

        return results
    };

    return (
        <Box sx={{ width: '100%' }} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example">
                    <Tab label={noProvisional ? "Final GC" : "Stage Result"} />
                    <Tab label={noProvisional ? "Final Youth" : "Provisional GC"} />
                    <Tab label={noProvisional ? "Final Points" : "Provisional Youth"} />
                    <Tab label={noProvisional ? "Final KOM" : "Provisional Points"} />
                    {noProvisional ? <></>: <Tab label="Provisional KOM" />}
              </Tabs>
            </Box>
            <StandingsTabPanel value={value} index={0}>
                <ResultsTable data={getStageResult()}/>
            </StandingsTabPanel>
        </Box>
    )
}

export default ResultsTabs;