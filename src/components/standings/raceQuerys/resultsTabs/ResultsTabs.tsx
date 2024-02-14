import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { TabPanelProps } from '../../../../commonTypes';
import { getGcOneDay, getStageResultSheet, getTTTStage } from '../../../../services/dbActions';
import ResultsTable from './ResultsTable';

interface ResultsTabsProps {
    abbrv:string;
    stage:number;
    oneDay:boolean;
}

interface ResultsTableObject {
  rider:string;
  team:string;
  points:number;
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
    const [stageResults,setStageResults] = useState<Array<ResultsTableObject>>([]);
    const [tttResult,setTTTResult] = useState<Array<any>>([]);
    const [GcResult,setGcResult] = useState<Array<ResultsTableObject>>([]);
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    
    const fetchRaceSheet = async () => {
        setLoading(true)

        const resRace: Array<ResultsTableObject> = await getStageResultSheet(abbrv);
        const resCells: Array<ResultsTableObject> = await getTTTStage(abbrv);
        const resGc:Array<ResultsTableObject> = await getGcOneDay(abbrv);

        setStageResults([...resRace]);
        setTTTResult([...resCells]);
        setGcResult([...resGc]);
        setLoading(false);
    };

    const noProvisional = oneDay || stage === 69;
    useEffect(()=>{
        fetchRaceSheet();
    }, []);

    let tttStage:boolean=false;;
    const getStageResult = () => {
        tttStage=false;
        const start=(stage-1)*10+stage;
        const results = stageResults.slice(start,start+10);

        if(noProvisional) {
          return GcResult;
        }

        if(results[0] && results[0].rider === '') {
            tttStage=true;
            return tttResult.reduce((prev, {rider, team, points}) => 
              prev.some((x: { team: any; }) => x.team === team)? prev: [...prev, {rider, team, points} ], []).slice(1,6);
        }

        return results
    };

    const data=getStageResult();
    return (
        <Box sx={{ width: '100%' }} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example">
                    <Tab label={noProvisional ? "Final GC" : "Stage Result"} />
                    <Tab label={noProvisional ? "Final Youth" : "Provisional GC"} disabled/>
                    <Tab label={noProvisional ? "Final Points" : "Provisional Youth"} disabled/>
                    <Tab label={noProvisional ? "Final KOM" : "Provisional Points"} disabled/>
                    {noProvisional ? <></>: <Tab label="Provisional KOM" disabled/>}
              </Tabs>
            </Box>
            <StandingsTabPanel value={value} index={0}>
                <ResultsTable data={data} />
            </StandingsTabPanel>
        </Box>
    )
}

export default ResultsTabs;