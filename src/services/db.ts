import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

let db:Firestore;

export const getDb = () => {
    if (!db) {
        // Database config do not touch
        const firebaseConfig = {
            apiKey: "AIzaSyAXo6KLpGx9eGYJopZEK7C3JxZUPxFVLiI",
            authDomain: "pcm-sim-game.firebaseapp.com",
            projectId: "pcm-sim-game",
            storageBucket: "pcm-sim-game.appspot.com",
            messagingSenderId: "855900610098",
            appId: "1:855900610098:web:159dbc01f04e9a17a7662b"
        };

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}