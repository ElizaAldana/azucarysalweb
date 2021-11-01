const products = [
    {
        id: 1,
        name: "Salsa de Jalapeño",
        price: 12000,
        image: "../images/salsajal.jpg",
        isRecommended: true,
        type: "salsa",
    },
    {
        id: 2,
        name: "Cupcakes",
        price: 25000,
        image: "../images/c.jpg",
        isRecommended: false,
        type: "dulce",
    },
    {
        id: 3,
        name: "Salsa de Perejil",
        price: 12000,
        image: "../images/salsape.jpg",
        isRecommended: false,
        type: "salsa",
    },
    {
        id: 4,
        name: "Pasteles",
        price: 60000,
        image: "../images/tp.jpg",
        isRecommended: false,
        type: "dulce",
    },
    {
        id: 5,
        name: "Galletas",
        price: 15000,
        image: "../images/ga.jpg",
        isRecommended: true,
        type: "dulce",

    },
    {
        id: 6,
        name: "Bentos infantiles",
        price: 15000,
        image: "../images/b.jpg",
        isRecommended: false,
        type: "magokoro",

    },
    {
        id: 7,
        name: "Salsa de Ajonjolí",
        price: 12000,
        image: "../images/salsaaj.jpg",
        isRecommended: true,
        type: "salsa",

    },
    {
        id: 8,
        name: "Ramen",
        price: 20000,
        image: "../images/ra.jpg",
        isRecommended: false,
        type: "magokoro",

    },
    {
        id: 9,
        name: "Salsa de Albahaca",
        price: 12000,
        image: "../images/salsaal.jpg",
        isRecommended: false,
        type: "salsa",

    }
];

// Elementos que añadí a mi carrito
const cart = [
    {
        id: 2,
    },
];

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

    // Lógica de nuestro tag, botón de Recomendado o Más vendido
    let tagHtml;
    if (item.isRecommended) {
        tagHtml = `<span class="product__tag product__tag--recommended">Recomendado</span>`;
    
    } else {
        tagHtml = "";
    }

    // Lógica para saber si un producto ya fue añadido al carrito
    // para deshabilitar el botón.
    const isAdded = cart.some(productCart => productCart.id === item.id);
    let buttonHtml;

    if (isAdded) {
        buttonHtml = `<button class="product__car" disabled>Producto añadido</button>`
    } else {
        buttonHtml = `<button class="product__car">Añadir al carrito</button>`;
    }

    // Añadir el HTML a nuestro elemento product.
    product.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="product__image">
    <div class="product__description">
        ${tagHtml}
        <h3 class="product__price">$ ${item.price}</h3>
        <h2 class="product__name">${item.name}</h2>
        ${buttonHtml}
    </div>
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

        cart.push(productAdded);

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

    if (order === "asc"){
        filteredProductsByCategory = filteredProductsByCategory.sort((a, b) => a.price - b.price);
    }
    if (order === "desc"){
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



// Recorro cada uno de los productos que tengo en mi arreglo
products.forEach(product => {
    // Llamo la funcion productTemplate para cada product.
    productTemplate(product);
});

