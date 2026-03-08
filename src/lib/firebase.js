import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These values should be provided by the USER in a .env file
const firebaseConfig = {
    apiKey: "AIzaSyAOHaoLEZjT8V5rkuDrOsdny1s09OKMelc",
    authDomain: "miscellaneous-adventure.firebaseapp.com",
    projectId: "miscellaneous-adventure",
    storageBucket: "miscellaneous-adventure.firebasestorage.app",
    messagingSenderId: "974562975403",
    appId: "1:974562975403:web:8dc24c1b865680cd4e61ee",
    measurementId: "G-08GC6BKWLJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
