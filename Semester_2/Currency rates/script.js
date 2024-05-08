function getExchangeRates() {
  fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
    .then((response) => response.json())
    .then((data) => {
      const rates = data.reduce((acc, val) => {
        acc[val.cc] = val.rate;
        return acc;
      }, {});

      let table = document.getElementById("table");
      const exchangeRatesElement = document.getElementById("exchange-rates");
      exchangeRatesElement.innerHTML = "";

      console.log(rates);

      for (const currency in rates) {
        table.innerHTML += `<tr><td>${currency}</td><td>${rates[currency]}</td></tr>`;
      }
    })
    .catch((error) => {
      console.error("Помилка отримання курсу валют:", error);
    });
}

setInterval(getExchangeRates, 5000);
getExchangeRates();
