//******************************************************************************* Display the products with DOM   ********************************************************** */       

// Get the orderID
const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");

// Display the ID of the order
document.getElementById("orderId").textContent = orderId;