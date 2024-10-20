import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, deleteDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration


initializeApp(firebaseConfig);

const firestore = getFirestore();

const ITEMS = 'items';



export {
    firestore,
    collection,
    addDoc,
    query,
    deleteDoc,
    doc,
    ITEMS,
};