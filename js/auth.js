  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCmZzvDPBNiYr_9V2lyzqFfzwPRzWeHERo",
    authDomain: "carrito-31765.firebaseapp.com",
    projectId: "carrito-31765",
    storageBucket: "carrito-31765.appspot.com",
    messagingSenderId: "740840766168",
    appId: "1:740840766168:web:826f902c85e2f3a444b5ad",
    measurementId: "G-SG7SYWCWW8"
  };

  //Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
