// firebase-config.js
// Firebase 8.x kullandığımız için uygun şekilde export etmiyoruz, global kullanılıyor.

const firebaseConfig = {
  apiKey: "AIzaSyCihxphcfNsfttojsRJ-OcYgGt9zamZZHM",
  authDomain: "lol-hesapsell.firebaseapp.com",
  projectId: "lol-hesapsell",
  storageBucket: "lol-hesapsell.appspot.com",
  messagingSenderId: "617230497720",
  appId: "1:617230497720:web:a0315ede821a6d8195814d",
  measurementId: "G-VLWC49S6V2"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
