import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyDFTTsWomYfk-X5DciDbGxjYuGIb4x0T4w',
  authDomain: 'taskmgt-fd097.firebaseapp.com',
  databaseURL: 'https://taskmgt-fd097.firebaseio.com',
  projectId: 'taskmgt-fd097',
  storageBucket: 'taskmgt-fd097.appspot.com',
  messagingSenderId: '970777017612',
  appId: '1:970777017612:web:d9be75da11de96ace51d29',
  measurementId: 'G-WR4VX2SMJK'
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;