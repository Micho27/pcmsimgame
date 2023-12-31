import { getDocs, collection, setDoc, doc, query, where } from "firebase/firestore";
import { getDb } from "./db"

const simGameCollection = "sim-game"
const loginCollection = "login"

export const getUCIStandings = async () => {
    const doc_refs = await getDocs(collection(getDb(), simGameCollection))

    const res: any = [];

    doc_refs.forEach(standing => {
        res.push({
            id: standing.id,
            ...standing.data()
        })
    })

    return res;
}

export const getTeamUciStanding = async (teamName: string) => {
    const teamCollectionRef = collection(getDb(), simGameCollection)
    const teamStandingQuery = query(teamCollectionRef, where("team", "==", teamName))
    const doc_refs = await getDocs(teamStandingQuery);

    const res:any = [];

    doc_refs.forEach(country => {
        res.push({
            id: country.id,
            ...country.data()
        })
    })

    return res;
};

export const getLogin = async () => {
    const doc_refs = await getDocs(collection(getDb(), loginCollection))

    const res: any = [];

    doc_refs.forEach(loginDetails => {
        res.push({
            id: loginDetails.id,
            ...loginDetails.data()
        })
    })

    return res;
}

export const updateStandings = (args: any) => {
    const { id, ...params } = args
    return setDoc(doc(getDb(), simGameCollection, id), params)
}