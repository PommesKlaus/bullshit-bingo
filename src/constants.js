import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBvnDvH6Jkd8I4Zju3OER2m8-U4ODEqUyo",
  authDomain: "bullshit-bingo-3b153.firebaseapp.com",
  databaseURL: "https://bullshit-bingo-3b153.firebaseio.com",
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const appTokenKey = 'bullshitBingoToken';
