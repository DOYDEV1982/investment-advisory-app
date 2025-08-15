import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../AnalyticsPage.css";

const AnalyticsPage = () => {
  const [exchangeData, setExchangeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const API_KEY = "0V5R2FSY4WSVYRFB";

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=NGN&apikey=${API_KEY.trim()}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data["Time Series FX (Daily)"]) {
          setExchangeData(data["Time Series FX (Daily)"]);
        } else {
          console.warn("Unexpected API response");
          setIsError(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching analytics data:", error);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Navbar end={true} />
      <div className="analytics-container">
        <h2>Currency Analytics (USD/NGN)</h2>

        {isLoading && <p>Loading data...</p>}
        {isError && <p>Error loading data. Please try again later.</p>}

        {!isLoading && exchangeData && (
          <ul className="analytics-list">
            {Object.entries(exchangeData)
              .sort((a, b) => new Date(b[0]) - new Date(a[0])) // newest first
              .slice(0, 10)
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