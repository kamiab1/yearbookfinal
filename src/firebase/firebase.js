import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBMLFaaV_knapEVlTRV6fQRxpryv5sjhJ0",
  authDomain: "yearbook-eb32b.firebaseapp.com",
  databaseURL: "https://yearbook-eb32b.firebaseio.com",
  projectId: "yearbook-eb32b",
  storageBucket: "yearbook-eb32b.appspot.com",
  messagingSenderId: "991427987302",
  appId: "1:991427987302:web:4fc705c35c1e71af5f2aa7",
};

firebase.initializeApp(config);
export default firebase;
