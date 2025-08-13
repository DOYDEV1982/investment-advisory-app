import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../AnalyticsPage.css";

const AnalyticsPage = () => {
  const [exchangeData, setExchangeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const API_KEY = "";

  useEffect(() => {
    // If no API key yet, skip fetching and show placeholder data

    
    if (!API_KEY) {
      console.warn("No API key found. Using placeholder data.");
      setExchangeData({
        "2025-08-10": { "1. open": "1600.00", "4. close": "1625.00" },
        "2025-08-09": { "1. open": "1585.00", "4. close": "1600.00" },
        "2025-08-08": { "1. open": "1570.00", "4. close": "1585.00" },
        "2025-08-07": { "1. open": "1555.00", "4. close": "1570.00" },
        "2025-08-06": { "1. open": "1540.00", "4. close": "1555.00" }
      });
      setIsLoading(false);
      return;
    }

    // Future real fetch when you have API key
    fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=NGN&apikey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setExchangeData(data["Time Series FX (Daily)"]))
      .catch((error) => {
        console.error("Error fetching analytics data:", error);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="analytics-container">
        <h2>Currency Analytics (USD/NGN)</h2>

        {isLoading && <p>Loading data...</p>}
        {isError && <p>Error loading data. Please try again later.</p>}

        {!isLoading && !isError && exchangeData && (
          <ul className="analytics-list">
            {Object.entries(exchangeData)
              .slice(0, 5)
              .map(([date, values]) => (
                <li key={date}>
                  {date}: Open - {values["1. open"]} | Close - {values["4. close"]}
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AnalyticsPage;
