
    function fetchData() {
        fetch('http://localhost:3000/api/products')
        .then(resp => resp.json())
        .then(data => renderProducts(data))
      }
      function renderProducts(data) {
          for (const q of data) {
    
          //Define the container where we attach everything to
          const item = document.querySelector('#items');
    
          //Create all necessary elements
          const itemsLink = document.createElement('a');
          const itemsArticle = document.createElement('article');
          const itemsImg = document.createElement('img');
          const itemsTitle = document.createElement('h3');
          const itemsDescription = document.createElement('p');
    
          //Grab data and insert it into created elements
          itemsLink.href = `../html/product.html?id=${q._id}`;
          itemsImg.src = q.imageUrl;
          itemsImg.alt = q.altTxt;
          itemsTitle.innerText = q.name;
          itemsDescription.innerText = q.description;
    
          //Append everything to main container
          itemsArticle.append(itemsImg, itemsTitle, itemsDescription);
          itemsLink.append(itemsArticle);
          item.append(itemsLink);
          }
       }
    
       //Call the function that will automatically run renderProducts() also 
       fetchData();
