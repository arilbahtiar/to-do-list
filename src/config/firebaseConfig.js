import {initializeApp} from '@react-native-firebase/app';
import {getFirestore} from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyByhfVhBD5lqYIruGtSyNaw3USKaH9mKXU",
  authDomain: "to-do-list-new-1efc0.firebaseapp.com",
  projectId: "to-do-list-new-1efc0",
  storageBucket: "to-do-list-new-1efc0.firebasestorage.app",
  messagingSenderId: "699140640058",
  appId: "1:699140640058:web:09dc285ea9374aaa681403",
  measurementId: "G-71ZW2L86XT"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);