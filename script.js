// Define the base URL for the API using the provided key
const BASE_URL = "https://v6.exchangerate-api.com/v6/61993be3fdf2724f36a51386/latest";

// Select elements from the DOM
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
const amountInput = document.querySelector(".amount input");
const convertButton = document.querySelector("form button");
const msg = document.querySelector(".msg");
const fromFlag = document.querySelector(".from img");
const toFlag = document.querySelector(".to img");

// Function to initialize the dropdown menus
function initializeDropdowns() {
  Object.entries(countryList).forEach(([code, country]) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = code;
    optionFrom.textContent = code;
    fromSelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = code;
    optionTo.textContent = code;
    toSelect.appendChild(optionTo);

    if (code === "USD") {
      optionFrom.selected = true;
      fromFlag.src = `https://flagcdn.com/w320/${country.toLowerCase()}.png`;
    }
    if (code === "INR") {
      optionTo.selected = true;
      toFlag.src = `https://flagcdn.com/w320/${country.toLowerCase()}.png`;
    }
  });
}

// Fetch and display exchange rates
async function updateExchangeRate() {
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;
  const amount = parseFloat(amountInput.value) || 1; // Default to 1 if input is invalid
  const url = `${BASE_URL}/${fromCurrency}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.conversion_rates[toCurrency];
    const result = (rate * amount).toFixed(2);
    msg.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
  } catch (error) {
    msg.textContent = "Error fetching exchange rate";
  }
}

// Update flags based on selected currency
function updateFlag(select, img) {
  const countryCode = countryList[select.value];
  img.src = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
}

// Event listeners
fromSelect.addEventListener("change", () => updateFlag(fromSelect, fromFlag));
toSelect.addEventListener("change", () => updateFlag(toSelect, toFlag));
convertButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangeRate();
});

// Initialize the dropdowns on page load
window.addEventListener('DOMContentLoaded', initializeDropdowns);