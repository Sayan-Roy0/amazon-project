import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
} from "../data/cart.js";

/*describe("test suite: addTocart", () => {
  it("adds an existing product to the cart", () => {
    //addTocart does not return so we can't use expect()

    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      //mocked load item from storage
      return JSON.stringify([
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();

    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart.length).toEqual(1); //when we add a product to cart the cart length should be 1
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //it check is the setItem method or save to localStorage call one time while call the addTocart function
    //it will work only when we mock the setItem method
    expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d"); //Check is the first item is this
    expect(cart[0].quantity).toEqual(2); //Check is the first item quantity is 1
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem"); //mocked setItem

    spyOn(localStorage, "getItem").and.callFake(() => {
      //mocked load item from storage
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart.length).toEqual(1); //when we add a product to cart the cart length should be 1
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //it check is the setItem method or save to localStorage call one time while call the addTocart function
    //it will work only when we mock the setItem method
    expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d"); //Check is the first item is this
    expect(cart[0].quantity).toEqual(1); //Check is the first item quantity is 1
  });
});*/

describe("test suite: removeFromCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      //mocked load item from storage
      return JSON.stringify([
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();
  });

  it("Remove a product that is in the cart", () => {
    expect(cart.length).toEqual(2);

    removeFromCart("15b6fc6f-327a-4ec4-896f-486349e85a3d"); //Remove this item from the cart
    removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.length).toEqual(0);

    expect(localStorage.setItem).toHaveBeenCalledTimes(2); //as we called removeFromCart function two times here
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([])
    );
  });

  it("Remove a product that is not in the cart", () => {
    expect(cart.length).toEqual(2);

    removeFromCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e"); //  Not in the cart so the function should do nothing

    expect(cart.length).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ])
    );   //Because here no any ite is removed
  });
});
