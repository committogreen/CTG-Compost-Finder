import { useNavigate } from "react-router-dom"

export default function CompostingTips() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/search/result")
  }
  
  return (
    <div className="Composting-Tips">
      Composting 101: Answers to All Your Questions<br/>
      Q+A on composting is listed here<br/>
      Basic information: https://committogreen.com/pages/composting-101-a-comprehensive-guide-to-what-you-can-and-cannot-compost<br/><br/>


      Tips and Tricks<br/>
      If you're facing problems like odor, pests, and slimy bins while composting in a brown bin, don't worry!<br/>
      Here are some expert tips to address your concerns and make composting a breeze.<br/><br/>
      Odor Control<br/>
      Line your bins with newspaper and sprinkle baking soda on the lining to reduce odors.<br/>
      Create a mixture of tree oil and water, then spray it on your bins to tackle the odor problem effectively.<br/><br/>
      Pest and Slimy Bin Solutions<br/>
      NYC brown bins come with a secure latch lid to keep pests like squirrels, rats, and possums away.<br/>
      Place half a wine cork in your bin to minimize fruit flies around it.<br/>
      Lining your bins with newspaper helps maintain cleanliness.<br/>
      Consider using compostable and biodegradable bag linings to keep your bins mess-free.<br/>
      Clean your bins with a mixture of water and vinegar to prevent sliminess.<br/><br/>
      Be a Smart Composter<br/>
      Opt for a reusable sac to transport your organic waste to the nearest Smart Compost Bins.<br/>
      Paper and compostable bags are convenient as they break down into compost.<br/>
      In conclusion, composting doesn't have to be unpleasant or smelly. With these expert tips and tricks, you'll become a composting pro in no time.<br/><br/>
      When the city agency signs on and has their own page, they will have specific organic waste for their program.<br/>
      <button className="tips-button" onClick={handleClick}>Go back</button>
    </div>
  )
}