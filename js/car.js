import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getFirestore, getDocs, doc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


const renderMyCar = (car) => {
    let total = 0;
    carSelection
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        car = await getFirebaseCar(user.uid);
    } else {
        car.getMyCar;
    }

    renderMyCar();
});