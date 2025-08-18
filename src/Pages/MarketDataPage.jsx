import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../MarketDataPage.css";

const MarketDataPage = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success" && data.rates) {
          setRates(data.rates);
        } else {
          throw new Error("Unexpected API format");
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // Pick 10+ key currencies
  const selectedCurrencies = [
    "NGN", "EUR", "GBP", "JPY", "CAD",
    "AUD", "CNY", "INR", "BRL", "ZAR",
    "KES", "CHF"
  ];

  return (
    <>
      <Navbar />
      <div className="market-data">
        <h2>Global Currency Exchange Rates (Base: USD)</h2>

        {loading && <p>Loading market data...</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

        {!loading && !error && rates && (
          <div className="currency-grid">
            {selectedCurrencies.map((currency) => (
              <div className="currency-card" key={currency}>
                <h3>{currency}</h3>
                <p>{rates[currency]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MarketDataPage;
