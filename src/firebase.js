import firebase from "firebase/app"
import "firebase/auth"

export const auth = firebase.initializeApp(
    {
        apiKey: "AIzaSyAffqdLDBhesFfJhH-pnKRuQpKVB51FHcQ",
        authDomain: "unichat-12bc1.firebaseapp.com",
        projectId: "unichat-12bc1",
        storageBucket: "unichat-12bc1.appspot.com",
        messagingSenderId: "288249858151",
        appId: "1:288249858151:web:964e41b32740fb3734acc2"
    }
).auth();

console.log(firebase)

