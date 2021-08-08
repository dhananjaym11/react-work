import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBBwyUwYNR1stPIB2Zxe3bhI9nhs-Z4jtY",
    authDomain: "work-d2133.firebaseapp.com",
    projectId: "work-d2133",
    storageBucket: "work-d2133.appspot.com",
    messagingSenderId: "226183870632",
    appId: "1:226183870632:web:dcbf2d4f1e2241a32c2a9d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export  {
    storage, firebase as default
}