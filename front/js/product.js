    // Function to get the url parameter of the specified key
    getParameter = (key) => {
       address = window.location.search
       parameterList = new URLSearchParams(address)
       return parameterList.get(key)
}
  
    // Get the value associated with the key "id"
    var idItem = getParameter("id");


    // Get the product data from the back associated to the "id"
    fetch('http://localhost:3000/api/products/'+idItem)
        .then(resp => resp.json())
        .then(resp2 => console.log(resp2))
