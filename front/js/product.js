
//******************************************************************************* Display the product in the webpage  ********************************************************** */       
// Function to get the url parameter of the specified key
getParameter = (key) => {
    address = window.location.search
    parameterList = new URLSearchParams(address)
    return parameterList.get(key)
}

// Get the value associated with the key "id"
var idItem = getParameter("id");


// Get the product data from the back associated to the "id"
function fetchDataId() {
    fetch('http://localhost:3000/api/products/' + idItem)
        .then(resp => resp.json())
        .then(dataId => renderProduct(dataId))
}

// Insert product details 
function renderProduct(dataId) {

    // Modify DOM and insert img details
    const itemImgBloc = document.querySelector(".item__img");
    const itemImg = document.createElement("img");
    itemImg.src = dataId.imageUrl;
    itemImg.alt = dataId.altTxt;
    itemImgBloc.appendChild(itemImg);

    // Select DOM element and insert product details
    const itemTitle = document.getElementById("title")
    itemTitle.innerText = (dataId.name);

    const itemPrice = document.getElementById("price")
    itemPrice.innerText = dataId.price;

    const itemDescription = document.getElementById("description")
    itemDescription.innerText = dataId.description;

    // Modify DOM and create the option for colors
    for (const color of dataId.colors) {
        const itemColorsBloc = document.getElementById("colors");
        const itemColors = document.createElement("option");
        itemColors.value = color;
        itemColors.innerHTML = color;
        itemColorsBloc.appendChild(itemColors);
    }
}

//******************************************************************************* Add product in the card  ********************************************************** */       

// Save the product selected in local storage
function addToCard() {

    // Check the button click "add to card" and control the product details selected
    const button = document.getElementById("addToCart");
    button.addEventListener("click", (event) => {
        event.preventDefault();
        let productColor = document.getElementById("colors").value;
        let productQuantity = parseInt(document.getElementById("quantity").value);

        // if no color is selected
        if (productColor == "") {
            alert("Veuillez sélectionner une couleur");
            return;
        }
        // if quantity is not defined between 1 and 100
        if (productQuantity == 0) {
            alert("Veuillez renseigner une quantité");
            return;
        }
        else if (productQuantity > 100) {
            alert("La quantité maximale autorisée est de 100");
            return;
        }

        // Define the product details
        const selectedProduct = {
            idSelectedProduct: idItem,
            colorSelectedProduct: productColor,
            quantitySelectedProduct: productQuantity,
        };

        // Create the local storage
        let selectedProductArray = JSON.parse(localStorage.getItem("selectedProduct"));

        // Amend the local storage if there is no product
        if (selectedProductArray == null) {
            selectedProductArray = [];
            selectedProductArray.push(selectedProduct);
            localStorage.setItem("selectedProduct", JSON.stringify(selectedProductArray));
            alert("Produit ajouté au panier !");
        }
        // Amend the local storage if there is existing product
        else if (selectedProductArray != null) {

            // Check the local storage
            let findProducts = selectedProductArray.find((element) =>
                element.idSelectedProduct === selectedProduct.idSelectedProduct
                &&
                element.colorSelectedProduct === selectedProduct.colorSelectedProduct
            );

            // if there is an existing product with same ID and Color, increment quantity to the local storage  
            if (findProducts) {
                let newQuantity = parseInt(findProducts.quantitySelectedProduct) + parseInt(selectedProduct.quantitySelectedProduct);
                findProducts.quantitySelectedProduct = newQuantity;
                if (newQuantity > 100) {
                    newQuantity = 100;
                }
                localStorage.setItem("selectedProduct", JSON.stringify(selectedProductArray));
                alert(`${findProducts.quantitySelectedProduct} exemplaire(s) de ce produit sont dans le panier`)
            }

            // if there is no existing product with the same ID and color, the new product is added to the local storage
            else {
                selectedProductArray.push(selectedProduct);
                localStorage.setItem("selectedProduct", JSON.stringify(selectedProductArray));
                alert("Produit ajouté au panier !")
            }
        }
    });
}

//Call the functions 
fetchDataId();
addToCard();





