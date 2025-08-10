import React, { useEffect } from 'react';
import { useState } from 'react'
import Navbar from '../components/Navbar'
import './AnalyticsPage.css';


const AnalyticsPage = () => {

  const [exchangeData, setExchangeData] = useState([null])
  const [isLoading, setIsLoading] = useState([true])
  const [isError, setIsError] = useState([false])

useEffect(() => {

     fetch('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=NGN&apikey=${API_KEY}')
      .then(response => response.json())
      .then(exchangedata => setExchangeData(exchangedata['Time Series FX (Daily)']))
      .catch(error => {
       console.error('Error fetching analytics data:', error);
       setIsError(true);
      })
      
      .finally(() => setIsLoading(false));
      
       }, );

  return (
    <>
    <Navbar />
    <div className="analytics-container">
      <h2>Currency Analytics (USD/NGN)</h2>
      {exchangeData ? (
        <ul className="analytics-list">
          {Object.entries(exchangeData).slice(0, 5).map(([date, values]) => (
            <li key={date}>
              {date}: Open - {values['1. open']} | Close - {values['4. close']}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
    </>
  );
};

export default AnalyticsPage;
