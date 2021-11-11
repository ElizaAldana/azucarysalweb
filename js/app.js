
// Elementos que añadí a mi carrito
const cart = [];

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

