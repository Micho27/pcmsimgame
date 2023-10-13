import { getDocs, collection } from "firebase/firestore"; 
import { getDb } from "./db"

const collection_name = "sim-game"

export const getUCIStandings = async () => {
    const doc_refs = await getDocs(collection(getDb(), collection_name))
    
    const res:any = [];

    doc_refs.forEach(standing => {
        res.push({
            id: standing.id, 
            ... standing.data()
        })
    })

    return res;
}