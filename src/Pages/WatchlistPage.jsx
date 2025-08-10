import React, { useEffect} from 'react'
import { useState } from 'react'
import './Watchlist.css'



const WatchlistPage = () => {

  const [watchList, setWatchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  useEffect(() => {

     fetch('https://financialmodelingprep.com/developer/docs/')
      .then(response => response.json())
      .then(data => setWatchList(data))
      .catch(Error => {
        console.error('Error fetching watch:`, error');
        setIsError(true);
      })

      .finally(() => setIsLoading(false));
      

      }, );
      
        
  return (
    <div className="watchlist-page">
      <h2>Currency Watchlist</h2>
      {isLoading ? <p>Loading rates...</p> : (
        <ul className="watchlist-items">
          {Object.entries(watchList.rates || {}).map(([currency, rate]) => (
            <li key={currency}>
              {currency}: {rate}
            </li>
          ))}
        </ul>
      )}
      {isError && <p>Error loading watchlist.</p>}
    <div className="watchlist-page">
      <h2>Currency Watchlist</h2>
      {loading ? <p>Loading rates...</p> : (
        <ul className="watchlist-items">
          {watchlist.map((item, index) => (
            <li key={index}>
              {item.currency}: {item.trend}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default WatchlistPage;


                   