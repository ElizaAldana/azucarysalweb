import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

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
const auth = getAuth();



const registerForm = document.getElementById("register");
const loginForm = document.getElementById("ingresar");

const createUser = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
        if (e.code === "auth/email-already-in-use") {
            alert("Ups...el correo que ingresaste ya está en uso");
        }
        if (e.code === "auth/weak-password") {
            alert("Oh no, contraseña débil :(");
        }
    }
}

registerForm.addEventListener("submit", e => {
    e.preventDefault();
    e.preventDefault();
    const name = registerForm.name.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    if (email && password) {
        createUser(email, password);
    } else {
        alert();
    }
});

const login = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
    } catch (e) {
        console.log(e.code);
        if(e.code === "auth/user-not-found"){
            alert("Pon correo real");
        }
        if(e.code === "auth/wrong-password"){
            alert("Pon contraseña real");
        }
    }
}

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    if (email && password) {
        login(email, password);
    } else {
        console.log("Completa todos los datos");
    }
});

const logOut = async () => {
    try {
        await signOut(auth);
    } catch (e) {
        console.log(e);
    }
}


const logOutButton = document.getElementById("logOut");

logOutButton.addEventListener("click", () =>{
    logOut();
} )

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginForm.classList.add("hidden");
        logOutButton.classList.add("visible");
    } else {
        loginForm.classList.remove("hidden");
        logOutButton.classList.remove("visible");
    }
  });