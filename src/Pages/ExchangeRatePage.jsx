import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../ExchangeRatePage.css";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 🔹 Register Chart.js parts (like putting tools in your pencil case)
ChartJS.register(
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
const MarketChart = () => {
  // 📊 Example data: pretend we are comparing USD with other currencies
  const labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
  const usdToNgn = [1500, 1520, 1490, 1530, 1550]; // going up/down
  const usdToEur = [0.92, 0.91, 0.93, 0.90, 0.89]; // falling a bit

  // 🔹 Line Chart (showing the history over days)
  const lineData = {
    labels: labels,
    datasets: [
      {
        label: "USD to NGN",
        data: usdToNgn,
        borderColor: "green",
        backgroundColor: "lightgreen",
        tension: 0.4, // makes the line smooth
      },
      {
        label: "USD to EUR",
        data: usdToEur,
        borderColor: "blue",
        backgroundColor: "lightblue",
        tension: 0.4,
      },
    ],
  };

  // 🔹 Bar Chart (showing if things are going UP or DOWN)
  const barData = {
    labels: ["USD/NGN", "USD/EUR"],
    datasets: [
      {
        label: "Change (%)",
        data: [+5, -3], // NGN went up 5%, EUR went down 3%
        backgroundColor: ["green", "red"], // green = up, red = down
      },
    ],
  };

  const options = {
    responsive: true, // works on phone + big screen
    plugins: {
      legend: { labels: { color: "#0B1C39" } },
    },
    scales: {
      x: { ticks: { color: "#0B1C39" } },
      y: { ticks: { color: "#0B1C39" } },
    },
  };

  return (
    <div style={{ width: "100%", padding: "1rem" }}>
      <h2>📈 Market Trends</h2>
      <div style={{ height: "300px", marginBottom: "2rem" }}>
        <Line data={lineData} options={options} />
      </div>

      <h2>📊 Market Performance</h2>
      <div style={{ height: "300px" }}>
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
};

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
     

      <Footer />
    </>
  );
};

export default ExchangeRatePage;
