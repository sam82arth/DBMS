import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyANn13X8nIhBsxdk6Y5y9e3aIzy4oEqTY8",
    authDomain: "school-management-system-95c3e.firebaseapp.com",
    projectId: "school-management-system-95c3e",
    storageBucket: "school-management-system-95c3e.appspot.com",
    messagingSenderId: "894665227431",
    appId: "1:894665227431:web:fe85a3beddb4928af3ef82",
    measurementId: "G-RB42Y2VX12"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage(); 

export {db,auth,storage};