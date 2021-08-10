import "./App.css";
import * as React from "react";
import firebase from "firebase/app";
import "firebase/auth";
// let token = "";
function App() {
    const [token, setToken] = React.useState("");
    const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: "",
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
    // firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const email = "tester_vkvkv@yopmail.com";

    React.useEffect(async () => {
        if (auth.isSignInWithEmailLink(window.location.href)) {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );
            const jwt = await result.user.getIdToken();
            console.log(String(jwt));
            setToken(jwt);
        }
    }, []);

    const login = async () => {
        auth.sendSignInLinkToEmail(email, {
            url: "http://localhost:3000",
            handleCodeInApp: true,
        }).catch((err) => {
            console.log(err);
        });
    };
    return (
        <div className="App">
            {token ? (
                <p>Your token {token} </p>
            ) : (
                <button onClick={login}>LOGIN</button>
            )}
        </div>
    );
}

export default App;
