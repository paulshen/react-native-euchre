import { decode, encode } from "base-64";
import * as firebase from "firebase";
import "firebase/firestore";
import React from "react";
import GameScreen from "./components/GameScreen";
import FirebaseConfig from "./firebaseConfig.json";

// @ts-ignore
if (!global.btoa) {
  // @ts-ignore
  global.btoa = encode;
}
// @ts-ignore
if (!global.atob) {
  // @ts-ignore
  global.atob = decode;
}

export default function App() {
  React.useEffect(() => {
    firebase.initializeApp(FirebaseConfig);
  }, []);

  return <GameScreen />;
}
