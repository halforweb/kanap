      
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
            fetch('http://localhost:3000/api/products/'+idItem)
                .then(resp => resp.json())
                .then(dataId => renderProduct(dataId))
            }
            
            // Insert product details 
            function renderProduct(dataId) {
            
                    // Modify DOM and insert img details
                    const itemImgBloc = document.querySelector(".item__img");
                    const itemImg = document.createElement("img")
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

                    // Check the button click "add to card"
                    const button = document.getElementById("addToCart");
                          button.addEventListener("click", function () {

                
                            // Define the product details
                            const selectedProduct = {
                                idSelectedProduct: idItem,
                                colorSelectedProduct: document.getElementById("colors").value,
                                quantitySelectedProduct: document.getElementById("quantity").value,
                                };

                            // Control the product details selected
                            if (selectedProduct.quantitySelectedProduct > 100 || selectedProduct.quantitySelectedProduct < 1 ) {
                                alert('Veuillez renseigner une quantité entre 1 et 100');
                                }
                            else if (selectedProduct.colorSelectedProduct == "") { 
                                    alert("Veuillez selectionner une couleur");
                                }

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
                                    if(newQuantity > 100) {
                                        newQuantity = 100;
                                    }
                                    localStorage.setItem("selectedProduct", JSON.stringify(selectedProductArray));
                                    alert(`${findProducts.quantitySelectedProduct} exemplaire(s) de ce produit sont dans le panier`)
                                }
            
                                // if there is no existing product with the same ID and color, the new product is added to the local storage
                                else {
                                    selectedProductArray.push(selectedProduct);
                                    localStorage.setItem("selectedProduct", JSON.stringify(selectedProductArray));
                                    alert(`${selectedProduct.quantitySelectedProduct} exemplaire(s) de ce produit ajouté(s) au panier !`)
                                }
                            }
                        }
                        )                       
                   }


//Call the functions 
    fetchDataId();
    addToCard();
              




