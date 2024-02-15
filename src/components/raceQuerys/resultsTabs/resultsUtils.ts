import { GoogleSpreadsheetRow } from "google-spreadsheet"

// utility functions to grab stage results
export const getStage = (results:Array<GoogleSpreadsheetRow>) => results.map((row) => {
    return {
        rider: row.get('stageRiderName'),
        team: row.get('stageTeam'),
        points: row.get('stagePoints')
    }
});

export const getTttStage = (results:Array<GoogleSpreadsheetRow>) => results.map((row)=> {
    return {
        rider: row.get('tttRider'),
        team: row.get('tttTeam'),
        points: row.get('tttPoints')*5
    }
}).slice(1,26);

export const getTTTStageDetailed = (results:Array<GoogleSpreadsheetRow>) => results.map((row)=> {
    return {
        rider: row.get('tttRider'),
        team: row.get('tttTeam'),
        points: row.get('tttPoints')
    }
}).slice(1,26);

//utility functions to grab the final standings for gc/youth/kom/points
//getFinalGc doubles as the one day classifications
const getFinal = (results:Array<GoogleSpreadsheetRow>) => results.map((row)=> {
    return {
        rider: row.get('finalRider'),
        team: row.get('finalTeam'),
        points: row.get('finalPoints')
    }
});

export const getFinalGc = (results:Array<GoogleSpreadsheetRow>) => getFinal(results).slice(1,51);
export const getFinalPoints = (results:Array<GoogleSpreadsheetRow>) => getFinal(results).slice(52,61);
export const getFinalKOM = (results:Array<GoogleSpreadsheetRow>) => getFinal(results).slice(62,73);
export const getFinalYouth = (results:Array<GoogleSpreadsheetRow>) => getFinal(results).slice(74,84);

//utility functions to grab provisional gc/youth/kom/points
export const getProvisionalGc = (results:Array<GoogleSpreadsheetRow>) => results.map((row)=> {
    return {
        rider: row.get('proGcRider'),
        team: row.get('proGcTeam'),
        points: row.get('proGcPoints')
    }
});

export const getProvisionalYouth = (results:Array<GoogleSpreadsheetRow>) => results.map((row)=> {
    return {
        rider: row.get('proYouthRider'),
        team: row.get('proYouthTeam'),
        points: row.get('proYouthPoints')
    }
});

export const getProvisionalPoints = (results:Array<GoogleSpreadsheetRow>) => results.map((row)=> {
    return {
        rider: row.get('proPointsRider'),
        team: row.get('proPointsTeam'),
        points: row.get('proPointsPoints')
    }
});

export const getProvisionalKom = (results:Array<GoogleSpreadsheetRow>) => results.map((row)=> {
    return {
        rider: row.get('proKomRider'),
        team: row.get('proKomTeam'),
        points: row.get('proKomPoints')
    }
});