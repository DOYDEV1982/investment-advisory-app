import {useState,  useEffect } from "react";
import Navbar from '../components/Navbar'
import "../ExchangeRatePage.css";

const ExchangeRatePage = () => {
  
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [rate, setRate] = useState(null);

  useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/abbc5fefb2289fd29713455a/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data.conversion_rates));
        setRate(data.conversion_rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  return (
    <>
    <Navbar />
    <div className="market-data">
      <h2>Currency Exchange Rate</h2>
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
      {rate && (
        <div className="exchange-result">
          <p>1 {fromCurrency} = {rate} {toCurrency}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default ExchangeRatePage;