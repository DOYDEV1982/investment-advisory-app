import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../AdvisoryPage.css';
import React, { useEffect, useState } from "react";
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

ChartJS.register(LineElement, PointElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdvisoryPage = () => {
  const [marketData, setMarketData] = useState({});
  const [overlayData, setOverlayData] = useState({});
  const [progressDeclineData, setProgressDeclineData] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedMarkets, setSelectedMarkets] = useState(["NGN", "EUR", "JPY"]);
  const [days, setDays] = useState(30);

  const API_KEY = "0V5R2FSY4WSVYRFB";

  const fetchData = (symbol, color) => {
    return fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=${symbol}&apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data["Time Series FX (Daily)"]) {
          const entries = Object.entries(data["Time Series FX (Daily)"])
            .slice(0, days)
            .reverse();

          const dates = entries.map(([date]) => date);
          const closes = entries.map(([_, values]) => parseFloat(values["4. close"]));

          const lastClose = closes[closes.length - 1];
          const prevClose = closes[0];
          const change = ((lastClose - prevClose) / prevClose) * 100;

          return {
            symbol,
            change,
            dataset: {
              label: `USD/${symbol}`,
              data: closes,
              borderColor: color,
              backgroundColor: color,
              tension: 0.4,
            },
            labels: dates,
            lastClose,
          };
        }
        return null;
      })
      .catch((err) => console.error(`Error fetching USD/${symbol}`, err));
  };

  useEffect(() => {
    setLoading(true);

    const colors = ["#0B1C39", "#FFD700", "#228B22", "#FF4500", "#1E90FF"]; // navy, gold, green, orange, blue
    Promise.all(selectedMarkets.map((m, i) => fetchData(m, colors[i % colors.length]))).then((results) => {
      const validResults = results.filter((r) => r);

      if (validResults.length > 0) {
        // Individual data
        const dataMap = {};
        validResults.forEach((res) => (dataMap[res.symbol] = res));
        setMarketData(dataMap);

        // Overlay chart
        setOverlayData({
          labels: validResults[0].labels,
          datasets: validResults.map((res) => res.dataset),
        });

        // Progressive vs Decline
        setProgressDeclineData({
          labels: validResults.map((r) => `USD/${r.symbol}`),
          datasets: [
            {
              label: "Change (%)",
              data: validResults.map((r) => r.change),
              backgroundColor: validResults.map((r) => (r.change >= 0 ? "green" : "red")),
            },
          ],
        });
      }

      setLoading(false);
    });
  }, [selectedMarkets, days]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#0B1C39" } },
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

  const toggleMarket = (symbol) => {
    setSelectedMarkets((prev) =>
      prev.includes(symbol) ? prev.filter((m) => m !== symbol) : [...prev, symbol]
    );
  };

  return (
    <>
      <Navbar />
    <div style={{ width: "100%", padding: "1rem" }}>
      <h2 style={{ color: "#0B1C39", marginBottom: "1rem" }}>
        🌍 USD Multi-Market Comparison
      </h2>

      {/* 🔹 Market selection */}
      <div style={{ marginBottom: "1rem" }}>
        {["NGN", "EUR", "GBP", "JPY", "CAD"].map((symbol) => (
          <button
            key={symbol}
            onClick={() => toggleMarket(symbol)}
            style={{
              marginRight: "0.5rem",
              padding: "0.5rem 1rem",
              background: selectedMarkets.includes(symbol) ? "#0B1C39" : "#F5DEB3",
              color: selectedMarkets.includes(symbol) ? "#FFD700" : "#0B1C39",
              border: "1px solid #0B1C39",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {symbol}
          </button>
        ))}
      </div>

      {/* 🔹 Days range */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem" }}>Range:</label>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* 🔹 Overlay comparison */}
      <div style={{ marginBottom: "2rem", height: "400px", background: "#F5DEB3", padding: "1rem", borderRadius: "10px" }}>
        <h4 style={{ color: "#0B1C39" }}>Overlay Comparison</h4>
        {loading ? <p>Loading overlay...</p> : <Line data={overlayData} options={options} />}
      </div>

      {/* 🔹 Progressive vs Decline */}
      <div style={{ height: "300px", background: "#F5DEB3", padding: "1rem", borderRadius: "10px" }}>
        <h4 style={{ color: "#0B1C39" }}>📊 Progressive vs Decline</h4>
        {loading ? <p>Loading...</p> : <Bar data={progressDeclineData} options={options} />}
      </div>
  return (
      <div className="advisory">
        <h2>Personalized Investment Advice</h2>
        <p>
          We analyze stable markets and forecast the best returns for your investment goals.
        </p>
        <button className="advisory-btn">Get My Advice</button>
      </div>
    </div>
 <Footer />
  </>
  );
};

export default AdvisoryPage;
