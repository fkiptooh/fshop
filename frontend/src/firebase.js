import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_DEV_API_KEY,
    authDomain: import.meta.env.VITE_APP_DEV_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_DEV_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_DEV_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_DEV_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_DEV_APP_ID
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export {
    auth,
    googleAuthProvider,
}

