// capturo elementos
const productsContainer = document.querySelector(".products-container");
const showMoreBtn = document.querySelector(".add-load");

const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");

//capturo elementos del carrito y menu hamburguesa
const menuBtn = document.querySelector(".bars-menu");
const navBarList = document.querySelector(".nav-bar");

const cartBtn = document.querySelector(".cart-toggle");
const cartMenu = document.querySelector(".cart");
const main = document.querySelector(".main");
const productsCart = document.querySelector(".cart-container");

const total = document.querySelector(".total");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");

// elementos del form
const form = document.getElementById("formulario-contacto");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const confirmedMsg = document.getElementById("mensaje-confirmacion");




//funciones auxiliares
const createProductTemplate = (product) =>{
    const { id, name, price, img, altName, category } = product;
    
    return `
        <div class="card-container">
            <div class="card-img">
                <img src=${img} alt=${altName}>
            </div>
            <div class="card-text">
                <div class="card-text-title">
                    <h4>${name}</h4>
                </div>
                <div class="card-text-btn">
                    <button class="btn btn-small"
                    data-id='${id}'
                    data-price='${price}'
                    data-name='${name}'
                    data-img='${img}'
                    data-category='${category}'
                    >Agregar al carrito</i></button>
                    <span>U$D ${price}</span>
                </div>
            </div>
            <div class="add-msg"></div>
        </div>
    `
};

//cargar productos en el render
const loadProducts = () =>{
    appState.currentProductsIndex = appState.currentProductsIndex + 1;
    
    let {products, currentProductsIndex} = appState;
    
    renderProducts(products[currentProductsIndex]);

    if(appState.currentProductsIndex === appState.productsLimit - 1){
        showMoreBtn.style.display = "none";
    };
};

const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
        .map(createProductTemplate)
        .join("");
};


//filtrar renderizado por categorias
const renderByCategory = ({ target }) =>{
    if (!isInactiveFilter( target )) return;
    
    changeFilterState(target);

    productsContainer.innerHTML= "";
    if(appState.activeFilter){
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    } 

    if(isInactiveFilter( target )){
        renderAllProducts();
        return;
    }
};

const renderAllProducts = () => {
    appState.currentProductsIndex = 0;
    loadProducts();
};

const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
        );
        renderProducts(filteredProducts);
};

const isInactiveFilter = (element) =>{
    return (element.classList.contains("category") && !element.classList.contains("active"));
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
    setShowMoreVisibility();
};



const changeBtnActiveState = (selectedCategory) =>{
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory){
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    });
};

const setShowMoreVisibility = () => {
    if(!appState.activeFilter){
        showMoreBtn.style.display = "block";
        return;
    }
    showMoreBtn.style.display = "none";
};


//obtengo la info que dejan en contacto
let contactInfo = JSON.parse(localStorage.getItem("contactInfo")) || [];

//funcion para hacer persistir la info en local storage
const saveToLocalStorage = () =>{
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
};


const isEmpty = (input) => {
    return !input.value.trim().length;
};

const isEmailValid = (input) => {
    const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
    
    return re.test(input.value.trim());
};

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector(".error");
    error.style.display = "block";
    error.textContent = message;
};
    
/**
* Función para mostrar un input como valido.
*/
const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector(".error");
    error.textContent = "";
};

const checkTextInput = (input) => {
    
    let valid = false;

    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio");
        return;
    }
    
    showSuccess(input);
    valid = true;
    return valid;
};

const checkEmail = (input) => {
    
    let valid = false;
    if (isEmpty(input)) {
        showError(input, "El email es obligatorio");
        return;
    }
    if (!isEmailValid(input)) {
        showError(input, "El email no es válido");
        return;
    }
    
    showSuccess(input);
    valid = true;
    return valid;
};


//funcion general de validacion de datos y contacto
const contact = (e) =>{
    e.preventDefault();
    
    let isNameValid = checkTextInput(nameInput);
    let isLastNameValid = checkTextInput(lastNameInput);
    let isEmailValid = checkEmail(emailInput);
    let isMessageValid = checkTextInput(message);

    let isValidForm = 
    isNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isMessageValid;

    if (isValidForm) {
        contactInfo.push({
            name: nameInput.value, 
            lastName: lastNameInput.value, 
            email: emailInput.value, 
            message: message.value, 
        });
        saveToLocalStorage(contactInfo);
        alert ("Has enviado tu mensaje con éxito");
    };
    form.reset();
};

