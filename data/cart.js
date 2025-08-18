export let cart;

loadFromStorage(); //we need to run this function atleast once to load the cart from local storage
//loadFromStorage()  this function is for test addToCart() function in test-jasmine

//Load from storage
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "1",
    },
  ];
}

//Saving into LocalStorage
//So that when add a product into cart the product can appear on the checkout page
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Add To Cart
export function addToCart(productId) {
  //#dropdown quantity selector

  let quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantitySelectorValue = Number(quantitySelector.value); //info from DOM are string

  let matchingItem; //Item already in cart

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    //This part is not inside the above forEach because when there is no any item in cart the the loop wll not execute that create an unwanted problem
    matchingItem.quantity += quantitySelectorValue;
  } else {
    cart.push({
      productId: productId,
      quantity: quantitySelectorValue,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

//Remove from cart
export function removeFromCart(productId) {
  let newCart = []; //Making a new array except the selected productId and copying it into 'cart' array

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

//Calculate cart quantity
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

//Update cart quantity
export function upadteQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });

  saveToStorage();
}

//Updating delivery date
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem; //Item already in cart

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId; //Updating new deliveryOptionId

  saveToStorage();
}

//loading cart from backend
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);

    fun(); //Run all the code inside of the function after geting the response
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

// Storing matching cartItem inside the variable to use its info
export function getProductFromCart(productId) {
  let matchingProductFromCart;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingProductFromCart = cartItem;
    }
  });

  return matchingProductFromCart;
}
