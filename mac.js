let cart = [];


function addToCart(name, price) {
  cart.push({ name, price });
  updateCartCount();
  alert(`${name} has been added to your cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
  updateCartCount();
}


function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;  
}


function toggleCart() {
  const cartSection = document.getElementById("cart");
  cartSection.classList.toggle("hidden"); 

  if (!cartSection.classList.contains("hidden")) {
    updateCartDisplay(); 
  }
}


function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";  

 
  cart.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - $${item.price}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.onclick = () => removeFromCart(index);  

    listItem.appendChild(removeButton);
    cartItems.appendChild(listItem);
  });
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
}


function proceedToCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items to the cart before proceeding to checkout.');
    return;
  }


  document.getElementById("cart").classList.add("hidden");
  document.getElementById("checkout").classList.remove("hidden");
}


function handleCheckout(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const payment = document.getElementById("payment").value;

  if (!email || !payment) {
    alert('Please enter both email and payment method.');
    return;
  }

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  alert(`Thank you for your purchase! Your total is $${totalPrice.toFixed(2)}. A confirmation email will be sent to ${email}.`);


  cart = [];
  updateCartCount();
  updateCartDisplay();


  document.getElementById("checkout").classList.add("hidden");
  document.getElementById("cart").classList.remove("hidden");
}

function cancelCheckout() {
  document.getElementById("checkout").classList.add("hidden");
  document.getElementById("cart").classList.remove("hidden");
}


document.getElementById("checkout-btn").addEventListener("click", proceedToCheckout);
document.getElementById("checkout-form").addEventListener("submit", handleCheckout);
document.getElementById("cancel-checkout").addEventListener("click", cancelCheckout);


document.querySelector('.cart-icon').addEventListener('click', function() {
  toggleCart();
});


document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('active');
});
