import  { useEffect, useState } from 'react';
import '../MarketDataPage.css';

const MarketDataPage = () => {

  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD") 
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch data", err));
  }, []);

  return (
    <div className="market-data">
      <h2>Global Currency Exchange Rates (Base: USD)</h2>
      {loading ? (
        <p>Loading market data...</p>
      ) : (
        <ul>
          <li>NGN (Naira): {rates.NGN}</li>
          <li>EUR (Euro): {rates.EUR}</li>
          <li>GBP (Pound): {rates.GBP}</li>
          <li>JPY (Yen): {rates.JPY}</li>
        </ul>
      )}
    </div>
  );

}

export default MarketDataPage;
    
  