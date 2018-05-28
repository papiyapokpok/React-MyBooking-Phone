import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDx3NphbbNrXRDKd7tH3AnO4tK9sXEl_6w",
  authDomain: "my-oncall-69.firebaseapp.com",
  databaseURL: "https://my-oncall-69.firebaseio.com",
  projectId: "my-oncall-69",
  storageBucket: "my-oncall-69.appspot.com",
  messagingSenderId: "8354579435"
};
firebase.initializeApp(config);

export default firebase;
