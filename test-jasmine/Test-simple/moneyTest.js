//Automatic test code for function formatCurrency()

//2 Type of test cases
//1. Basic test cases = test if the code is working
//2. Edge cases = test with values that are tricky

import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: formatCurrency");

//Basic test cases
console.log("converts cents into dolors");
if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

//Edge cases
console.log("works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds up to the nearest cent 2000.5");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds up to the nearest cent 2000.4");
if (formatCurrency(2000.4) === "20.00") {
  console.log("passed");
} else {
  console.log("failed");
}
