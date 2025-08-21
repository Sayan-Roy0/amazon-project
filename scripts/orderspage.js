import { formatCurrency } from "../scripts/utils/money.js";
import { orders } from "../data/orders.js";
import { loadProductFetch } from "../data/products.js";
import { getProduct } from "../data/products.js";

//at first load the product from backend then use product details
async function renderOrders() {
  await loadProductFetch();

  let oredrItemsHtml = ``;

  orders.forEach((orderItem) => {
    oredrItemsHtml += `
         <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate(orderItem.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderItem.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItem.id}</div>
            </div>
          </div>

          <div class="order-details-grid">

            ${orderItems(orderItem)}
           
          </div>
        </div>
    `;
  });

  function orderItems(orderItem) {
    let html = ``;

    orderItem.products.forEach((product) => {
      try {
        const matchingProduct = getProduct(product.productId);

        html += `
       <div class="product-image-container">
              <img src=${matchingProduct.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
               ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryDate(product.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              
              <a href="index.html">
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
              </a>
              
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderItem.id}&productId=${
          product.productId
        }">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
  
      `;
      } catch (error) {
        console.log(error);
      }
    });
    return html;
  }

  document.querySelector(".js-order-grid").innerHTML = oredrItemsHtml;
}
renderOrders();

//Formatting the order date that came from backend
function orderDate(time) {
  let splitDate = time.split("T");

  let dateOfOrder = splitDate[0].split("-");

  let month = dateOfOrder[1];
  let day = dateOfOrder[2];

  return date(month, day);
}

//Adding each item delivery date
export function deliveryDate(time) {
  let splitDate = time.split("T");

  let dateOfOrder = splitDate[0].split("-");

  let month = dateOfOrder[1];
  let day = dateOfOrder[2];

  return date(month, day);
}

function date(month, day) {
  let date = ``;

  switch (month) {
    case "01":
      date = `January ${day}`;
      break;

    case "02":
      date = `February ${day}`;
      break;

    case "03":
      date = `March ${day}`;
      break;

    case "04":
      date = `April ${day}`;
      break;

    case "05":
      date = `May ${day}`;
      break;

    case "06":
      date = `June ${day}`;
      break;

    case "07":
      date = `July ${day}`;
      break;

    case "08":
      date = `August ${day}`;
      break;

    case "09":
      date = `September ${day}`;
      break;

    case "10":
      date = `October ${day}`;
      break;

    case "11":
      date = `November ${day}`;
      break;

    case "12":
      date = `December ${day}`;
  }

  return date;
}

