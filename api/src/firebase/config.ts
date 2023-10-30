import { initializeApp, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// import  from "" assert { type: "json" };
const serviceAccountKey = require("./serviceAccountKey.json");

const app: App = initializeApp({
  credential: cert(serviceAccountKey),
});

const auth = getAuth(app);
export default auth;