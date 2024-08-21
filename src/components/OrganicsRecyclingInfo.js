import { useState, useEffect } from "react";
import guideIcon from "../assets/guideIcon.png";
import solutionIcon from "../assets/solutionIcon.png";
import facilityIcon from "../assets/facilityIcon.png";
import faqIcon from "../assets/faqIcon.png";
import helpIcon from "../assets/helpIcon.png";
import axios from 'axios';
import { useCountyContext } from "./countyProvider";
import { CountyProvider } from "./countyProvider";
import { useDropOffContext } from "./dropOffProvider";
import { useMicrohaulerContext } from "./microhaulerProvider";
import FourPillarsDescription from "./FourPillarsDescription";
const zipToCountyId = {
  "10458": 4,

};

export default function OrganicsRecyclingInfo({ address }) {
  const [shownItem, setShownItem] = useState("pillars");
  const [suggestedName, setSuggestedName] = useState("");
  const [suggestedAddress, setSuggestedAddress] = useState("");
  const [suggestedEmail, setSuggestedEmail] = useState("");
  const [suggestedPhoneNum, setSuggestedPhoneNum] = useState("");
  const [suggestedWebsite, setSuggestedWebsite] = useState("");
  const { singleCounty, selectedLocation } = useCountyContext();
  const { dropOffs } = useDropOffContext();
  const { microhaulers } = useMicrohaulerContext();

  const [error, setError] = useState(null);

  function expand(event) {
    if (shownItem == event.target.name) {
      console.log("shownItem", shownItem);
      setShownItem("");
    }
    else {
      setShownItem(event.target.name);
    }
  }
  // everytime a user clicks a marker on the map::
  //wheather it be a smartBin or dropoff -> setShownItem("solution");

  function handleSubmit(event) {
    event.preventDefault();
    //insert POST
  }

  useEffect(() => {
    if (Object.keys(selectedLocation).length !== 0) {
      console.log("selectedLocation", selectedLocation)
      setShownItem("solution");
    }
  }, [selectedLocation])

  return (
    <div className="OrganicsRecyclingInfo">
      <div className="OrganicsRecyclingInfo-Section">
        <div > Showing results for:</div>
        <div className="OrganicsRecyclingInfo-Address">
          {address}
        </div>
        <div className="OrganicsRecyclingInfo-Description">
          {(singleCounty.comLaw === "no" && singleCounty.resLaw === "no") ? "There are no recycling laws in your area"
            : !(singleCounty.comLaw === "no" && singleCounty.resLaw === "no") ?
              <div>There are
                <a className="OrganicsRecyclingInfo-DescriptionLink" href={`${singleCounty.resLaw}`} target="_blank">
                  &nbsp;residential&nbsp;
                </a>
                and
                <a className="OrganicsRecyclingInfo-DescriptionLink" href={`${singleCounty.comLaw}`} target="_blank">
                  &nbsp;commercial&nbsp;
                </a>
                composting laws in your area
              </div>
              : (singleCounty.comLaw) ?
                <div>
                  There are
                  <a className="OrganicsRecyclingInfo-DescriptionLink" href={`${singleCounty.comLaw}`} target="_blank">
                    &nbsp;commercial&nbsp;
                  </a>
                  composting laws in your area
                </div>
                : (singleCounty.resLaw) ?
                  <div>
                    There are
                    <a className="OrganicsRecyclingInfo-DescriptionLink" href={`${singleCounty.comLaw}`} target="_blank">
                      &nbsp;residential&nbsp;
                    </a>
                    composting laws in your area
                  </div>
                  : ""}
        </div>
      </div>
      <div className="OrganicsRecyclingInfo-Section">
        <div className="OrganicsRecyclingInfo-Dropdown">
          <img className="OrganicsRecyclingInfo-Icon" src={facilityIcon}></img>
          <h3 className="OrganicsRecyclingInfo-Header">
            Microhaulers Near You ({microhaulers.length})
          </h3>
          <button name="facility" className={shownItem === "facility" ? "collapse-button" : "expand-button"} onClick={expand}>
          </button>
        </div>
        <div className="OrganicsRecyclingInfo-Description">
          {shownItem == "facility" ? <>{microhaulers.map((microhauler) => (
            <div key={microhauler.id}> 
            <p className="OrganicsRecyclingInfo-DescriptionName">{microhauler.name}</p>
              <p>{microhauler.address ? <div><span className="OrganicsRecyclingInfo-DescriptionLabel">Address: </span>{microhauler.address}</div> : ""}</p>
              <p>{microhauler.website ? <div><span className="OrganicsRecyclingInfo-DescriptionLabel">Website: </span>{microhauler.website}</div> : ""}</p>
              <p>{microhauler.email ? <div><span className="OrganicsRecyclingInfo-DescriptionLabel">Email: </span>{microhauler.email}</div> : ""}</p>
              <p>{microhauler.phoneNum ? <div><span className="OrganicsRecyclingInfo-DescriptionLabel">Phone Number: </span>{microhauler.phoneNum}</div> : ""}</p>
          </div>
          ))}</> : ""}
        </div>
      </div>
      <div className="OrganicsRecyclingInfo-Section">
        <div className="OrganicsRecyclingInfo-Dropdown">
          <img className="OrganicsRecyclingInfo-Icon" src={solutionIcon}></img>
          <h3 className="OrganicsRecyclingInfo-Header">
            Select a Composting Solution Near You
          </h3>
          <button name="solution" className={shownItem === "solution" ? "collapse-button" : "expand-button"} onClick={expand}>
          </button>
        </div>
        <div className="OrganicsRecyclingInfo-Description">
          {shownItem == "solution" ?
            (selectedLocation !== null ?
              (<>
                <p>{selectedLocation.name}</p>
                <p>{selectedLocation.address ? `Address: ${selectedLocation.address}` : ""}</p>
                <p>{selectedLocation.website ? `Website: ${selectedLocation.website}` : ""}</p>
                <p>{selectedLocation.email ? `Email: ${selectedLocation.email}` : ""}</p>
                <p>{selectedLocation.phoneNum ? `Phone Number: ${selectedLocation.phoneNum}` : ""}</p>
                <p>{selectedLocation.monthOpen ? `Months Open: ${selectedLocation.monthOpen}` : ""}</p>
                <p>{selectedLocation.timeOpen ? `Time Open: ${selectedLocation.timeOpen}` : ""}</p>
              </>)
              :
              "No location selected")
            :
            ""}
        </div>
      </div>
      <div className="OrganicsRecyclingInfo-Section">
        <div className="OrganicsRecyclingInfo-Dropdown">
          <img className="OrganicsRecyclingInfo-Icon" src={guideIcon}></img>
          <h3 className="OrganicsRecyclingInfo-Header">
            What are the Composting Solutions?
          </h3>
          <button name="pillars" className={shownItem === "pillars" ? "collapse-button" : "expand-button"} onClick={expand}>
          </button>
        </div>
        <div className="OrganicsRecyclingInfo-Description">
          {shownItem == "pillars" ? <FourPillarsDescription /> : ""}
        </div>
      </div>
      <div className="OrganicsRecyclingInfo-Section">
        <div className="OrganicsRecyclingInfo-Dropdown">
          <img className="OrganicsRecyclingInfo-Icon" src={faqIcon}></img>
          <h3 className="OrganicsRecyclingInfo-Header">
            Don't see your spot? Let us know!
          </h3>
          <button name="suggestions" className={shownItem === "suggestions" ? "collapse-button" : "expand-button"} onClick={expand}>
          </button>
        </div>
        <div className="OrganicsRecyclingInfo-Description">
          {shownItem == "suggestions" ?
            <form onSubmit={handleSubmit}>
              <div>Name: <input type="text" value={suggestedName} onChange={e => setSuggestedName(e.target.value)} /></div>
              <div>Address: <input type="text" value={suggestedAddress} onChange={(e) => { setSuggestedAddress(e.target.value) }} /></div>
              <div>Email: <input type="text" value={suggestedEmail} onChange={(e) => { setSuggestedEmail(e.target.value) }} /></div>
              <div>Website: <input type="text" value={suggestedWebsite} onChange={(e) => { setSuggestedWebsite(e.target.value) }} /></div>
              <div>Phone Number: <input type="text" value={suggestedPhoneNum} onChange={(e) => { setSuggestedPhoneNum(e.target.value) }} /></div>
              <button className="search-button" type="submit">Submit</button>
            </form>
            : ""}
        </div>
      </div>
      <div className="OrganicsRecyclingInfo-Section">
        <div className="OrganicsRecyclingInfo-Dropdown">
          <img className="OrganicsRecyclingInfo-Icon" src={faqIcon}></img>
          <h3 className="OrganicsRecyclingInfo-Header">
            Composting Tips
          </h3>
          <button name="tips" className={shownItem === "tips" ? "collapse-button" : "expand-button"} onClick={expand}>
          </button>
        </div>
        <div className="OrganicsRecyclingInfo-Description">
          {shownItem == "tips" ?
            <div>
              <h4>Odor Control</h4>
              Line your bins with newspaper and sprinkle baking soda on the lining to reduce odors.
              Create a mixture of tree oil and water, then spray it on your bins to tackle the odor problem effectively.
            </div>
            : ""}
        </div>
      </div>
      <div className="OrganicsRecyclingInfo-Section">
        <div className="OrganicsRecyclingInfo-Dropdown">
          <img className="OrganicsRecyclingInfo-Icon" src={faqIcon}></img>
          <h3 className="OrganicsRecyclingInfo-Header">
            No services in your area? Contact your representative!
          </h3>
          <button name="contact" className={shownItem === "contact" ? "collapse-button" : "expand-button"} onClick={expand}>
          </button>
        </div>
        <div className="OrganicsRecyclingInfo-Description">
          {shownItem == "contact" ?
            "Insert link here"
            : ""}
        </div>
      </div>
    </div>
  )
}
