import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../ExchangeRatePage.css";

const ExchangeRatePage = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [rate, setRate] = useState(null);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/abbc5fefb2289fd29713455a/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data.conversion_rates));
        setRate(data.conversion_rates[toCurrency]);
      });
  }, [toCurrency]);

  useEffect(() => {
    if (rate && amount) {
      setConvertedAmount((amount * rate).toFixed(2));
    }
  }, [rate, amount, toCurrency]);

  return (
    <>
      <Navbar />
      <div className="market-data">
        <h2>Currency Exchange Rate</h2>

        {/* Dropdowns */}
        <div className="dropdowns">
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency}>{currency}</option>
            ))}
          </select>

          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div className="amount-box">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        {/* Result */}
        {convertedAmount && (
          <div className="exchange-result">
            <p>
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ExchangeRatePage;
