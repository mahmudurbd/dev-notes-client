import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyqwB1AlMXICancQFx6eZkIk3dGsBzW_Y",
  authDomain: "dev-notes-b9ccb.firebaseapp.com",
  projectId: "dev-notes-b9ccb",
  storageBucket: "dev-notes-b9ccb.appspot.com",
  messagingSenderId: "241328122671",
  appId: "1:241328122671:web:a53787afda44ff326dcfda",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });
  return user;
};
