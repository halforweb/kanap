fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(response2 => console.log(response2[1]))

    