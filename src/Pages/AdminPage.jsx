import Navbar from '../components/Navbar'
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer'
import '../AdminPage.css'

const AdminPage = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <>
    <Navbar />
    <section className="hero-office">
  <div className="hero-card">
    <h1>Investment Advisory App</h1>
    <p>Insights into stable and profitable markets worldwide.</p>
    <button className="btn-cta">Get Started</button>
  </div>
</section>
    <div className="footer">
      <p>&copy; 2025 Global Investment Advisory. All rights reserved.</p>
    </div>
      <header className="admin-header">
        <h1>Dashboard</h1>
        <div className="admin-options">
        <Link to="/market-data" className="admin-card">
          <h3>📈 Market Data</h3>
          <p>View live exchange rates, currency trends, and investment suggestions.</p>
        </Link>
        <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-card">
          <h2>Market Insights</h2>
          <p>View global trends, currency fluctuations, and investment tips based on market stability.</p>
          <button onClick={() => navigate('/marketdata')}>Go to Market Data</button>
        </section>

        <section className="admin-card">
          <h2>User Analytics</h2>
          <p>Track user interests, region-specific trends, and investment behavior.</p>
          <button onClick={() => navigate('/User Analytics')}>Go to User Analytics Page</button>
          <h3>👤 User Management</h3>
          <p>Control access and manage user data securely.</p>
          <button onClick={() => navigate('/User Management')}>Go to User Mangement Page</button>
        </section>

        <section className="admin-card">
          <h2>Update Advisory Tips</h2>
          <p>Upload daily advice for stable or risky investment paths globally.</p>
          <button onClick={() => navigate('/Advisory Tips')}>Go to Advisory Page</button>
        </section>
      </main>
      <Footer /> 
    </>

  );
};

export default AdminPage;
