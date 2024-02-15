import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { TabPanelProps } from '../../../../commonTypes';
import { getbaseResultSheet } from '../../../../services/dbActions';
import ResultsTable from './ResultsTable';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { getFinalGc, getFinalYouth, getProvisionalGc, getStage, getTttStage } from './resultsUtils';
import LoadingScreen from '../../LoadingScreen';
import { TttToggle } from './TttToggle';

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
    const [tttStage,setTttStage] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    
    const fetchRaceSheet = async () => {
        setLoading(true)

        const res: Array<GoogleSpreadsheetRow> = await getbaseResultSheet(abbrv);

        setRaceSheet([...res]);
        setLoading(false);
    };

    const noProvisional = oneDay || stage === 69;
    useEffect(()=>{
        fetchRaceSheet();
    }, []);

    const getStageResult = () => {
      //formula to jump down the stage results and grab only those rows
        const start=(stage-1)*10+stage;
        const results = raceSheet.slice(start,start+10);

        if(noProvisional) {
          return getFinalGc(raceSheet);
        }

        if(results[0] && results[0].get('stageRiderName') === '') {
            //setTttStage(true);
            const res:Array<any> = getTttStage(raceSheet)
            return res.reduce((prev, {rider, team, points}) => 
              prev.some((x: { team: any; }) => x.team === team)? prev: [...prev, {rider, team, points} ], []).slice(1,6);
        }

        //setTttStage(false);
        return getStage(results);
    };

    const getYouthProGc = () => {
      if(stage === 69) {
        return getFinalYouth(raceSheet);
      }

      //formula to jump down the provisional gc results and grab only those rows
      const start=(stage-1)*5+stage;
      const results = raceSheet.slice(start,start+5);
      return getProvisionalGc(results);
    };

    return (
        loading ? <LoadingScreen /> :
        <Box sx={{ width: '100%' }} >
            {tttStage ? <TttToggle />:<></>}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example">
                    <Tab label={noProvisional ? oneDay ? "One Day Result" : "Final GC" : "Stage Result"} />
                    {oneDay ? <></> :<Tab label={noProvisional ? "Final Youth" : "Provisional GC"}/>}
                    {oneDay ? <></> :<Tab label={noProvisional ? "Final Points" : "Provisional Youth"} disabled/>}
                    {oneDay ? <></> :<Tab label={noProvisional ? "Final KOM" : "Provisional Points"} disabled/>}
                    {noProvisional ? <></> : <Tab label="Provisional KOM" disabled/>}
              </Tabs>
            </Box>
            <StandingsTabPanel value={value} index={0}>
                <ResultsTable data={ getStageResult() } />
            </StandingsTabPanel>
            <StandingsTabPanel value={value} index={1}>
              <ResultsTable data={ getYouthProGc() } />
            </StandingsTabPanel>
        </Box>
    )
}

export default ResultsTabs;