import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD6GqztE3QdAVUWOxGp3KNQRqU6XWmQxfI",
    authDomain: "kd-oncall.firebaseapp.com",
    databaseURL: "https://kd-oncall.firebaseio.com",
    projectId: "kd-oncall",
    storageBucket: "kd-oncall.appspot.com",
    messagingSenderId: "1086532128460"
  };
  firebase.initializeApp(config);
  export default firebase;
