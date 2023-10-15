import { getDocs, collection } from "firebase/firestore"; 
import { getDb } from "./db"

const simGameCollection = "sim-game"
const loginCollection = "login"


export const getUCIStandings = async () => {
    const doc_refs = await getDocs(collection(getDb(), simGameCollection))
    
    const res:any = [];

    doc_refs.forEach(standing => {
        res.push({
            id: standing.id, 
            ... standing.data()
        })
    })

    return res;
}

export const getLogin = async () => {
    const doc_refs = await getDocs(collection(getDb(), loginCollection))
    
    const res:any = [];

    doc_refs.forEach(loginDetails => {
        res.push({
            id: loginDetails.id, 
            ... loginDetails.data()
        })
    })

    return res;
}