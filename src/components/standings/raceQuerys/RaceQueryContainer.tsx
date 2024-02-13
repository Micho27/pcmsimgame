import { useEffect, useMemo, useState } from "react";
import RaceSelect from "./RaceSelect";
import StageSelect from "./StageSelect";
import { GoogleSpreadsheetRow } from "google-spreadsheet";

const RaceQueryContainer = () => {
    const [raceRow,setRaceRow]=useState<GoogleSpreadsheetRow | undefined>(undefined);
    const [numStages,setNumStages]=useState<number>(1);

    useEffect(() => {
        raceRow ?  setNumStages(raceRow.get('Racedays')) : setNumStages(1);
        
    }, [raceRow])
    
    return (
        <div>
            <RaceSelect setRaceRow={setRaceRow}/>
            {raceRow ? <StageSelect numStages={numStages} /> : <></> }
        </div>
    )
};

export default RaceQueryContainer;