import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDA1y8BrUIMqKFbp_ZDrSFuvEotbtd_5Ts",
  authDomain: "my-app-f4b18.firebaseapp.com",
  databaseURL: "https://my-app-f4b18-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-app-f4b18",
  storageBucket: "my-app-f4b18.firebasestorage.app",
  messagingSenderId: "443448293625",
  appId: "1:443448293625:web:233a6b93f6244887a50a28",
  databaseURL: "https://my-app-f4b18-default-rtdb.europe-west1.firebasedatabase.app"
};

export const app = initializeApp(firebaseConfig);