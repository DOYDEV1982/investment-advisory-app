import {useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";
import "../WatchlistPage.css";

const WatchlistPage = () => {
  const [watchList, setWatchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  let apikey = '9XiDt6ct1mTGMIhVEFuOgUGFV6CxZDJZ';
  
  useEffect(() => {
    const apiUrl = `https://financialmodelingprep.com/stable/search-symbol?query=AAPL&apikey=${apikey}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setWatchList(data);
      })
      .catch(error => {
        console.error('Error fetching watchlist:', error);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // 🔥 Handle remove
  const handleRemove = (symbol) => {
    setWatchList(prevList => prevList.filter(item => item.symbol !== symbol));
  };

  return (
    <>
      <Navbar />
      <div className="watchlist-page">
        <h2>Stock Watchlist</h2>
        {isLoading ? (
          <p>Loading data...</p>
        ) : isError ? (
          <p>Error loading watchlist. Please try again later.</p>
        ) : watchList.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <ul className="watchlist-items">
            {watchList.map((item, index) => (
              <li key={index}>
                <div className="watchlist-card">
                  <span>{item.symbol} - {item.name} ({item.currency})</span>
                  <button 
                    className="remove-btn" 
                    onClick={() => handleRemove(item.symbol)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WatchlistPage;
