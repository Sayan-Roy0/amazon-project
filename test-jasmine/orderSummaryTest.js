import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../data/cart.js";
import { loadProducts, loadProductFetch } from "../data/products.js";

describe("test suit: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  //Hook
  //another Hooks, beforeEach() => runs code before each test
  //afterEach() => runs code after each test
  //beforeAll() => runs code before all tests
  //afterAll() => runs code after all tests
  beforeAll((done) => {
    loadProductFetch().then(() => {
      done();
    });

    /* loadProducts(() => {
      done();   //This done() is giving by jasmine to controll any operation here at first we need to wait for the response
    });*/
  });

  beforeEach(() => {
    spyOn(localStorage, "setItem"); //mock the localstorage because after delete the function use setItem and forthis reason we should mock the setItem to avoid modify the actual storage

    document.querySelector(
      ".js-test-container"
    ).innerHTML = `<div class="js-order-summary"></div>
    <div class="js-return-to-home-link"></div>
    <div class="js-payment-summary"></div>
    <div class="product-name"></div>
    <div class="product-price"></div>
    
      `; //creating the element that need in renderOrderSummary() function  to add HTML

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();

    renderOrderSummary();
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    ); //check is there ".js-cart-item-container" this class are two as every time the function renderOrderSummary() add a the class

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain(`Quantity: 2`); //check is there Quantity: 2 on the page

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual("Intermediate Size Basketball"); //Is the name display correctly

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs"); //Is the name display correctly

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain("$"); //it check is the price has $ sign infornt
  });

  //////

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click(); //this is the code for click the button with code click()

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    ); //now there should be one item in cart

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null); //This test will pass as the selected element is deleted so it should be null

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null); // This test will pass as the selected element is not deleted so it should be not null

    expect(cart.length).toEqual(1); //after delete the cart array should have only one item

    expect(cart[0].productId).toEqual(productId2); //and the remaining item id should be this

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual("Intermediate Size Basketball"); //Is the name display correctly
  });

  it("update the delivery option", () => {});

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = ""; //to remove those HTML from page after this text to look clean
  });
});
