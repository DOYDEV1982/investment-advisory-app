import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

const timeframes = [
  { label: "7 Days", value: "7" },
  { label: "30 Days", value: "30" },
  { label: "90 Days", value: "90" },
  { label: "1 Year", value: "365" },
];

const ITEMS_PER_PAGE = 6; // 👈 coins per page

const CryptoMarketPage = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [pricesData, setPricesData] = useState({});
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState("7");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ Fetch top 50 coins
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
        );
        const data = await res.json();
        const mappedCoins = data.map((coin, i) => ({
          id: coin.id,
          name: `${coin.name} (${coin.symbol.toUpperCase()})`,
          color: `hsl(${(i * 40) % 360}, 70%, 50%)`,
        }));
        setCoins(mappedCoins);
      } catch (err) {
        console.error("Error fetching coin list:", err);
      }
    };
    fetchCoins();
  }, []);

  // ✅ Search filter
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCoins.length / ITEMS_PER_PAGE);
  const paginatedCoins = filteredCoins.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleCoin = (coinId) => {
    if (selectedCoins.includes(coinId)) {
      setSelectedCoins(selectedCoins.filter((id) => id !== coinId));
    } else {
      setSelectedCoins([...selectedCoins, coinId]);
    }
  };

  const toggleAll = () => {
    if (selectedCoins.length === filteredCoins.length) {
      setSelectedCoins([]);
    } else {
      setSelectedCoins(filteredCoins.map((c) => c.id));
    }
  };

  // ✅ Fetch prices
  useEffect(() => {
    const fetchPrices = async () => {
      if (selectedCoins.length === 0) return;
      setLoading(true);

      try {
        const requests = selectedCoins.map((coinId) =>
          fetch(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
          ).then((res) => res.json())
        );

        const results = await Promise.all(requests);
        const dataObj = {};

        results.forEach((result, index) => {
          const coinId = selectedCoins[index];
          dataObj[coinId] = result.prices.map((p) => p[1]);
        });

        setPricesData(dataObj);
      } catch (err) {
        console.error("Error fetching coin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [selectedCoins, days]);

  const labels = Array.from(
    { length: pricesData[Object.keys(pricesData)[0]]?.length || 0 },
    (_, i) => `Day ${i + 1}`
  );

  return (
    <>
    <Navbar/>
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Crypto Market Comparison</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search coin (e.g. BTC, Ethereum)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset to page 1 when searching
          }}
          className="w-full px-4 py-2 border rounded-lg shadow"
        />
      </div>

      {/* Timeframe Selector */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Select Timeframe:</label>
        <select
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="px-3 py-2 border rounded-lg shadow"
        >
          {timeframes.map((tf) => (
            <option key={tf.value} value={tf.value}>
              {tf.label}
            </option>
          ))}
        </select>
      </div>

      {/* Toggle All */}
      <button
        onClick={toggleAll}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
      >
        {selectedCoins.length === filteredCoins.length
          ? "Deselect All"
          : "Select All"}
      </button>

      {/* Coin Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {paginatedCoins.map((coin) => (
          <button
            key={coin.id}
            onClick={() => toggleCoin(coin.id)}
            className={`px-4 py-2 rounded-lg shadow ${
              selectedCoins.includes(coin.id)
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {coin.name}
          </button>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      

      {/* Chart */}
      {loading ? (
        <p className="text-gray-500">Loading data...</p>
      ) : selectedCoins.length > 0 ? (
        <Line
          data={{
            labels,
            datasets: selectedCoins.map((coinId, i) => {
              const coin = coins.find((c) => c.id === coinId);
              return {
                label: coin?.name,
                data: pricesData[coinId] || [],
                borderColor: coin?.color || "blue",
                fill: false,
                tension: 0.3,
              };
            }),
          }}
        />
      ) : (
        <p className="text-gray-600">Select at least one coin to view chart</p>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default CryptoMarketPage;
