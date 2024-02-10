import { getDb } from "./db"

const wtRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_WT_RACE_DAYS!;
const ptRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_PT_RACE_DAYS!;
const ctRaceDaysGid:number=+process.env.REACT_APP_SHEETS_GID_CT_RACE_DAYS!;
const uciStandingsGid:number=+process.env.REACT_APP_SHEETS_GID_STANDINGS!;

export const getUCIStandings = async () => {
    const doc=await getDb();
    return doc.sheetsById[uciStandingsGid].getRows();
}

// export const getTeamUciStanding = async (teamName: string) => {
//     const doc=await getDb();
//     return doc.sheetsByIndex[process.env.REACT];
// };

export const getRaceDays = async (level:string) => {
    const doc= await getDb();
    console.log(doc.sheetsById[wtRaceDaysGid]);
    let days=doc.sheetsById[wtRaceDaysGid];

    switch(level) {
        case 'wt': days=doc.sheetsById[wtRaceDaysGid]; break;

        case 'pt': days=doc.sheetsById[ptRaceDaysGid]; break;

        case 'ct': days=doc.sheetsById[ctRaceDaysGid]; break;

        default:
    }

    return days.getRows({ offset: 5 });
};