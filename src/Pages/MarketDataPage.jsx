import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MarketDataPage = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
  const API_KEY = "0V5R2FSY4WSVYRFB";
        const response = await fetch(
          `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=EUR&apikey=${API_KEY}`
        );

        const data = await response.json();
        console.log("API Data:", data);

        if (data["Time Series FX (Daily)"]) {
          const days = 30; // number of days you want to display
          const entries = Object.entries(
            data["Time Series FX (Daily)"]
          ).slice(0, days);

          const labels = entries.map(([date]) => date).reverse();
          const values = entries
            .map(([, value]) => parseFloat(value["4. close"]))
            .reverse();

          setChartData({
            labels,
            datasets: [
              {
                label: "USD/EUR Exchange Rate",
                data: values,
                borderColor: "blue",
                backgroundColor: "lightblue",
                fill: true,
              },
            ],
          });
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading data...</p>;
  if (isError) return <p>Error loading market data.</p>;

  return (
    <div style={{ width: "80%", margin: "auto", padding: "20px" }}>
      <h2>Market Data</h2>
      <Line data={chartData} />
    </div>
  );
};

export default MarketDataPage;
