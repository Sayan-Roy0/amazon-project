import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  upadteQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"; //This is caled default export without { dayjs } this is used when a file has only single export
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";

//Generating HTML for items inside the cart

export function renderOrderSummary() {
  let cartItemsHTML = ``;

  cart.forEach((cartItem) => {
    //Geting all info from product id
    const matchingProduct = getProduct(cartItem.productId);

    //Geting all info from deliveryOption id
    const matchingDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    const today = dayjs(); //Current date
    const deliveryDate = today.add(matchingDeliveryOption.deliveryDays, "days"); //add some days to current date
    const dateString = deliveryDate.format("dddd, MMMM D"); //formating the date as   Monday, July 28

    cartItemsHTML += `
    <div class="cart-item-container
    js-cart-item-container
    js-cart-item-container-${cartItem.productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name js-product-name-${cartItem.productId}">
                 ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${
                  cartItem.productId
                }">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity 
               js-product-quantity-${cartItem.productId}
                ">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${
                      cartItem.productId
                    }">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-upadate-link" data-product-id="${
                    cartItem.productId
                  }">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${
                    cartItem.productId
                  }">
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${
                    cartItem.productId
                  }" data-product-id="${cartItem.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(cartItem)}
              </div>
            </div>
          </div>
    `;
  });

  //Generate HTML for each item's three shipping date
  function deliveryOptionHTML(cartItem) {
    let html = ``;

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs(); //Current date

      const deliveryDate = today.add(deliveryOption.deliveryDays, "days"); //add some days to current date

      const dateString = deliveryDate.format("dddd, MMMM D"); //formating the date as   Monday, July 28

      const priceCents =
        deliveryOption.priceCents === 0
          ? "FREE "
          : `$${formatCurrency(deliveryOption.priceCents)} - `; //if price = 0 the display free otherwise display the delivery charge

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId; //When deliveryOptionId of cart match with  deliveryOption item id

      html += `
  <div class="delivery-option js-delivery-option js-delivery-option-${
    cartItem.productId
  }-${deliveryOption.id}" 

  data-product-id="${cartItem.productId}"
  data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                         ${isChecked ? "checked" : ""}        
                    class="delivery-option-input js-delivery-option-input-${
                      cartItem.productId
                    }-${deliveryOption.id}"
                    name="delivery-option-${
                      cartItem.productId
                      /*here use different name for each item redio option, as we can select any option for each element otherwise if the name was same then we can select only one option from all the items */
                    }">
                  <div>
                    <div class="delivery-option-date">
                     ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceCents} Shipping
                    </div>
                  </div>
                </div>
  `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartItemsHTML;

  //udate Checkout(items)
  function updateCheckout() {
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${calculateCartQuantity()} items`;
  }

  updateCheckout();

  //#when click the delete option
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      removeFromCart(productId);

      //document.querySelector(`.js-cart-item-container-${productId}`).remove(); //.remove() remove a selected DOM element form page
      renderOrderSummary();
      updateCheckout();
      renderPaymentSummary();
    });
  });

  //#when click the update option
  document.querySelectorAll(".js-upadate-link").forEach((link) => {
    let updateClickCount = 0;
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      if (updateClickCount < 1) {
        link.innerHTML = "Save";

        document
          .querySelector(`.js-quantity-input-${productId}`)
          .classList.add("display-input");

        updateClickCount++;
      } else {
        link.innerHTML = "Updated";

        document
          .querySelector(`.js-quantity-input-${productId}`)
          .classList.remove("display-input");

        let newQuantityInput = document.querySelector(
          `.js-quantity-input-${productId}`
        );
        let newQuantity = Number(newQuantityInput.value);

        if (newQuantity > 0) {
          //Quantity should not be lessthan 0
          upadteQuantity(productId, newQuantity); //upadte cartQuantity

          renderOrderSummary();
        }

        updateClickCount = 0;
        newQuantityInput.value = "";
        updateCheckout();
        renderPaymentSummary();
      }
    });
  });

  //When select a delivery option
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset; //Shorthand Property
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
