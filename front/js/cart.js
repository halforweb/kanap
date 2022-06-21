//******************************************************************************* Display the products with DOM   ********************************************************** */       

// initianilization of the local storage
let productLocalStorage = JSON.parse(localStorage.getItem("selectedProduct"));

async function displayCart() {

    //Define the container where we attach everything to
    const cartItems = document.querySelector("#cart__items");

    // if the cart is empty
    if (productLocalStorage === null || productLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        cartItems.innerHTML = emptyCart;
    }
    // if the cart contains products
    else {
        for (i = 0; i < productLocalStorage.length; i++) {
            const product = await getProduct(productLocalStorage[i].idSelectedProduct);

            // Insert article with className "cart__item" and id "data-id"
            let productArticle = document.createElement("article");
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', productLocalStorage[i].idSelectedProduct);
            cartItems.appendChild(productArticle);

            // Insert div with className "cart__item__img"
            let productDivImg = document.createElement("div");
            productDivImg.className = "cart__item__img";
            productArticle.appendChild(productDivImg);

            // Insert Image
            let productImg = document.createElement("img");
            productImg.src = product.imageUrl;
            productImg.alt = product.altTxt;
            productDivImg.appendChild(productImg);

            // Insert div with className "cart__item__content"
            let productItemContent = document.createElement("div");
            productItemContent.className = "cart__item__content";
            productArticle.appendChild(productItemContent);

            // Insert div with className "cart__item__content__titlePrice"
            let productItemContentTitlePrice = document.createElement("div");
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";
            productItemContent.appendChild(productItemContentTitlePrice);

            // Insert h3
            let productTitle = document.createElement("h2");
            productTitle.innerHTML = product.name;
            productItemContentTitlePrice.appendChild(productTitle);

            // Insert color
            let productColor = document.createElement("p");
            productColor.innerHTML = productLocalStorage[i].colorSelectedProduct;
            productTitle.appendChild(productColor);

            // Insertion price
            let productPrice = document.createElement("p");
            productPrice.innerHTML = "Prix unitaire: " + product.price + " €";
            productItemContentTitlePrice.appendChild(productPrice);

            // Insert div with className "cart__item__content__settings"
            let productItemContentSettings = document.createElement("div");
            productItemContentSettings.className = "cart__item__content__settings";
            productItemContent.appendChild(productItemContentSettings);

            // Insert div with className "cart__item__content__settings__quantity"
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);

            // Insert "Qté : "
            let productQte = document.createElement("p");
            productQte.innerHTML = "Qté : ";
            productItemContentSettingsQuantity.appendChild(productQte);

            // Insert Quantity with className "itemQuantity"
            let productQuantity = document.createElement("input");
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
            productQuantity.value = productLocalStorage[i].quantitySelectedProduct;
            productItemContentSettingsQuantity.appendChild(productQuantity);

            // Insert div with className "cart__item__content__settings__delete"
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
            productItemContentSettings.appendChild(productItemContentSettingsDelete);

            // Insert de "p" with className "deleteItem"
            let productSupprimer = document.createElement("p");
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";
            productItemContentSettingsDelete.appendChild(productSupprimer);
        }

        // Display the total quantity and total price
        let totalQuantity = 0;
        let totalPrice = 0;
        for (i = 0; i < productLocalStorage.length; i++) {
            const article = await getProduct(productLocalStorage[i].idSelectedProduct);
            totalQuantity += parseInt(productLocalStorage[i].quantitySelectedProduct);
            totalPrice += parseInt(article.price * productLocalStorage[i].quantitySelectedProduct);
        }
        document.getElementById("totalQuantity").innerHTML = totalQuantity;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    }
    modifyCartQuantity();
    deleteProduct();
}

//Function to get the products details from the Back
async function getProduct(Id) {
    let res = await fetch("http://localhost:3000/api/products/" + Id)
    return res.json();
}

//Function to change the card quantities
function modifyCartQuantity() {
    let quantityInput = document.querySelectorAll(".itemQuantity");

    for (let j = 0; j < quantityInput.length; j++) {
        quantityInput[j].addEventListener("change", (event) => {
            event.preventDefault();

            if (quantityInput[j].valueAsNumber > 100 || quantityInput[j].valueAsNumber < 1) {
                alert("La quantité doit être comprise entre 1 et 100");
                location.reload();
            }
            else {

                //Select the item to modify
                let existingQuantity = productLocalStorage[j].quantitySelectedProduct;
                let newQuantity = quantityInput[j].valueAsNumber;

                //Amend the local storage with the new quantity
                const findProduct = productLocalStorage.find((element) => element.newQuantity !== existingQuantity);
                findProduct.quantitySelectedProduct = newQuantity;
                productLocalStorage[j].quantitySelectedProduct = findProduct.quantitySelectedProduct;
                localStorage.setItem("selectedProduct", JSON.stringify(productLocalStorage));

                //Refresh the page
                alert("la quantité a bien été changée");
                location.reload();
            }
        })
    }
}

// Function to delete a product from the card
function deleteProduct() {
    let btn_delete = document.querySelectorAll(".deleteItem");

    for (let k = 0; k < btn_delete.length; k++){
        btn_delete[k].addEventListener("click" , (event) => {
            event.preventDefault();

            //Select the item to delete based on id and color
            let idDelete = productLocalStorage[k].idSelectedProduct;
            let colorDelete = productLocalStorage[k].colorSelectedProduct;
            productLocalStorage = productLocalStorage.filter( element => element.idSelectedProduct !== idDelete || element.colorSelectedProduct !== colorDelete );
            localStorage.setItem("selectedProduct", JSON.stringify(productLocalStorage));

            //Confirmation message product has been deleted
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}


//Call the functions 
displayCart();




