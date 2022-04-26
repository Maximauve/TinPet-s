/* eslint-disable prettier/prettier */
import { getApp, getApps, initializeApp } from "firebase/app";
import {
collection,
doc,
getDocs,
setDoc, 
getFirestore,
query,
getDocFromCache,
initializeFirestore,
applicationDefault, 
cert 
} from "firebase/firestore";

const config = {
    apiKey: "AIzaSyDmu-sPDHCxF8QPqZEAWX7taeHFEujO64w",
    projectId: "tinpet-s-11ad7",
    appId: "1:560174211578:web:ef69b0ddaa1ac95ebd0443",
};

console.log("---> " + config.apiKey + " -- " + config.projectId + " -- " + config.appId + " <---- ");

export const app = getApps().length === 0 ? initializeApp(config) : getApp();

export const db = getFirestore(app);

function parseDocument(document) {
    return { id: document.id, ...document.data() };
};
export async function getAll(name) {
    const snapshot = await getDocs(query(collection(db, name)));
    console.log("Getting all ...");
    return snapshot.docs.map(parseDocument);
};
export async function getOne(name, id) {
    const snapshot = await getDocFromCache(doc(db, name, id));
    console.log("Getting one ...");
    return parseDocument(snapshot);
};

export async function register(userId, name, password, email, num) {
    const userRef = collection(db, "user");
    await setDoc(doc(userRef, "user" + userId), {
        id : userId,
        name : name,
        password : password,
        email : email,
        num : num,
    });
};

export async function modifyProfil(id, name, email, num) {
    const userRef = collection(db, "user");
    await setDoc(doc(userRef, "user" + id), {
        id : id,
        name : name,
        email : email,
        num : num,
    });
};