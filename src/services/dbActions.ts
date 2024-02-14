import { getDbDays, getDbStandings } from "./db"

//gid to grab race days
const wtRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_WT_RACE_DAYS!;
const ptRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_PT_RACE_DAYS!;
const ctRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_CT_RACE_DAYS!;

//gid to grab points standings
const teamStandingsGid:number=+process.env.REACT_APP_SHEETS_GID_TEAM_STANDINGS!;
const riderStandingsGid:number=+process.env.REACT_APP_SHEETS_GID_RIDER_STANDINGS!;
const nationStandingsGid:number=+process.env.REACT_APP_SHEETS_GID_NATION_STANDINGS!;

//standings endpoints
export const getTeamStanding = async () => {
    const doc=await getDbStandings();
    return doc.sheetsById[teamStandingsGid].getRows({ offset: 2 });
}

export const getRiderStandings = async () => {
    const doc=await getDbStandings();
    return doc.sheetsById[riderStandingsGid].getRows({ offset: 2 });
};

export const getNationStandings = async () => {
    const doc=await getDbStandings();
    return doc.sheetsById[nationStandingsGid].getRows({ offset: 1 });
};

//race query endpoints
//grabs array of rows that have all race names/abbreviations/types/stages/level
export const getRaceMetaData = async () => {
    const doc=await getDbStandings();
    const calender=doc.sheetsByTitle['Calander'];
    
    return calender.getRows();
};

const getbaseResultSheet = async (abbrv:string) => {
    const doc=await getDbStandings();
    const raceSheet = doc.sheetsByTitle[abbrv];
    await raceSheet.loadHeaderRow(238);
    return await raceSheet.getRows({offset:-237});
};

export const getStageResultSheet = async (abbrv:string) => {
    const doc = await getbaseResultSheet(abbrv);
    
    return doc.map((row)=> {
        return {
            rider: row.get('stageRiderName'),
            team: row.get('stageTeam'),
            points: row.get('stagePoints')
        }
    })
};

export const getTTTStage = async (abbrv:string) => {
    const doc= await getbaseResultSheet(abbrv);
    return doc.map((row)=> {
        return {
            rider: row.get('tttRider'),
            team: row.get('tttTeam'),
            points: row.get('tttPoints')*5
        }
    });
}

export const getGcOneDay = async (abbrv:string) => {
    const doc= await getbaseResultSheet(abbrv);
    
    return doc.map((row)=> {
        return {
            rider: row.get('finalRider'),
            team: row.get('finalTeam'),
            points: row.get('finalPoints')
        }
    }).slice(1,51);
};

//race days endpoints
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