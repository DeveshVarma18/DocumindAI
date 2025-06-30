// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Set up authentication providers
const emailAuthProvider = new EmailAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

// You can now use `auth` for authentication operations and `db` for Firestore operations.
// The "users" collection is implicitly created when you add the first document to it.
// For example, to add a new user document after successful authentication:
/*
import { doc, setDoc } from "firebase/firestore";

// Assuming you have a user object from authentication result
const user = auth.currentUser;

if (user) {
  setDoc(doc(db, "users", user.uid), {
    email: user.email,
    displayName: user.displayName,
    // add other user data you want to store
  })
  .then(() => {
    console.log("User document successfully written!");
  })
  .catch((error) => {
    console.error("Error writing user document: ", error);
  });
}
*/

export { auth, db, emailAuthProvider, googleAuthProvider };