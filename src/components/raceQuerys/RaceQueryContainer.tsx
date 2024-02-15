import { useEffect, useState } from "react";
import RaceSelect from "./RaceSelect";
import StageSelect from "./StageSelect";
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import ResultsTabs from "./resultsTabs/ResultsTabs";
import { lastRace } from "../../commonTypes";

const RaceQueryContainer = () => {
    const [raceRow,setRaceRow]=useState<GoogleSpreadsheetRow | undefined>(undefined);
    const [stage,setStage]=useState<number | undefined>(undefined);
    const [numStages,setNumStages]=useState<number>(1);

    useEffect(() => {
        raceRow ?  setNumStages(raceRow.get('Racedays')) : setNumStages(1);
        setStage(undefined);
    }, [raceRow])

    return (
        <div style={{color:"black"}}>
            <p> 
                A place to query any results that have been added to the standings database.
                Last Race Calculated: {lastRace}
            </p>
            <RaceSelect setRaceRow={setRaceRow}/>
            { raceRow ? <StageSelect numStages={numStages} setStage={setStage}/> : <></> }
            { stage ? <ResultsTabs oneDay={numStages<2} abbrv={raceRow!.get('Abb') } stage={stage} /> : <></> }
        </div>
    )
};

export default RaceQueryContainer;