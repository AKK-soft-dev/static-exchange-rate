import { conversionRates } from "./data.js";

const currency1 = document.getElementById("currency1");
const currency2 = document.getElementById("currency2");
const baseCode1 = document.getElementById("basecode1");
const baseCode2 = document.getElementById("basecode2");
const status = document.getElementById("status");
const toFixed = document.getElementById("to-fixed");

Object.keys(conversionRates).forEach((baseCode) => {
  baseCode1.innerHTML += `<option value=${baseCode}>${baseCode}</option>`;
  baseCode2.innerHTML += `<option value=${baseCode}>${baseCode}</option>`;
});

const setStatus = (fromBaseCode, toBaseCode) => {
  status.innerHTML = `Converted <span class="text-warning fw-bold">${fromBaseCode}</span> to <span class="text-success fw-bold">${toBaseCode}</span>`;
};

setStatus(baseCode1.value, baseCode2.value);

const calculateExchangeRate = (from, to) => {
  const { fromBaseCode, fromValue } = from;
  console.log({ fromBaseCode, to });
  setStatus(fromBaseCode, to);
  return (
    (fromValue / conversionRates[fromBaseCode]) *
    conversionRates[to]
  ).toFixed(toFixed.value);
};

toFixed.addEventListener("input", (e) => {
  currency1.value = parseFloat(currency1.value).toFixed(e.target.value);
  currency2.value = parseFloat(currency2.value).toFixed(e.target.value);
});

currency1.addEventListener("input", (e) => {
  currency2.value = calculateExchangeRate(
    { fromBaseCode: baseCode1.value, fromValue: e.target.value },
    baseCode2.value
  );
});

currency2.addEventListener("input", (e) => {
  currency1.value = calculateExchangeRate(
    { fromBaseCode: baseCode2.value, fromValue: e.target.value },
    baseCode1.value
  );
});

baseCode1.addEventListener("change", (e) => {
  currency2.value = calculateExchangeRate(
    { fromBaseCode: baseCode1.value, fromValue: currency1.value },
    baseCode2.value
  );
});

baseCode2.addEventListener("change", (e) => {
  currency1.value = calculateExchangeRate(
    { fromBaseCode: baseCode2.value, fromValue: currency2.value },
    baseCode1.value
  );
});
