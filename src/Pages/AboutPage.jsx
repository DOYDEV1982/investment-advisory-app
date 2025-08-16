import Navbar from '../components/Navbar'
import '../AboutPage.css'

const AboutPage = () => {
  return (
      <>
    <Navbar />
    <div className="AboutPage">  
    <div className="about">
      <h2>About This App</h2>
      <p>This platform helps investors explore markets and make informed, profitable decisions based on global data.</p>
          <div className='button'>
            <button className='btn-black'>Contact Us</button>
          </div>
    </div>
    </div>
    </>
  );
};

export default AboutPage;