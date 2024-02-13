import { useEffect, useMemo, useState } from "react";
import RaceSelect from "./RaceSelect";
import StageSelect from "./StageSelect";
import { GoogleSpreadsheetRow } from "google-spreadsheet";

const RaceQueryContainer = () => {
    const [raceRow,setRaceRow]=useState<GoogleSpreadsheetRow | undefined>(undefined);
    const [stage,setStage]=useState<number | undefined>(undefined);
    const [numStages,setNumStages]=useState<number>(1);

    useEffect(() => {
        raceRow ?  setNumStages(raceRow.get('Racedays')) : setNumStages(1);
    }, [raceRow])
    
    useEffect(() => {
    }, [stage])

    return (
        <div>
            <RaceSelect setRaceRow={setRaceRow}/>
            {raceRow ? <StageSelect numStages={numStages} setStage={setStage}/> : <></> }
            {raceRow && stage ? <>hi</>:<></>}
        </div>
    )
};

export default RaceQueryContainer;