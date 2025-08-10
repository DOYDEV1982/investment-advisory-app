import Navbar from '../components/Navbar'
import Doydev from '../assets/doydev.png'
import './AboutPage.css'

const AboutPage = () => {
  return (
      <>
    <Navbar />
    <div className="AboutPage">
      <div className= "Logo" style={{display:"flex", justifyContent:"space-between", backgroundColor: "#0f0f0"}}>
      <img src= {Doydev} alt="Doydev Logo" style={{width:"100px", height:"100px"}}/>
      </div>
    <div className="about">
      <h2>About This App</h2>
      <p>This platform helps investors explore markets and make informed, profitable decisions based on global data.</p>
    </div>
    </div>
    </>
  );
};

export default AboutPage;