//funciones del carrito
const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");

    if(navBarList.classList.contains("open-menu")){
        navBarList.classList.remove("open-menu");
        return;
    }
};

const toggleMenu = () =>{
    navBarList.classList.toggle("open-menu");

    if(cartMenu.classList.contains("open-cart")){
        cartMenu.classList.remove("open-cart");
        return;
    }
};

const closeOnScroll = () => {
    if (!navBarList.classList.contains("open-menu")){
        return
    };
    navBarList.classList.remove("open-menu");
};

const closeOnClick = (e) =>{
    if(!e.target.classList.contains("navbar-link")){
        return
    };
    navBarList.classList.remove("open-menu");
};

const closeOnMainClick = (e) =>{
    if(e.target.classList.contains("main")){
        return
    };
    navBarList.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
};


//obtengo la info de carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//guardo datos en LS
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};


const renderCart = () =>{
    if(!cart.length){
        productsCart.innerHTML = `
        <p>No hay productos en el carrito</p>
        `;
        return;
    }
    
    productsCart.innerHTML = "";
    
    productsCart.innerHTML += cart
    .map(createCartProductTemplate)
    .join("");
    
    // if (existInCart()) {
    //     showMsgCart("El producto ya ha sido agregado al carrito");
    //     return;
    // }

};

const createCartProductTemplate = (cartProduct) =>{
    const { id, name, price, img } = cartProduct;
    return `
        <div class="cart-item">
            <img src="${img}" alt="${id}">
            <div class="item-info">
                <h3 class="item-title">${name}</h3>
                <span class="item-price">U$D ${price}</span>
            </div>
        </div>
    `
};

const showCartTotal = () =>{
    total.innerHTML = `U$D ${getCartTotal()}`;
};

const getCartTotal = () =>{
    return cart.reduce((acc, cur) => acc + Number(cur.price), 0);
};

const addProduct = (e) =>{
    
    //si el evento cae fuera del boton de agregar, retorno sin cambio
    if(!e.target.classList.contains("btn-small") && !e.target.classList.contains("fa-cart-plus")){
        return;
    }
    
    const product = createProductData(e.target.dataset);
    
    if(existInCart(product)){
        showMsgCart("El producto ya ha sido agregado al carrito")
        return;
    } else {
        // si el evento recae en el boton, agrego al carrito
        //funcion para agregar producto
        createCartProduct(product);
        //muestro mensaje de exito
        showMsgCart("El producto se agregó al carrito");
        //actualizo el carrito
    }
    
    updateCartState();
    
};

//como son diseños y no productos en si, dar aviso si el producto ya esta en el carrito, para no agregar mas de un producto de cada uno
const existInCart = (product) => {
    return cart.find((item) => item.id === product.id);
};

const showMsgCart = (msg) =>{
    alert(msg);
};


const createProductData = (product) =>{
    const { id, name, price, img } = product;
    return { id, name, price, img };
};


const createCartProduct = (product) =>{
    cart = [...cart, {...product}];
};

const disableBtn = (btn) =>{
    if(!cart.length){
        btn.style.display = "none";
    } else{
        btn.style.display = "block";
    }
};

const updateCartState = () =>{
    //guardar datos en LS
    saveCart(cart);
    //renderizo el carrito
    renderCart();
    //muestro el total de la compra en precio
    showCartTotal();

    disableBtn(buyBtn);
    disableBtn(deleteBtn);

};

const resetCartItems = () => {
    cart = [];
    updateCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return; 
    if (window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg);
    }
};

const completeBuy = () => {
    completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

const deleteCart = () => {
    completeCartAction(
        "¿Desea vaciar el carrito?",
        "No hay productos en el carrito"
    );
};




const init = () => {
    renderProducts(appState.products[0]);
    showMoreBtn.addEventListener("click", loadProducts);
    categoriesContainer.addEventListener("click", renderByCategory);
    form.addEventListener("submit", contact);
    nameInput.addEventListener("input", () => checkTextInput(nameInput));
    lastNameInput.addEventListener("input", () => checkTextInput(lastNameInput));
    emailInput.addEventListener("input", () => checkEmail(emailInput));
    message.addEventListener("input", () => checkTextInput(message));
    cartBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeOnScroll);
    navBarList.addEventListener("click", closeOnClick);
    main.addEventListener("click", closeOnMainClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    document.addEventListener("click", addProduct);
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
};

init();