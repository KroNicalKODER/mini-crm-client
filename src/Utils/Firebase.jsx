import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBXmIPif21qEc6m3L26rH44C95ohkO7a2Q",
    authDomain: "xeno-intern.firebaseapp.com",
    projectId: "xeno-intern",
    storageBucket: "xeno-intern.appspot.com",
    messagingSenderId: "675343830387",
    appId: "1:675343830387:web:61ed4ce59071316739c906",
    measurementId: "G-VMDBJV9J1G"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };
