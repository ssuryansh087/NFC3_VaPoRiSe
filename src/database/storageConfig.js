import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AI-------------------------------------qQ",
    authDomain: "humango-91767.firebaseapp.com",
    projectId: "humango-91767",
    storageBucket: "humango-91767.appspot.com",
    messagingSenderId: "117520612316",
    appId: "1:117520612316:web:a314632c80244e93282d19",
    measurementId: "G-4YYW8XMBJ7"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage };

export { db };
