import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const LiveMarketChartPage = () => {
  const [chartData, setChartData] = useState({});
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toCurrency, setToCurrency] = useState("NGN"); // default market

  const API_KEY = "0V5R2FSY4WSVYRFB";

  const fetchData = () => {
    fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=${toCurrency}&apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data["Time Series FX (Daily)"]) {
          const entries = Object.entries(data["Time Series FX (Daily)"])
            .slice(0, 15) // last 15 days
            .reverse();

          const dates = entries.map(([date]) => date);
          const closes = entries.map(([_, values]) => parseFloat(values["4. close"]));
          const opens = entries.map(([_, values]) => parseFloat(values["1. open"]));

          setLabels(dates);
          setChartData({
            labels: dates,
            datasets: [
              {
                label: `USD/${toCurrency} Closing Price`,
                data: closes,
                borderColor: "#0B1C39",
                backgroundColor: "#0B1C39",
                tension: 0.4,
              },
              {
                label: `USD/${toCurrency} Opening Price`,
                data: opens,
                borderColor: "#FFD700",
                backgroundColor: "#FFD700",
                borderDash: [5, 5],
                tension: 0.4,
              },
            ],
          });
        }
      })
      .catch((err) => console.error("Error fetching FX data:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(); // fetch immediately
    const interval = setInterval(fetchData, 60000); // refresh every 1 min
    return () => clearInterval(interval);
  }, [toCurrency]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 2000, easing: "easeOutQuart" },
    plugins: {
      legend: {
        labels: { color: "#0B1C39" },
      },
      tooltip: {
        backgroundColor: "#0B1C39",
        titleColor: "#FFD700",
        bodyColor: "#F5DEB3",
      },
    },
    scales: {
      x: { ticks: { color: "#0B1C39" } },
      y: { ticks: { color: "#0B1C39" } },
    },
  };

  return (
    <>
    <Navbar />
    <div style={{ width: "100%", height: "450px", padding: "1rem" }}>
      <h3 style={{ color: "#0B1C39" }}>Global Market Trends (Live)</h3>

      {/* Currency Selector */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem", fontWeight: "bold" }}>
          Select Market:
        </label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={{
            padding: "0.4rem",
            border: "1px solid #0B1C39",
            borderRadius: "5px",
            backgroundColor: "#F5DEB3",
            color: "#0B1C39",
            fontWeight: "bold",
          }}
        >
          <option value="NGN">USD/NGN</option>
          <option value="EUR">USD/EUR</option>
          <option value="GBP">USD/GBP</option>
          <option value="JPY">USD/JPY</option>
          <option value="CAD">USD/CAD</option>
        </select>
      </div>

      {/* Chart */}
      {loading ? <p>Loading...</p> : <Line data={chartData} options={options} />}
    </div>
     <Footer />
    </>
  );
};

export default LiveMarketChartPage;

    
  

