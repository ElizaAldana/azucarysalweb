const firebaseConfig = {
    apiKey: "AIzaSyCmZzvDPBNiYr_9V2lyzqFfzwPRzWeHERo",
    authDomain: "carrito-31765.firebaseapp.com",
    projectId: "carrito-31765",
    storageBucket: "carrito-31765.appspot.com",
    messagingSenderId: "740840766168",
    appId: "1:740840766168:web:826f902c85e2f3a444b5ad",
    measurementId: "G-SG7SYWCWW8"
  };

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("es-CO",{
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };