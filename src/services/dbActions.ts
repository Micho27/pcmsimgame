import { getDbDays, getDbStandings } from "./db"

//gid to grab race days
const wtRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_WT_RACE_DAYS!;
const ptRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_PT_RACE_DAYS!;
const ctRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_CT_RACE_DAYS!;

//gid to grab points standings
const teamStandingsGid:number=+process.env.REACT_APP_SHEETS_GID_TEAM_STANDINGS!;
const riderStandingsGid:number=+process.env.REACT_APP_SHEETS_GID_RIDER_STANDINGS!;
const nationStandingsGid:number=+process.env.REACT_APP_SHEETS_GID_NATION_STANDINGS!;

export const getTeamStanding = async () => {
    const doc=await getDbStandings();
    return doc.sheetsById[teamStandingsGid].getRows({ offset: 2 });
}

export const getRiderStandings = async () => {
    const doc=await getDbStandings();
    return doc.sheetsById[riderStandingsGid].getRows({ offset: 2 });
};

export const getRaceMetaData = async (raceName:string) => {
    const doc=await getDbStandings()

    const race=doc.sheetsByTitle[raceName];
    await race.loadCells('A4:A11');

    const raceType=race.getCellByA1('A5').value;
    const raceLevel=race.getCellByA1('A8').value;
    const stages=race.getCellByA1('A11').value;

    return {
        raceType,
        raceLevel,
        stages,
    }
}

export const getNationStandings = async () => {
    const doc=await getDbStandings();
    return doc.sheetsById[nationStandingsGid].getRows({ offset: 1 });
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