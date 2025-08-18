import { formatCurrency } from "../scripts/utils/money.js";

//Create a test suite
describe("test suite: formatCurrency", () => {
  //To create a test
  it("converts cents into dolors", () => {
    //takes a name of the test and a function what to test
    expect(formatCurrency(2095)).toEqual("20.95"); //same as =>  if (formatCurrency(2095) === "20.95")
  });

  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("rounds up to the nearest cent 2000.5", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });

  it("rounds up to the nearest cent 2000.4", ()=>{
    expect(formatCurrency(2000.4)).toEqual("20.00");
  })
});
