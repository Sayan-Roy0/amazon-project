import { cart, addToCart, calculateCartQuantity } from "../data/cart.js"; // ../ to go out side of the current file  {cart as myCart}
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
//Step to get a Variable out of a File
//1. Add type="module" attribute
//export
//import

loadProducts(renderProductsGrid); //We need to wait some time to get response from backend

function renderProductsGrid() {
  let productsHtml = ``;

  products.forEach((product) => {
    productsHtml += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src=${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${
                  product.id
                } js-quantity-selector">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
              product.id
            }">
                Add to Cart
            </button>
            </div>
    `;
  });
  document.querySelector(".js-products-grid").innerHTML = productsHtml;

  const addedMessageTimeouts = {};
  /*We are going to use an object to save the timeout ids. 
as each product will have its own timeoutId so an object lets us save multiple timeout ids for different products. 
For example :
{
  'product-id1': 2,
  'product-id2': 5,
}
  thr 2,5 are ids that are return when we call setTimeout*/

  //#Added message
  function addedMessage(productId) {
    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addedMessage.classList.add("added-to-cart-updateOpacity");
    //check if there is a previous timeout for this product. if there is, we should stop it
    const previousTimeoutId = addedMessageTimeouts[productId];

    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-updateOpacity");
    }, 2000);

    //save the timeoustId for this product
    //so we can stop it later if we need to.
    addedMessageTimeouts[productId] = timeoutId;
  }

  //#Updating cart Quantity
  function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();
    if (cartQuantity !== 0) {
      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    } //When there is no any item insidecart display it blabnk instead of 0
  }
  updateCartQuantity();

  //#When click Add to Cart button
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      let productId = button.dataset.productId; //Taking product id from the the html which is added with (data-.... = "..")

      addToCart(productId);

      addedMessage(productId);

      updateCartQuantity();
    });
  });
}
