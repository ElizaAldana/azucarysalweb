import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getFirestore, getDoc, doc, addDoc, collection, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const carSelection = document.getElementById("car");
const totalSection = document.getElementById("total");
const checkoutForm = document.getElementById("checkout");
const autocompleteFields = document.getElementById("autofill");

let total = 0;
let car = [];
let userLogged = {};

const getMyCar = () => {
    const car = localStorage.getItem("car");
    return car ? JSON.parse(car) : [];
};

const removeProduct = (productId) => {
    const car = getMyCar();
    const newCar = car.filter(product => product.id !== productId);

    localStorage.setItem("car", JSON.stringify(newCar));
    renderMyCar();
};

const getFirebaseCar = async (userId) => {
    const docRef = doc(db, "car", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : {
        product: []
    }
};

const getUserInfo = async (userId) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (e) {
        console.log(e);
    }
}

const renderProduct = (product => {

    const newProduct = document.createElement("li");
    newProduct.className = "product product--car";
    newProduct.innerHTML = `
    <img src="${product.image}" alt="" class="product__thumbnail">
    <div class="product__info">
        <h2 class="product__name">${product.name}</h2>
        <h3 class="product__price">${formatCurrency(product.price)}</h3>
    </div>
    <button class="product__car product__car--thumb">Remove</button>
    `;

    carSelection.appendChild(newProduct);

    newProduct.addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") {
            removeProduct(product.id);
        }
    });
});

const renderMyCar = (car) => {
    carSelection.innerHTML = "";
    let total = 0;

    car.forEach(product => {
        total += product.price;
        renderProduct(product);
    });

    totalSection.innerText = `Total: ${formatCurrency(total)}`;
};

const deleteCar = async () => {
    try {
        await deleteDoc(doc(db, "car", userLogged.uid));
        renderMyCar([]);
    } catch (e) {
        console.log(e);
    }
};


const createOrder = async (userFields) => {
    try {
        const order = await addDoc(collection(db, "orders"), {
            ...userFields,
            products: car,
            total,
            email: userLogged.email,
            status: "pending",
        });
        alert(`Muchas gracias, tu pedido con ID: ${order.id} ha quedado registrado :)`);
        deleteCar();
    } catch (e) {
        console.log(e);
    }
};

autocompleteFields.addEventListener("click", e => {
    checkoutForm.name.value = userLogged.name;
    checkoutForm.city.value = userLogged.city;
    checkoutForm.address.value = userLogged.address;
});

checkoutForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = checkoutForm.name.value;
    const city = checkoutForm.city.value;
    const address = checkoutForm.address.value;

    const userFields = {
        name,
        city,
        address
    };

    if (car.length) {
        if (name && city && address) {
            createOrder(userFields);
        } else {
            alert("Completa los campos D:");
        }
    } else {
        alert("Selecciona algún producto");
    }
});


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const result = await getFirebaseCar(user.uid);
        car = result.products;
        renderMyCar(car);

        const userInfo = await getUserInfo(user.uid);
        userLogged = {
            ...user,
            ...userInfo
        };
    } else {
        car = getMyCar();
        renderMyCar(car);
    }
});