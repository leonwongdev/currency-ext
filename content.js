console.debug("Content script loaded");
// Function to convert currency
function convertCurrency(price, exchangeRate, currencyType) {
  console.debug("Converting price:", price);
  const convertedPrice = (
    parseFloat(price.replace("$", "")) * exchangeRate
  ).toFixed(2);
  return `${convertedPrice} ${currencyType} (${price})`;
}
function convertPrices(exchangeRate, currencyType) {
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
            return convertCurrency(match, exchangeRate, currencyType);
          });
        console.debug("newText:", newText);
        element.childNodes[0].nodeValue = newText;
      }
    }
  });
  console.debug("Prices converted");
}

function getOptions() {
  // Fetch options from Chrome storage
  console.debug("Fetching options");
  chrome.storage.sync.get(["exchangeRate", "currencyType"], function (result) {
    const { exchangeRate, currencyType } = result;
    console.log("exchangeRate:", exchangeRate);
    console.log("currencyType:", currencyType);
    if (exchangeRate && currencyType) {
      // Find all elements containing "$" and convert their content using options
      convertPrices(exchangeRate, currencyType);
    } else {
      console.debug("Options not found");
      // use default values
      convertPrices(6.79, "HKD");
    }
  });
}

// Execute conversion when window on load
window.onload = getOptions;
