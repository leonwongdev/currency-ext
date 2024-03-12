console.debug("Loaded Currency Converter: content.js");
// Function to convert currency
function convertCurrency(price) {
  // convert CAD to HKD
  const exchangeRate = 6 * 1.13;
  console.debug("Converting price:", price);
  return (
    (parseFloat(price.replace("$", "")) * exchangeRate).toFixed(2) +
    ` HKD (${price}) `
  );
}

// Find all elements containing "$" and convert their content
function convertPrices() {
  console.debug("Converting prices");
  const elements = document.querySelectorAll("*:not(script):not(style)");
  elements.forEach((element) => {
    if (
      element.childNodes.length === 1 &&
      element.childNodes[0].nodeType === Node.TEXT_NODE
    ) {
      const text = element.childNodes[0].nodeValue;
      if (text.includes("$")) {
        console.debug(element);
        const newText = text
          .replace(/\s/g, "")
          .replace(/\$\d+(\.\d{1,2})?/g, (match) => {
            return convertCurrency(match);
          });
        console.debug("newText:", newText);
        element.childNodes[0].nodeValue = newText;
      }
    }
  });
  console.debug("Prices converted");
}

// defer the execution of the function to allow the page to load
// setTimeout(convertPrices, 5000);
window.addEventListener("load", convertPrices);
