import { useEffect, useMemo, useState } from "react";
import RaceSelect from "./RaceSelect";
import StageSelect from "./StageSelect";
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import ResultsTabs from "./resultsTabs/ResultsTabs";

const RaceQueryContainer = () => {
    const [raceRow,setRaceRow]=useState<GoogleSpreadsheetRow | undefined>(undefined);
    const [stage,setStage]=useState<number | undefined>(undefined);
    const [numStages,setNumStages]=useState<number>(1);

    useEffect(() => {
        raceRow ?  setNumStages(raceRow.get('Racedays')) : setNumStages(1);
        setStage(undefined);
    }, [raceRow])

    return (
        <div>
            <p> 
                Be Gentle I haven't out crash protection in yet if you select a race that hasn't been updated in the standings 
                then the site will crash. Just refresh and try again.
                Last Race: Clasica de Almeria
            </p>
            <RaceSelect setRaceRow={setRaceRow}/>
            { raceRow ? <StageSelect numStages={numStages} setStage={setStage}/> : <></> }
            { stage ? <ResultsTabs abbrv={raceRow!.get('Abb') } stage={stage} /> : <></> }
        </div>
    )
};

export default RaceQueryContainer;