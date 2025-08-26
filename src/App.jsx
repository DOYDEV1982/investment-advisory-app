import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import OverviewPage from './Pages/OverviewPage'
import AdminPage from './Pages/AdminPage'
import AboutPage from './Pages/AboutPage'
import AnalyticsPage from './Pages/AnalyticsPage'
import ExchangeRatePage from './Pages/ExchangeRatePage'
import MarketDataPage from './Pages/MarketDataPage'
import AdvisoryPage from './Pages/AdvisoryPage'
import WatchListPage from './Pages/WatchlistPage'
import StockMarketPage from './Pages/StockMarketPage'
import CryptoMarketPage from './Pages/CryptoMarketPage'
import ProfilePage from './Pages/ProfilePage'

function App()  {

  return (
      <Router>
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/exchange-rate" element={<ExchangeRatePage />} />
            <Route path="/market-data" element={<MarketDataPage />} />
            <Route path="/advisory" element={<AdvisoryPage />} /> 
            <Route path="/watch-list" element={<WatchListPage />} />
            <Route path="/stockmarket" element={<StockMarketPage />} />
             <Route path="/cryptomarket" element={<CryptoMarketPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
          </Routes>
      </Router>
  )
}

export default App;





