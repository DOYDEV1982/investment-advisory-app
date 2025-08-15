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
        console.log("API Response:", data);
        if (data.result === "success" && data.rates) {
          setRates(data.rates);
        } else {
          throw new Error("Unexpected API format");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch data", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar /> 
      <div className="market-data">
        <h2>Global Currency Exchange Rates (Base: USD)</h2>

        {loading && <p>Loading market data...</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

        {!loading && !error && rates && (
          <ul>
            <li>NGN (Naira): {rates.NGN}</li>
            <li>EUR (Euro): {rates.EUR}</li>
            <li>GBP (Pound): {rates.GBP}</li>
            <li>JPY (Yen): {rates.JPY}</li>
          </ul>
        )}
      </div>
    </>
  );
};

export default MarketDataPage;