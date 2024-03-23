import { initializeApp } from "firebase/app";
import  {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBbBcMIpnv--j9heyM5p0Vo8JiKAoONeIA",
    authDomain: "product-test-fdb43.firebaseapp.com",
    projectId: "product-test-fdb43",
    storageBucket: "product-test-fdb43.appspot.com",
    messagingSenderId: "485922522591",
    appId: "1:485922522591:web:abd485207ce16f0fd2306a"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const database = getFirestore(app)