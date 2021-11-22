import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";



//Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const registerForm = document.getElementById("register__form");
const loginForm = document.getElementById("ingresar__form");
const logOutButton = document.getElementById("logout");


const createUser = async (email, password, userFields) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", user.uid), userFields);

    } catch (e) {
        if (e.code === "auth/email-already-in-use") {
            alert("Ups...el correo que ingresaste ya está en uso");
        }
        if (e.code === "auth/weak-password") {
            alert("Oh no, contraseña débil :(");
        }
    }
}


const getUserInfo = async(userId) => {
    try{
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (e) {
        console.log(e);
    }
    
}

const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const userInfo = await getUserInfo(user.uid);
        alert(`Bienvenido ${userInfo.name}`);

        if (userInfo.isAdmin) {
            window.location = "./create.html";
        } else {
            window.location = "./products.html";
        }

    } catch (e) {
        if(e.code === "auth/user-not-found"){
            alert("Este usuario no está registrado");
        }
        if(e.code === "auth/wrong-password"){
            alert("La contraseña no es la correcta");
        }
    }
}


const logOut = async () => {
    try {
        await signOut(auth);
    } catch (e) {
        console.log(e);
    }
}

if (logOutButton) {
    logOutButton.addEventListener("click", () =>{
        logOut();
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        if (email && password) {
            login(email, password);
            //alert("Bienvenido c:")
        } else {
            alert("Completa todos los datos");
        }
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = registerForm.name.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const city = registerForm.city.value;
        const address = registerForm.address.value;

        if (email && password) {
            createUser(email, password, {
                name,
                email,
                city,
                address,
                isAdmin: false,
            });
            alert("Registrado con éxito :3")
        } else {
            alert();
        }
    });
}


onAuthStateChanged(auth, (user) => {});