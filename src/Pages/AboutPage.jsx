import Navbar from '../components/Navbar'
import Doydev from '../assets/doydev.png'
import '../AboutPage.css'

const AboutPage = () => {
  return (
      <>
    <Navbar />
    <div className="AboutPage">
      
    <div className="about">
      <h2>About This App</h2>
      <p>This platform helps investors explore markets and make informed, profitable decisions based on global data.</p>
    </div>
    </div>
    </>
  );
};

export default AboutPage;