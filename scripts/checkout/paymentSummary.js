import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const matchingItem = getProduct(cartItem.productId);
    productPriceCents += matchingItem.priceCents * cartItem.quantity;

    const matchingDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += matchingDeliveryOption.priceCents;
  });

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalPriceCents = totalBeforeTax + taxCents;
  const cartQuantity = calculateCartQuantity();

  const paymentSummaryHTML = `
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalPriceCents
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  //When click place order button
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      //when we click this button, make a request to the backend to create the order
      //GET = get something from the backend
      //POST = create something
      //PUT = update something

      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", //it tell backend what kind of data we send
          },
          body: JSON.stringify({
            cart: cart,
          }),
        }); //to send data to backend we need to add an object with the request

        const order = await response.json(); //it also a promise

        addOrder(order);
        // console.log(order);
      } catch (error) {
        console.log("unexpected error. Try again later.");
      }

      //to controll the url of the page on top

      window.location.href = "orders.html"; //href give the current url of the page, and chenging it will go to the given file path
    });
}
