export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
  /*
                .toFixed() functionm convert the result into string and we can tell how many number we want after dot */
}

//Math.round() will fix the problem of
//8.005 = 8.00(wrong) => 8.01(right)
