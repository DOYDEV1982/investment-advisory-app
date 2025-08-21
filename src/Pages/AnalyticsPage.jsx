import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../AnalyticsPage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const [exchangeData, setExchangeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const API_KEY = "0V5R2FSY4WSVYRFB";

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=NGN&apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data["Time Series FX (Daily)"]) {
          const parsed = Object.entries(data["Time Series FX (Daily)"])
            .slice(0, 15)
            .map(([date, values]) => ({
              date,
              close: parseFloat(values["4. close"]),
            }))
            .reverse();
          setExchangeData(parsed);
        } else {
          setIsError(true);
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // Chart data
  const labels = exchangeData.map((d) => d.date);
  const closes = exchangeData.map((d) => d.close);

  const chartData = {
    labels,
    datasets: [
      {
        label: "USD/NGN Close Price",
        data: closes,
        borderColor: (ctx) => {
          const index = ctx.dataIndex;
          if (index === 0) return "gray";
          return closes[index] > closes[index - 1] ? "green" : "red";
        },
        backgroundColor: "rgba(11, 28, 57, 0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "USD/NGN Trend (Last 15 Days)" },
    },
    scales: {
      x: { ticks: { maxRotation: 90, minRotation: 45 } },
      y: { beginAtZero: false },
    },
  };

  return (
    <>
      <Navbar />
      <div className="analytics-container">
        <h2>Currency Analytics (USD/NGN)</h2>

        {isLoading && <p>Loading data...</p>}
        {isError && <p>Error loading data.</p>}

        {!isLoading && !isError && (
          <>
            {/* Chart */}
            <div className="chart-wrapper">
              <Line data={chartData} options={chartOptions} />
            </div>

            {/* Table */}
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Closing Price</th>
                  <th>Change</th>
                  <th>% Change</th>
                </tr>
              </thead>
              <tbody>
                {exchangeData.map((d, i) => {
                  let change = null;
                  let percentChange = null;
                  if (i > 0) {
                    change = d.close - exchangeData[i - 1].close;
                    percentChange = (change / exchangeData[i - 1].close) * 100;
                  }

                  let arrow = "";
                  if (percentChange > 0) arrow = "↑";
                  else if (percentChange < 0) arrow = "↓";
                  else arrow = "→";

                  // 🔹 Row background based on trend
                  const rowStyle = {
                    backgroundColor:
                      percentChange > 0
                        ? "rgba(0, 128, 0, 0.1)" // light green
                        : percentChange < 0
                        ? "rgba(255, 0, 0, 0.1)" // light red
                        : "rgba(128, 128, 128, 0.1)", // light gray
                  };

                  return (
                    <tr key={i} style={rowStyle}>
                      <td>{d.date}</td>
                      <td>{d.close.toFixed(2)}</td>
                      <td
                        style={{
                          color: change > 0 ? "green" : change < 0 ? "red" : "gray",
                        }}
                      >
                        {change !== null ? change.toFixed(2) : "–"}
                      </td>
                      <td
                        style={{
                          color:
                            percentChange > 0
                              ? "green"
                              : percentChange < 0
                              ? "red"
                              : "gray",
                          fontWeight: "bold",
                        }}
                      >
                        {percentChange !== null
                          ? `${percentChange.toFixed(2)}% ${arrow}`
                          : "–"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
     <Footer />
    </>
  );
};

export default AnalyticsPage;
