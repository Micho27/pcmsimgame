import { getDb } from "./db"

export const getUCIStandings = async () => {
    const doc=await getDb();
    return doc.sheetsByIndex[0].getRows();
}

export const getTeamUciStanding = async (teamName: string) => {
    const doc=await getDb();
    return doc.sheetsByIndex[0];
};