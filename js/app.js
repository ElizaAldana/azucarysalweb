import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let products = [];
let userLogged = null;
let car = [];


const getAllProducts = async () => {
    const collectionRef = collection(db, "products");
    const { docs } = await getDocs(collectionRef);
    const firebaseProducts = docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        }
    });
    firebaseProducts.forEach(product => {
        productTemplate(product);
    });

    products = firebaseProducts;
};



// Elementos que añadí a mi carrito
const getMyCar = () => {
    const car = localStorage.getItem("car");
    return car ? JSON.parse(car) : [];
};

const getFirebaseCar = async (userId) => {
    const docRef = doc(db, "car", userId);
    const docSnap = await getDoc(docRef);
    //const data = docSnap.data();
    return docSnap.exists() ? docSnap.data() : {
        products: []
    };
}

const addProductsToCar = async (products) => {
    await setDoc(doc(db, "car", userLogged.uid), {
        products
    });
};

//const car = getMyCar();
//const firebaseCar = getFirebaseCar();

// Añadir cada producto a un elemento contenedor
const productsSection = document.getElementById("products");

// Se ejecuta para cada producto
// item = product
const productTemplate = (item) => {

    // Creamos un elemento a, le agregamos la clase "product"
    const product = document.createElement("a");
    product.className = "product";

    // Seteamos el atributo href con una url dinámica, donde le pasamos el id del producto
    product.setAttribute("href", `./product.html?id=${item.id}`);
    product.setAttribute("target", `_blank`);

    // Lógica de nuestro tag, botón de Recomendado o Más vendido
    let tagHtml;
    if (item.isRecommended) {
        tagHtml = `<span class="product__tag product__tag--recommended">Recomendado</span>`;

    } else {
        tagHtml = "";
    }

    // Lógica para saber si un producto ya fue añadido al carrito
    // para deshabilitar el botón.
    const isAdded = car.some(productCart => productCart.id === item.id);
    let buttonHtml;

    if (isAdded) {
        buttonHtml = `<button class="product__car" disabled>Producto añadido</button>`
    } else {
        buttonHtml = `<button class="product__car">Añadir al carrito</button>`;
    }

    // Añadir el HTML a nuestro elemento product.
    product.innerHTML = `
   
        <div class="product__description">
            ${tagHtml}
            <h3 class="product__price">$ ${item.price}</h3>
            <h2 class="product__name">${item.name}</h2>
            ${buttonHtml}
        </div>
        
        <img src="${item.image}" alt="${item.name}" class="product__image">
    
    `;

    // Agregar cada producto a nuestro contenedor
    productsSection.appendChild(product);


    // Busco el botón del carrito en el producto (.product__cart)
    const productCartButton = product.querySelector(".product__car");

    // Cuando haga click en el botón del carrito:
    productCartButton.addEventListener("click", e => {

        // Evita un comportamiento por defecto
        // Dirigirme a otra página (enlace - a) && Refrescar la página (form)
        e.preventDefault();

        const productAdded = {
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price
        };

        car.push(productAdded);
        if (userLogged) {
            addProductsToCar(car);
        }
        localStorage.setItem("car", JSON.stringify(car));

        // Deshabilito el botón
        productCartButton.setAttribute("disabled", true);
    });

};

const loadProducts = () => {
    const category = filterByCategory.value || "";
    const order = orderBySelect.value || "";

    //Borra los productos de antes
    productsSection.innerHTML = "";

    let filteredProductsByCategory;

    if (category !== "") {
        filteredProductsByCategory = products.filter((product) => product.type === category);
    } else {
        filteredProductsByCategory = products;
    }

    if (order === "asc") {
        filteredProductsByCategory = filteredProductsByCategory.sort((a, b) => a.price - b.price);
    }
    if (order === "desc") {
        filteredProductsByCategory = filteredProductsByCategory.sort((a, b) => b.price - a.price);
    }

    filteredProductsByCategory.forEach(product => {
        productTemplate(product);
    });
}

const filterByCategory = document.getElementById("categories");
const orderBySelect = document.getElementById("orderBy");

filterByCategory.addEventListener("change", e => {
    loadProducts();
});

orderBySelect.addEventListener("change", e => {
    loadProducts();
});


const getFilteredProduct = () => {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);

    return searchParams.get("type") || null;
}

// Recorro cada uno de los productos que tengo en mi arreglo
if (getFilteredProduct()) {
    const filteredProductsByCategory = products.filter((product) => product.type === getFilteredProduct());
    filteredProductsByCategory.forEach(product => {
        // Llamo la funcion productTemplate para cada product.
        productTemplate(product);
    });
}



onAuthStateChanged(auth, async (user) => {
    if (user) {

        const result = await getFirebaseCar(user.uid);
        car = result.products;
        userLogged = user;
    } else {
        car = getMyCar();
    }

    getAllProducts();

});