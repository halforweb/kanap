    // Function to get the url parameter of the specified key
    getParameter = (key) => {
       address = window.location.search
       parameterList = new URLSearchParams(address)
       return parameterList.get(key)
}
  
    // Gets the value associated with the key "id"
    console.log(getParameter("id"))
    
