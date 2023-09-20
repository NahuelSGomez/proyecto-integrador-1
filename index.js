// capturo elementos
// const filters = document.querySelectorAll(".categories");
const productsContainer = document.querySelector(".products-container");
const showMoreBtn = document.querySelector(".add-load");

const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");

// elementos del form
const form = document.getElementById("formulario-contacto");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const confirmedMsg = document.getElementById("mensaje-confirmacion");

//capturo elementos del carrito y menu hamburguesa
const menuBtn = document.querySelector(".bars-menu");
const navBarList = document.querySelector(".nav-bar");
const cartBtn = document.querySelector(".cart-toggle");
const cartMenu = document.querySelector(".cart");
const productsCart = document.querySelector(".cart-container");



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
                    ><i class="fa-solid fa-cart-shopping"></i>
                    </button>
                    <a href="#" class="btn-secondary">Más info</a>
                    <span>${price}</span>
                </div>
            </div>
    </div>
`
};

//cargar productos en el render
const loadProducts = () =>{
    appState.currentProductsIndex += 1;
    let {products, currentProductsIndex} = appState;
    renderProducts(products[currentProductsIndex]);

    if(appState.currentProductsIndex === appState.productsLimit - 1){
        showMoreBtn.style.display = "none";
    }
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
    renderProducts(appState.products[0]);
};

const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
};

const isInactiveFilter = (element) =>{
    return ( element.classList.contains("category") && !element.classList.contains("active"));
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
    if (!navBarList.classList.contains("open-menu") && !cartMenu.classList.contains("open-cart")){
        return
    };
    navBarList.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
};

const closeOnClick = (e) =>{
    if(!e.target.classList.contains("navbar-link")){
        return
    };
    navBarList.classList.remove("open-menu");
};

const closeOnMainClick = (e) =>{
    if(!e.target.classList.contains("main")){
        return
    };
    navBarList.classList.toggle("open-menu");
    cartMenu.classList.toggle("open-cart");
};

//SEGUIR ACA

const renderCart = () =>{
    if(!cartMenu.length){
        productsCart.innerHTML = `
        <p>No hay productos en el carrito</p>
        `;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

const createCartProductTemplate = (cartProduct) =>{
    const{ id, name, price, img, quantity } = cartProduct;
    return `
        <div class="cart-item">
            <img src="${img}" alt="${name}">
            <div class="item-info">
                <h3 class="item-title">${name}</h3>
                <span class="item-price">${price}</span>
            </div>
            <div class="item-handler">
                <span class="quantity-handler dowm" data-id=${id}>-</span>
                <span class="item-quantity">${quantity}</span>
                <span class="quantity-handler up" data-id=${id}>+</span>
            </div>
        </div>
    `
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
    document.addEventListener("click", closeOnMainClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
};
init();