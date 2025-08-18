import { getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import { deliveryDate } from "./orderspage.js";
import { loadProductFetch } from "../data/products.js";

let orderId;
let productId;
let matchingOrder;
let matchingProductFromOrder;

async function renderTrackingPage() {
  await loadProductFetch();

  //geting a parameter out from the url
  const url = new URL(window.location.href); //To get the parameters out of the url. (window.location.href) it will givethe url of the page from top
  orderId = url.searchParams.get("orderId"); //.searchParams will give the parameter inside the url
  productId = url.searchParams.get("productId");

  const matchingProduct = getProduct(productId);

  //Getting matching order
  orders.forEach((order) => {
    if (orderId === order.id) {
      matchingOrder = order;

      //Getting matching product from order list
      order.products.forEach((product) => {
        if (productId === product.productId) {
          matchingProductFromOrder = product;
        }
      });
    }
  });

  let html = `
  <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDate(
            matchingProductFromOrder.estimatedDeliveryTime
          )}
        </div>

        <div class="product-info">
         ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProductFromOrder.quantity}
        </div>

        <img class="product-image" src=${matchingProduct.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
  `;

  document.querySelector(".js-main").innerHTML = html;
}

renderTrackingPage();
