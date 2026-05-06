import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFgmYgUnfUuVShr3XC4hRRs-FDOKvqTog",
  authDomain: "ai-study-planner-bfdeb.firebaseapp.com",
  projectId: "ai-study-planner-bfdeb",
  storageBucket: "ai-study-planner-bfdeb.firebasestorage.app",
  messagingSenderId: "414062476051",
  appId: "1:414062476051:web:7d31c7df624303458438e6",
  measurementId: "G-F4205JWT85"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);