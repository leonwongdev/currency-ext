document.addEventListener("DOMContentLoaded", function () {
  const exchangeRateInput = document.getElementById("exchangeRate");
  const currencyTypeSelect = document.getElementById("currencyType");
  const saveButton = document.getElementById("saveButton");

  // Restore saved options
  chrome.storage.sync.get(["exchangeRate", "currencyType"], function (result) {
    exchangeRateInput.value = result.exchangeRate || 6.79; // Default value
    currencyTypeSelect.value = result.currencyType || "HKD"; // Default value
  });

  // Save options when Save button is clicked
  saveButton.addEventListener("click", function () {
    const exchangeRate = parseFloat(exchangeRateInput.value);
    const currencyType = currencyTypeSelect.value;
    chrome.storage.sync.set({ exchangeRate, currencyType });
  });
});
