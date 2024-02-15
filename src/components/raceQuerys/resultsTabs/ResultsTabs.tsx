import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import { useEffect, useState } from 'react';
import { getbaseResultSheet } from '../../../services/dbActions';
import ResultsTable from './ResultsTable';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { getFinalGc, getFinalYouth, getProvisionalGc, getStage, getTTTStageDetailed, getTttStage } from '../../standings/raceQuerys/resultsTabs/resultsUtils';
import LoadingScreen from '../../LoadingScreen';
import { TttToggle } from '../../standings/raceQuerys/resultsTabs/TttToggle';
import { StandingsTabPanel } from '../../StandingsTabPanel';

interface ResultsTabsProps {
    abbrv:string;
    stage:number;
    oneDay:boolean;
}

const ResultsTabs = (props:ResultsTabsProps) => {
    const { oneDay, abbrv, stage } = props;
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [raceSheet, setRaceSheet] = useState<Array<GoogleSpreadsheetRow>>([]);
    const [tttStage, setTttStage] = useState(false);
    const [detailedTTT, setDetailedTTT] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    const toggleDetailedTTT = () => setDetailedTTT(!detailedTTT);

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

    useEffect(()=>{
        const start=(stage-1)*10+stage;
        const results = [raceSheet[start]];
        
        if(results[0] && getStage(results)[0].rider === '') {
          setTttStage(true);
        } else {
          setTttStage(false);
        }
    }, [stage]);

    const getStageResult = () => {
      //formula to jump down the stage results and grab only those rows
        const start=(stage-1)*10+stage;
        const results = raceSheet.slice(start,start+10);

        if(noProvisional) {
          return getFinalGc(raceSheet);
        }

        if(results[0] && results[0].get('stageRiderName') === '') {
            if(detailedTTT) {
              return getTTTStageDetailed(raceSheet);
            }
            
            const res:Array<any> = getTttStage(raceSheet)
            return res.reduce((prev, {rider, team, points}) => 
              prev.some((x: { team: any; }) => x.team === team)? prev: [...prev, {rider, team, points} ], []);
            }
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
            {tttStage ? <TttToggle toggleDetailedTTT={toggleDetailedTTT} />:<></>}
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