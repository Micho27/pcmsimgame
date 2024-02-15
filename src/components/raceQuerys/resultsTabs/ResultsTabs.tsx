import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import { useEffect, useMemo, useState } from 'react';
import { getbaseResultSheet } from '../../../services/dbActions';
import ResultsTable from './ResultsTable';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { getFinalGc, getFinalYouth, getProvisionalGc, getStage, getTTTStageDetailed, getTttStage } from './resultsUtils';
import LoadingScreen from '../../LoadingScreen';
import { TttToggle } from './TttToggle';
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
    let detailedTTT = false;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const toggleDetailedTTT = () => {
      detailedTTT = !detailedTTT;
      data = getStageResult();
    };

    useMemo(() => {
        setLoading(true)

        setLoading(false);
    },[detailedTTT]);

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

    let data = getStageResult();
    return (
        loading ? <LoadingScreen /> :
        <Box sx={{ width: '100%' }} >
            <TttToggle toggleDetailedTTT={toggleDetailedTTT} />
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
                <ResultsTable detailed={detailedTTT} data={ data } />
            </StandingsTabPanel>
            <StandingsTabPanel value={value} index={1}>
              <ResultsTable data={ getYouthProGc() } />
            </StandingsTabPanel>
        </Box>
    )
}

export default ResultsTabs;