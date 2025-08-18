import Navbar from '../components/Navbar';
import '../AdvisoryPage.css';

const AdvisoryPage = () => {
  return (
    <>
      <Navbar />
      <div className="advisory">
        <h2>Personalized Investment Advice</h2>
        <p>
          We analyze stable markets and forecast the best returns for your investment goals.
        </p>
        <button className="advisory-btn">Get My Advice</button>
      </div>
    </>
  );
};

export default AdvisoryPage;
