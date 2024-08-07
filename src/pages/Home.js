import { Link } from "react-router-dom";
import homeIcon1 from "../assets/homeIcon1.png";
import homeIcon2 from "../assets/homeIcon2.png";
import homeIcon3 from "../assets/homeIcon3.png";

export default function Home() {
  return (
    <div className='home-page'>
      <header className="home-page-header header">
        <h1 className="home-page-header-heading">
          FIND COMPOSTING SOLUTIONS
        </h1>
        <p className="home-page-header-description">
          We provide a user-friendly online platform that simplifies the search for local composting solutions, making it easier to recycle food waste efficiently.
        </p>
      </header>
      <div className="infographic-container">
        <div className="infographic-item">
          <div className="infographic-image-wrapper">
          <img className="infographic-image" src={homeIcon1}/>
          </div>
          <div className="infographic-description">
            Every year, millions of tons of food waste end up in landfills, contributing to climate change.
            By composting, we can reduce greenhouse gas emissions and create nutrient-rich soil.
          </div>
        </div>
        <div className="infographic-item">
          <div className="infographic-image-wrapper">
            <img className="infographic-image" src={homeIcon2}/>
          </div>
          <div className="infographic-description">
            Local composting solutions are more accessible than ever.
            From curbside pick-up to community drop-off sites, finding a convenient way to recycle your food waste is just a few clicks away.
          </div>
        </div>
        <div className="infographic-item">
          <div className="infographic-image-wrapper">
          <img className="infographic-image" src={homeIcon3}/>
          </div>
          <div className="infographic-description">
            Join a growing movement of environmentally conscious individuals and businesses committed to sustainability.
            Together, we can make a significant impact by turning food waste into valuable resources.
          </div>
        </div>
      </div>
      <button className="start-button">
        <Link to="/search">
          Start Your Sustainability Journey
        </Link>
      </button>

    </div>
  )
}