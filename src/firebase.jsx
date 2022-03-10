//import firebase from 'firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAgfbCSFogD2DSx51mRvMi7Zj4BvA9j3U",
    authDomain: "e-comerce-data.firebaseapp.com",
    projectId: "e-comerce-data",
    storageBucket: "e-comerce-data.appspot.com",
    messagingSenderId: "10037847182",
    appId: "1:10037847182:web:d522d4163c8866556d95df"
  };

const firebasApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

export {auth}
