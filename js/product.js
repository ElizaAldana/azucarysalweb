import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
//const product = products.find(product => product.id == productId);

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
    productPrice.innerText = product.pricetag;
    productImage.setAttribute("src", product.image);

    if (product.images) {
        createGallery(product.images);
    }
}



//Se crea la galería
const createGallery = (images) => {
    const gallery = document.createElement("div");
    gallery.innerHTML = `<img src="${product.image}">`;

    images.forEach(image => {
        gallery.innerHTML += `<img src="${image}">`;
    });

    productGallery.appendChild(gallery);

    const productGalleryImages = document.querySelector(".product__image > #gallery > div");
    productGalleryImages.addEventListener("click", e => {

        if (e.target.tagName === "IMG") {
            const imageSource = e.target.currentSrc;
            productImage.setAttribute("src", imageSource);
        }
    });
};

getProduct();