// capturo elementos
const filters = document.querySelectorAll(".categories");
const productsContainer = document.querySelector(".products-container");
const showMoreproducts = document.querySelector(".add-load");

const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");

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
                    data-id=${id}
                    data-price=${price}
                    data-name=${name}
                    data-img=${img}
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
        showMoreproducts.style.display = "none";
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
    })
};

const setShowMoreVisibility = () => {
    if(!appState.activeFilter){
        showMoreproducts.style.display = "none";
    }
    showMoreproducts.style.display = "block";
};

const isInactiveFilter = (element) =>{
    return ( element.classList.contains("category") && !element.classList.contains("active"));
};

//obtengo el mensaje que dejan en contacto
const msg = JSON.parse(localStorage.getItem("msg")) || [];

//funcion para hacer persistir el mensaje en local storage
const saveToLocalStorage = () =>{
    localStorage.setItem("msg", JSON.stringify(msg));
};

const validateMsg = (e) =>{
    // e.preventDefault();
    // return msg;
};

const init = () => {
    renderProducts(appState.products[0]);
    showMoreproducts.addEventListener("click", loadProducts);
    categoriesContainer.addEventListener("click", renderByCategory);
    form.addEventListener("submit", validateMsg);
};
init();