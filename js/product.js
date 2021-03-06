import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let userLogged = null;
let car = [];


//Firebase de cart
const getFirebaseCar = async (userId) => {
    const docRef = doc(db, "car", userId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
}

//Agregar producto al carro
const addProductsToCar = async (products) => {
    await setDoc(doc(db, "car", userLogged.uid), {
        products
    });
};

const getProduct = async () => {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get("id");

    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    productSection.classList.add("loaded");
    spinner.classList.add("loaded");

    loadProductInfo(data);

}


const url = window.location.search;
const searchParams = new URLSearchParams(url);

const productId = searchParams.get("id");

//const
const productSection = document.getElementById("product");
const spinner = document.getElementById("spinner");
const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productDesc = document.getElementById("productDesc");
const productGallery = document.getElementById("gallery");

const loadProductInfo = (product) => {
    productName.innerText = product.name;
    productDescription.innerText = product.description;
    productDesc.innerText = product.desc;
    productPrice.innerText = product.price;
    productImage.setAttribute("src", product.image);

    if (product.images) {
        createGallery(product.image, product.images);
    }
}



//Se crea la galer??a
const createGallery = (image, images) => {
    const gallery = document.createElement("div");
    gallery.innerHTML = `<img src="${image}">`;

    images.forEach(image => {
        gallery.innerHTML += `<img src="${image}">`;
    });

    productGallery.appendChild(gallery);

    const productGalleryImages = document.querySelector(".product__images > #gallery");
    productGalleryImages.addEventListener("click", e => {

        if (e.target.tagName === "IMG") {
            const imageSource = e.target.currentSrc;
            productImage.setAttribute("src", imageSource);
        }
    });

};

// Busco el bot??n del carrito en el producto (.product__cart)
const productCartButton = document.querySelector(".product__car");

// Cuando haga click en el bot??n del carrito:
productCartButton.addEventListener("click", async e => {

    // Evita un comportamiento por defecto
    // Dirigirme a otra p??gina (enlace - a) && Refrescar la p??gina (form)
    e.preventDefault();

    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get("id");

    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    const productAdded = {
        id: productId,
        name: data.name,
        image: data.image,
        price: data.price,
        desc: data.desc,
    };

    car.push(productAdded);
    if (userLogged) {
        addProductsToCar(car);
    }
    localStorage.setItem("car", JSON.stringify(car));

    // Deshabilito el bot??n
    productCartButton.setAttribute("disabled", true);
});


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const result = await getFirebaseCar(user.uid);
        car = result.products;
        userLogged = user;
    } else {
        car = getMyCar();
    }


});
getProduct();