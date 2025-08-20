import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
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
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(10);
  const [currentValue, setCurrentValue] = useState(0);
  const [withdrawableCash, setWithdrawableCash] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("bamboo");
  const [transferMessage, setTransferMessage] = useState("");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setIsLoading(true);
        const API_KEY = "0V5R2FSY4WSVYRFB";
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data["Time Series (Daily)"]) {
          const entries = Object.entries(data["Time Series (Daily)"]).slice(
            0,
            days
          );

          const labels = entries.map(([date]) => date).reverse();
          const closes = entries
            .map(([, value]) => parseFloat(value["4. close"]))
            .reverse();

          const latestPrice = closes[closes.length - 1];
          setCurrentValue(latestPrice.toFixed(2));
          setWithdrawableCash((latestPrice * 0.8).toFixed(2)); // example rule: 80% withdrawable

          const progressive = closes.map((val, i, arr) =>
            i === 0 ? null : val > arr[i - 1] ? val : null
          );

          const decline = closes.map((val, i, arr) =>
            i === 0 ? null : val < arr[i - 1] ? val : null
          );

          const movingAverage = closes.map((val, i, arr) => {
            if (i < 4) return null;
            const slice = arr.slice(i - 4, i + 1);
            const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
            return avg;
          });

          setChartData({
            labels,
            datasets: [
              {
                label: "Closing Price 💰",
                data: closes,
                borderColor: "blue",
                backgroundColor: "lightblue",
                fill: false,
                tension: 0.3,
              },
              {
                label: "Progressive 📈",
                data: progressive,
                borderColor: "green",
                backgroundColor: "lightgreen",
                spanGaps: true,
                pointRadius: 5,
              },
              {
                label: "Decline 📉",
                data: decline,
                borderColor: "red",
                backgroundColor: "pink",
                spanGaps: true,
                pointRadius: 5,
              },
              {
                label: "5-Day Moving Avg 📊",
                data: movingAverage,
                borderColor: "gold",
                backgroundColor: "yellow",
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

  const handleTransfer = () => {
    if (withdrawableCash <= 0) {
      setTransferMessage("⚠️ No funds available to transfer.");
      return;
    }

    const transferAmount = withdrawableCash; // transfer all available
    setWithdrawableCash(0); // deduct all
    setTransferMessage(
      `✅ $${transferAmount} successfully transferred to ${selectedWallet.toUpperCase()} wallet.`
    );
  };

  if (isLoading) return <p>Loading stock overview...</p>;

  return (
    <>
    <Navbar/>
    <div style={{ width: "90%", margin: "auto", padding: "20px" }}>
      <h2>📊 Stock Market Overview</h2>

      {/* Balance Info */}
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Current Value:</strong> ${currentValue}
        </p>
        <p>
          <strong>Withdrawable Cash:</strong> ${withdrawableCash}
        </p>
      </div>

      {/* Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setDays(5)}>5 Days</button>
        <button onClick={() => setDays(10)}>10 Days</button>
        <button onClick={() => setDays(20)}>20 Days</button>
        <button onClick={() => setShowBreakdown(!showBreakdown)}>
          {showBreakdown ? "Hide Breakdown" : "View Breakdown"}
        </button>
        <button onClick={() => setShowTransfer(!showTransfer)}>
          {showTransfer ? "Cancel Transfer" : "Transfer Cash to Wallet"}
        </button>
      </div>

      {chartData && <Line data={chartData} />}

      {/* Breakdown Section */}
      {showBreakdown && (
        <div style={{ marginTop: "20px" }}>
          <h3>💡 Investment Breakdown</h3>
          <ul>
            <li>IBM Stock Performance Analysis</li>
            <li>Progressive (Green) shows gains 📈</li>
            <li>Decline (Red) shows losses 📉</li>
            <li>Moving Average (Gold) shows long-term trend 📊</li>
          </ul>
        </div>
      )}

      {/* Transfer Section */}
      {showTransfer && (
        <div style={{ marginTop: "20px" }}>
          <h3>💸 Transfer Cash to Wallet</h3>
          <p>
            Choose wallet to transfer withdrawable cash (${withdrawableCash}):
          </p>
          <select
            value={selectedWallet}
            onChange={(e) => setSelectedWallet(e.target.value)}
            style={{ marginRight: "10px" }}
          >
            <option value="bamboo">Bamboo</option>
            <option value="chipper">Chipper Cash</option>
            <option value="paypal">PayPal</option>
          </select>
          <button onClick={handleTransfer}>Confirm Transfer</button>

          {/* Transfer Result */}
          {transferMessage && (
            <p style={{ marginTop: "10px", color: "green" }}>
              {transferMessage}
            </p>
          )}
        </div>
      )}
    </div>
    <Footer /> 
    </>
  );
};

export default OverviewPage;
