      
            
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
            
               //Call the function that will automatically run renderProduct() also 
               fetchDataId();

              
              
               

              




