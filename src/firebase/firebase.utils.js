import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCOUj3Zm7EAh4i9zpdL8JqMFbf0rfXNN7I",
  authDomain: "crwn-db-b6fe9.firebaseapp.com",
  databaseURL: "https://crwn-db-b6fe9.firebaseio.com",
  projectId: "crwn-db-b6fe9",
  storageBucket: "crwn-db-b6fe9.appspot.com",
  messagingSenderId: "738602885286",
  appId: "1:738602885286:web:724ca44a8887eebe7b9467",
  measurementId: "G-7871J8CTMX"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    }
    catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;