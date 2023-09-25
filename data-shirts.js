const productsData = [
    {
        id: 1,
        name: "Basic Ranglan Beckham model",
        price: "15",
        img: "./img/beckham.webp",
        altName: "beckham-model",
        category: "Entrenamiento",
    },

    {
        id: 2,
        name: "Basic Ranglan Model",
        price: "10",
        img: "./img/Nike_Shot.png",
        altName: "Nike-Shot",
        category: "Entrenamiento",
    },

    {
        id: 3,
        name: "Nike Model 2004 Brasil",
        price: "15",
        img: "./img/bra.1474_1.png",
        altName: "Nike-Model-Brasil",
        category: "Selecciones",
    },

    {
        id: 4,
        name: "Nike Model 2004 Barcelona",
        price: "10",
        img: "./img/nike_2004.png",
        altName: "Nike-Model-Barcelona",
        category: "Clubes",
    },
    {
        id: 5,
        name: "Puma 2022",
        price: "20",
        img: "./img/puma_maniqui_1.png",
        altName: "Puma-2022",
        category: "Entrenamiento",
    },

    {
        id: 6,
        name: "Pack 3D",
        price: "20",
        img: "./img/Tity.1249.png",
        altName: "tity",
        category: "Clubes",
    },

    {
        id: 7,
        name: "New Dri Fit ADV Nike Template",
        price: "15",
        img: "./img/bra.1498.png",
        altName: "New-Dri-Barcelona",
        category: "Entrenamiento",
    }
];

//funcion para dividir en array los productos, asociado al "ver mas"
const divideProductsInParts = (size) =>{
    let productsList = [];
    for (let i = 0; i < productsData.length; i += size)
        productsList.push(productsData.slice(i, i + size))
    return productsList;
};

//estado base para mostrar los productos
const appState = {
    products: divideProductsInParts(3), 
    currentProductsIndex: 0, 
    productsLimit: divideProductsInParts(3).length,
    activeFilter: null,
    allproducts: productsData.length
};