import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductFetch } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/car.js";
// import "../data/backend-practice.js";
import { loadCart } from "../data/cart.js";

//async await is a better way to work with asynchronous code
async function loadPage() {
  //async function return a promise

  try {
    //Here we put those code that can make an error
    //try catch is for handle errors for async await and also for normal code

    //throw "error1"; //Manually generating an error

    await loadProductFetch(); //await let us to wait for the promise to finish first before going for next

    await new Promise((resolve, reject) => {
      // throw "error2"; // another way to generate an error
      loadCart(() => {
        //wait for finish the loadCart() then call resolve and then go to the next step

        //  reject("error3"); //To make a error in future because inside this block these codes are run in future after finishing the loadCart()
        resolve();
      });
    });
  } catch (error) {
    //if try block give an error then run this catch block
    console.log("There is an error...!");
  }

  renderOrderSummary();
  renderPaymentSummary();

  //return "value2"; //if we return something here it will go for the next step and it can be accessed inside of a then
}
loadPage();

/*
//run all promise at a same time
Promise.all([
  //This will run multiple promises at a same time and wait for all promise to complete before going to next step

  loadProductFetch(), //it return a promise thats why we dont need any promise here inside promise all

  new Promise((resolve) => {
    loadCart(() => {
      //wait for finish the loadCart() then call resolve and then go to the next step
      resolve();
    });
  }),
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
//Promise is a class
new Promise((resolve) => {
  loadProducts(() => {
    resolve(); //Use to control when to go to the next step. here at first run loadProducts() then resolve() and then next step
  });
})
  .then(() => {
    //inside a then if we want to wait for some code to run then we can return a promise
    return new Promise((resolve) => {
      loadCart(() => {
        //wait for finish the loadCart() then call resolve and then go to the next step
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
*/

/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/
