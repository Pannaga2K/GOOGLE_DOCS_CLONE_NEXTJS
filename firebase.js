import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD1IKu6mgzT5E1qEhsEYg2O79tQBMvnhYM",
    authDomain: "docs-clone-ad5cd.firebaseapp.com",
    projectId: "docs-clone-ad5cd",
    storageBucket: "docs-clone-ad5cd.appspot.com",
    messagingSenderId: "422020339526",
    appId: "1:422020339526:web:4e4b9cee3a870864c83747"
};

// INITIALIZE FIREBASE APP
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export {db};