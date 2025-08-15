import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../WatchlistPage.css';

const WatchlistPage = () => {
  const [watchList, setWatchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  let apikey='9XiDt6ct1mTGMIhVEFuOgUGFV6CxZDJZ'
  
  useEffect(() => {
    // Use a CORS proxy for development (replace with actual API in production if CORS is allowed)
    const apiUrl = 'https://financialmodelingprep.com/stable/search-symbol?query=AAPL&apikey=9XiDt6ct1mTGMIhVEFuOgUGFV6CxZDJZ';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        console.log(data); // Log to inspect the API response
        setWatchList(data);
      })
      .catch(error => {
        console.error('Error fetching watchlist:', error);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []); // Fixed dependency array

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
                {item.symbol} - {item.name} ({item.currency})
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default WatchlistPage;