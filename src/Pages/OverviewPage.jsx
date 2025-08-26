import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

const OverviewPage = () => {
  const [chartData, setChartData] = useState(null); // Stock
  const [cryptoData, setCryptoData] = useState(null); // Crypto
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(10);
  const [currentValue, setCurrentValue] = useState(0);
  const [withdrawableCash, setWithdrawableCash] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin"); // Default BTC
  const [currentCryptoPrice, setCurrentCryptoPrice] = useState(0);
  const [cryptoChange, setCryptoChange] = useState(0);

// ✅ Fetch Stock Data
useEffect(() => {
  const fetchStockData = async () => {
    try {
      setIsLoading(true);
      const API_KEY = "0V5R2FSY4WSVYRFB"; // keep your key
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data["Time Series (Daily)"]) {
        const entries = Object.entries(data["Time Series (Daily)"]).slice(0, days);
        const labels = entries.map(([date]) => date).reverse();
        const closes = entries.map(([, value]) => parseFloat(value["4. close"])).reverse();

        const latestPrice = closes[closes.length - 1];
        setCurrentValue(latestPrice.toFixed(2));
        setWithdrawableCash((latestPrice * 0.8).toFixed(2));

        const progressive = closes.map((val, i, arr) =>
          i === 0 ? null : val > arr[i - 1] ? val : null
        );

        const decline = closes.map((val, i, arr) =>
          i === 0 ? null : val < arr[i - 1] ? val : null
        );

        const movingAverage = closes.map((val, i, arr) => {
          if (i < 4) return null;
          const slice = arr.slice(i - 4, i + 1);
          return slice.reduce((a, b) => a + b, 0) / slice.length;
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Closing Price 💰",
              data: closes,
              borderColor: "#006400",
              backgroundColor: "#90EE90",
              fill: false,
              tension: 0.3,
            },
            {
              label: "Progressive 📈",
              data: progressive,
              borderColor: "#228B22",
              backgroundColor: "#98FB98",
              spanGaps: true,
              pointRadius: 5,
            },
            {
              label: "Decline 📉",
              data: decline,
              borderColor: "#8B0000",
              backgroundColor: "#FFC1C1",
              spanGaps: true,
              pointRadius: 5,
            },
            {
              label: "5-Day Moving Avg 📊",
              data: movingAverage,
              borderColor: "#FFD700",
              backgroundColor: "#FFFACD",
              fill: false,
              borderDash: [5, 5],
              tension: 0.3,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchStockData();
}, [days]);


  // ✅ Fetch Crypto Data
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart?vs_currency=usd&days=${days}`
        );
        const result = await response.json();

        if (result.prices) {
          const labels = result.prices.map((p) => new Date(p[0]).toLocaleDateString());
          const prices = result.prices.map((p) => p[1]);

          const latestPrice = prices[prices.length - 1];
          const firstPrice = prices[0];
          const percentChange = (((latestPrice - firstPrice) / firstPrice) * 100).toFixed(2);

          setCurrentCryptoPrice(latestPrice.toFixed(2));
          setCryptoChange(percentChange);

          const progressive = prices.map((val, i, arr) =>
            i === 0 ? null : val > arr[i - 1] ? val : null
          );

          const decline = prices.map((val, i, arr) =>
            i === 0 ? null : val < arr[i - 1] ? val : null
          );

          const movingAverage = prices.map((val, i, arr) => {
            if (i < 6) return null;
            const slice = arr.slice(i - 6, i + 1);
            return slice.reduce((a, b) => a + b, 0) / slice.length;
          });

          setCryptoData({
            labels,
            datasets: [
              {
                label: `${selectedCrypto.toUpperCase()} Price 💰`,
                data: prices,
                borderColor: "#006400",
                backgroundColor: "#90EE90",
                fill: false,
                tension: 0.3,
              },
              {
                label: "Progressive 📈",
                data: progressive,
                borderColor: "#228B22",
                backgroundColor: "#98FB98",
                spanGaps: true,
                pointRadius: 5,
              },
              {
                label: "Decline 📉",
                data: decline,
                borderColor: "#8B0000",
                backgroundColor: "#FFC1C1",
                spanGaps: true,
                pointRadius: 5,
              },
              {
                label: "7-Day Moving Avg 📊",
                data: movingAverage,
                borderColor: "#FFD700",
                backgroundColor: "#FFFACD",
                fill: false,
                borderDash: [5, 5],
                tension: 0.3,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, [days, selectedCrypto]);

  if (isLoading) return <p>Loading stock overview...</p>;

  return (
    <>
      <Navbar />
      <div style={{ width: "95%", margin: "auto", padding: "20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Stock Section */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#FFFDD0",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ color: "#006400" }}>📊 Stock Market Overview</h2>
            <p>
              <strong>Current Value:</strong> ${currentValue}
            </p>
            <p>
              <strong>Withdrawable Cash:</strong> ${withdrawableCash}
            </p>
            <div style={{ marginBottom: "15px" }}>
              <button onClick={() => setDays(5)}>5 Days</button>
              <button onClick={() => setDays(10)}>10 Days</button>
              <button onClick={() => setDays(20)}>20 Days</button>
            </div>
            {chartData && <Line data={chartData} />}
          </div>

          {/* Crypto Section */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#E6FFFA",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ color: "#006400" }}>💹 Crypto Market Overview</h2>
            <p>
              <strong>Current {selectedCrypto.toUpperCase()} Price:</strong> $
              {currentCryptoPrice}
            </p>
            <p>
              <strong>% Change ({days} days):</strong>{" "}
              <span style={{ color: cryptoChange >= 0 ? "green" : "red" }}>
                {cryptoChange}%
              </span>
            </p>
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              style={{ marginBottom: "15px", padding: "8px", borderRadius: "5px" }}
            >
              <option value="bitcoin">Bitcoin (BTC)</option>
              <option value="ethereum">Ethereum (ETH)</option>
              <option value="binancecoin">Binance Coin (BNB)</option>
              <option value="solana">Solana (SOL)</option>
              <option value="ripple">XRP</option>
              <option value="cardano">Cardano (ADA)</option>
              <option value="dogecoin">Dogecoin (DOGE)</option>
              <option value="polkadot">Polkadot (DOT)</option>
              <option value="tron">Tron (TRX)</option>
              <option value="matic-network">Polygon (MATIC)</option>
            </select>
            {cryptoData && <Line data={cryptoData} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OverviewPage;
