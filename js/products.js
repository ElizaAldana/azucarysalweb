import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/*const products = [
    {
        id: 1,
        name: "Salsa de Jalapeño",
        price: 12000,
        pricetag: "$12.000",
        image: "./images/salsajal.jpg",
        description: "Preparada con los mejores ingredientes provenientes de la Granja Magokoro",
        desc: "Realmente la salsa de jalapeño es perfecta para acompañar comidas suaves, y para condimentar cualquier tipo de preparación salada en la que quieras un toque de picante. Viene en presentación de 120ml.",
        isRecommended: true,
        type: "salsa",
    },
    {
        id: 2,
        name: "Cupcakes",
        price: 25000,
        pricetag: "$25.000",
        image: "./images/c.jpg",
        description: "Deliciosos y perfectos para ocasiones especiales",
        desc: "Variedades de cupcakes con distintos sabores y decoraciones, elige la que más te guste. Vienen en una caja especial x12 cupcakes",
        isRecommended: false,
        type: "dulce",
    },
    {
        id: 3,
        name: "Salsa de Perejil",
        price: 12000,
        pricetag: "$12.000",
        image: "./images/salsape.jpg",
        description: "Preparada con los mejores ingredientes provenientes de la Granja Magokoro",
        desc: "Realmente la salsa de perejil es perfecta para acompañar comidas fuertes, como las papas asadas, la carne, y otras proteinas. Viene en presentación de 120ml.",
        isRecommended: false,
        type: "salsa",
    },
    {
        id: 4,
        name: "Tortas",
        price: 60000,
        pricetag: "$60.000",
        image: "./images/tp.jpg",
        description: "Tortas para esas celebraciones donde sólo quieres algo dulce",
        desc: "Nuestras ricas tortas son perfectas para cualquier ocasión, incluso hay de temporada cuando se trata de navidad o halloween, no te las querrás perder. Todas son de 1 Libra, elige el sabor que desees.",
        isRecommended: false,
        type: "dulce",
    },
    {
        id: 5,
        name: "Galletas",
        price: 15000,
        pricetag: "$15.000",
        image: "./images/ga.jpg",
        description: "Galletas hechas con amor porque somos fans de las galletas :3",
        desc: "Galletas de mantequilla, chips de chocolate y mucho más, elige el sabor que quieras. Las presentaciones que manejamos es en caja x12 galletas",
        isRecommended: true,
        type: "dulce",

    },
    {
        id: 6,
        name: "Bentos infantiles",
        price: 15000,
        pricetag: "$15.000",
        image: "./images/b.jpg",
        description: "Preparados con los mejores ingredientes provenientes de la Granja Magokoro",
        desc: "Los bentos son una modalidad de almuerzos empacados para llevar, muy comunes en Japón. Son excelentes incluso para lugares donde no hay microondas, porque no se necesita comer caliente. Tienen ingredientes saludables para tus niños",
        isRecommended: false,
        type: "magokoro",

    },
    {
        id: 7,
        name: "Salsa de Ajonjolí",
        price: 12000,
        pricetag: "$12.000",
        image: "./images/salsaaj.jpg",
        description: "Preparada con los mejores ingredientes provenientes de la Granja Magokoro",
        desc: "Realmente la salsa de ajonjolí japonesa es excelente para acompañar el arroz, preparaciones japonesas, y ensaladas frescas. Viene en presentación de 120ml",
        isRecommended: true,
        type: "salsa",

    },
    {
        id: 8,
        name: "Ramen",
        price: 20000,
        pricetag: "$20.000",
        image: "./images/ra.jpg",
        description: "Preparada con los mejores ingredientes japoneses y pasta de Ramen",
        desc: "Ramen en la puerta de tu casa. Es un gran plato, muy popular en Asia, pero aquí te preparamos el japonés. Elige el caldo que desees. Viene empacado en un bowl",
        isRecommended: false,
        type: "magokoro",

    },
    {
        id: 9,
        name: "Salsa de Albahaca",
        price: 12000,
        pricetag: "$12.000",
        image: "./images/salsaal.jpg",
        description: "Preparada con los mejores ingredientes provenientes de la Granja Magokoro",
        desc: "Realmente la salsa de albahaca es un excelente acompañante de platillos italianos, perfecta para pastas y crepes. Viene en presentación de 120ml",
        isRecommended: false,
        type: "salsa",

    }
];*/

products.forEach(async(product) => {
    await setDoc(doc(db, "products", `01289FB321A54F2${product.id}`), product);
});