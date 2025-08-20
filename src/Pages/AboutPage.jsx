import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';   // ✅ Import Link
import '../AboutPage.css'

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="AboutPage">  
        <div className="about">
          <h2>About This App</h2>
          <p>
            This platform helps investors explore markets and make informed, profitable 
            decisions based on global data.
          </p>
          <div className="button">
            {/* ✅ Link instead of plain button */}
            <Link to="/profile" className="btn-black">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
