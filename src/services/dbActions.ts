import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { getDbDays, getDbStandings } from "./db"
import { refType } from "@mui/utils";

//gid to grab race days
const wtRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_WT_RACE_DAYS!;
const ptRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_PT_RACE_DAYS!;
const ctRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_CT_RACE_DAYS!;

//gid to grab points standings
const teamStandingsGid:number=+process.env.REACT_APP_SHEETS_GID_TEAM_STANDINGS!;
const riderStandingsGid:number=+process.env.REACT_APP_SHEETS_GID_RIDER_STANDINGS!;
const nationStandingsGid:number=+process.env.REACT_APP_SHEETS_GID_NATION_STANDINGS!;

//useful list of non race sheets in the standings spreadsheet
const nonRaces=["Nations Standings","Info","Points","Team Standings","Template","Tutorial"];

export const getTeamStanding = async () => {
    const doc=await getDbStandings();
    return doc.sheetsById[teamStandingsGid].getRows({ offset: 2 });
}

export const getRiderStandings = async () => {
    const doc=await getDbStandings();
    return doc.sheetsById[riderStandingsGid].getRows({ offset: 2 });
};

const getRaceAbbrev = (sheets:any) => {
    const hi = sheets.map((sheet:GoogleSpreadsheetWorksheet) => {
         return sheet.title;
    });
    return hi;
}

//grabs array of rows that have all race names/abbreviations/types/stages/level
export const getRaceMetaData = async () => {
    const doc=await getDbStandings();
    const calender=doc.sheetsByTitle['Calander'];
    
    return calender.getRows();
};

export const getNationStandings = async () => {
    const doc=await getDbStandings();
    return doc.sheetsById[nationStandingsGid].getRows({ offset: 1 });
};

export const getResultSheet = async (abbrv:string) => {
    const doc=await getDbStandings();
    return doc.sheetsByTitle[abbrv].getRows();
};

export const getRaceDays = async (level:string) => {
    const doc= await getDbDays();
    
    let days=doc.sheetsById[wtRaceDaysGid];

    switch(level) {
        case 'wt': days=doc.sheetsById[wtRaceDaysGid]; break;

        case 'pt': days=doc.sheetsById[ptRaceDaysGid]; break;

        case 'ct': days=doc.sheetsById[ctRaceDaysGid]; break;

        default:
    }

    return days.getRows({ offset: 5 });
};