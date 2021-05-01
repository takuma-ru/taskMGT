import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: secrets.VUE_APP_API_KEY,
  authDomain: secrets.VUE_APP_AUTH_DOMAIN,
  databaseURL: secrets.VUE_APP_DATABASE_URL,
  projectId: secrets.VUE_APP_PROJECT_ID,
  storageBucket: secrets.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: secrets.VUE_APP_MESSAGING_SENDERID,
  appId: secrets.VUE_APP_APP_ID,
  measurementId: secrets.VUE_APP_MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;