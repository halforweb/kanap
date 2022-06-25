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
        productLocalStorage[j].quantitySelectedProduct = newQuantity;
        localStorage.setItem("selectedProduct", JSON.stringify(productLocalStorage));

        //Confirmation message product has been deleted
        alert("la quantité a bien été changée");
        location.reload();
      }
    })
  }
}

// Function to delete a product from the card
function deleteProduct() {
  let btn_delete = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < btn_delete.length; k++) {
    btn_delete[k].addEventListener("click", (event) => {
      event.preventDefault();

      //Select the item to delete based on id and color
      let idDelete = productLocalStorage[k].idSelectedProduct;
      let colorDelete = productLocalStorage[k].colorSelectedProduct;
      productLocalStorage = productLocalStorage.filter(element => element.idSelectedProduct !== idDelete || element.colorSelectedProduct !== colorDelete);
      localStorage.setItem("selectedProduct", JSON.stringify(productLocalStorage));

      //Confirmation message product has been deleted
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    })
  }
}


//Call the functions 
displayCart();

//******************************************************************************* Validate the form and push the order   ********************************************************** */       

// Create Regex Variables 
let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

// Create to get the id of the form
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// Validation of the first name
firstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Prénom non valide";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation of the last name
lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Nom non valide";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation of the address
address.addEventListener("input", (event) => {
  event.preventDefault();
  if (adressRegex.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Adresse non valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation of the city
city.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Ville non valide";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation of the email
email.addEventListener("input", (event) => {
  event.preventDefault();
  if (emailRegex.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Email non valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
});


let order = document.getElementById("order");
order.addEventListener("click", (e) => {
  e.preventDefault();

  // Create an array to collect user informations
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    alert("Vous devez renseigner vos coordonnées pour passer la commande !");
  } else if (
    nameRegex.test(firstName.value) == false ||
    nameRegex.test(lastName.value) == false ||
    adressRegex.test(address.value) == false ||
    nameRegex.test(city.value) == false ||
    emailRegex.test(email.value) == false
  ) {
    alert("Merci de renseigner correctement vos coordonnées !");
  } else {
    let products = [];
    productLocalStorage.forEach((order) => {
      products.push(order.idSelectedProduct);
    });

    let pageOrder = { contact, products };

    // Call API to send the order
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pageOrder),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        window.location.href = `./confirmation.html?orderId= ${data.orderId}`;
        localStorage.clear();
      })
      .catch((error) => {
        console.log("une erreur est survenue");
      });
  }
});