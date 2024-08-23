import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
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
  const [serviceFirstName, setServiceFirstName] = useState("");
  const [serviceLastName, setServiceLastName] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [serviceCity, setServiceCity] = useState("");
  const [serviceState, setServiceState] = useState("");
  const [serviceZipCode, setServiceZipCode] = useState("");
  const [suggestedName, setSuggestedName] = useState("");
  const [suggestedAddress, setSuggestedAddress] = useState("");
  const [suggestedEmail, setSuggestedEmail] = useState("");
  const [suggestedPhoneNum, setSuggestedPhoneNum] = useState("");
  const [suggestedWebsite, setSuggestedWebsite] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [suggestedImage, setSuggestedImage] = useState(null);
  const [updateKey, setUpdateKey] = useState(Date.now());
  const { singleCounty, selectedLocation } = useCountyContext();
  const { dropOffs } = useDropOffContext();
  const { microhaulers } = useMicrohaulerContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  function goToCompostingTips() {
    navigate("/composting-tips");
  }
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
            Get Involved: Let's Bring Composting to your Community
          </h3>
          <button name="suggestions" className={shownItem === "suggestions" ? "collapse-button" : "expand-button"} onClick={expand}>
          </button>
        </div>
        <div className="OrganicsRecyclingInfo-Description">
          {shownItem == "suggestions" ?
            <>
              <form className="compostingForm" onSubmit={handleSubmit}>
                <div className="FourPillars-SectionHeading">Spot a Great Location for Composting?</div>
                <div>Name: <input className="formInput" type="text" value={suggestedName} onChange={e => setSuggestedName(e.target.value)} /></div>
                <div>Address: <input className="formInput" type="text" value={suggestedAddress} onChange={(e) => { setSuggestedAddress(e.target.value) }} /></div>
                <div>Email: <input className="formInput" type="text" value={suggestedEmail} onChange={(e) => { setSuggestedEmail(e.target.value) }} /></div>
                <div>Website: <input className="formInput" type="text" value={suggestedWebsite} onChange={(e) => { setSuggestedWebsite(e.target.value) }} /></div>
                <div>Phone Number: <input className="formInput" type="text" value={suggestedPhoneNum} onChange={(e) => { setSuggestedPhoneNum(e.target.value) }} /></div>
                <div>Image: <input className="formInputImage" type="file" key={updateKey} onChange={(e) => { setSuggestedImage(e.target.files[0]) }} /></div>
                <div>Help us find the best locations for composting bins or facilities in your neighborhood.</div>
                {suggestedImage && (
                  <div>
                    <img
                      alt="invalid image"
                      style={{ "width": "20rem" }}
                      src={URL.createObjectURL(suggestedImage)} />
                    <button onClick={(e) => { setSuggestedImage(null); setUpdateKey(Date.now()) }}>Remove Image</button>
                  </div>
                )}
                <button className="submit-button" type="submit">Submit</button>
              </form>
              <form className="compostingForm" onSubmit={handleSubmit}>
                <div className="FourPillars-SectionHeading">Would You Like Composting Services in Your Area?</div>
                <label>First Name: <input className="formInput" type="text" value={serviceFirstName} onChange={(e) => { setServiceFirstName(e.target.value) }} /></label>
                <label>Last Name: <input className="formInput" type="text" value={serviceLastName} onChange={(e) => { setServiceLastName(e.target.value) }} /></label>
                <label>Address: <input className="formInput" type="text" value={serviceAddress} onChange={(e) => { setServiceAddress(e.target.value) }} /></label>
                <label>City: <input className="formInput" type="text" value={serviceCity} onChange={(e) => { setServiceCity(e.target.value) }} /></label>
                <label>State: <input className="formInput" type="text" value={serviceState} onChange={(e) => { setServiceState(e.target.value) }} /></label>
                <label>Zip Code: <input className="formInput" type="text" value={serviceZipCode} onChange={(e) => { setServiceZipCode(e.target.value) }} /></label>
                <div>We'll use this information to identify areas with high demand for composting services</div>
                <button className="submit-button" type="submit">Submit</button>
              </form>
              <div className="FourPillars-SectionHeading">Take Action: Contact Your Local Representative</div>
              <button className="open-email-button" onClick={() => setShowEmail(true)}>
                Show
              </button>
              {/* start of moved contact dropdown */}
              {showEmail && createPortal(
                <div className="emailModal">
                  Take Action Now! Advocate for Composting in Your Community.<br />
                  Copy the sample email and send it to your Mayor.<br />

                  {">>>"}<br /><br />

                  Subject: Request for Composting Program in {serviceCity ? serviceCity : "[Your City]"}<br />
                  Dear Mayor [Mayor’s Last Name],<br /><br />
                  I am writing to request the implementation of a composting program in our community. As a resident of {serviceCity ? serviceCity : "[Your City]"}, I am committed to environmental sustainability and believe that a citywide composting solution would significantly reduce waste, lower greenhouse gas emissions, and provide valuable resources for local agriculture.
                  Many cities across the nation have successfully introduced composting initiatives, demonstrating the benefits of diverting organic waste from landfills. By adopting a similar approach, {serviceCity ? serviceCity : "[Your City]"} can lead in sustainability, reduce our environmental impact, and foster a culture of responsibility.
                  I urge you to consider the potential of curbside composting, community composting sites, or partnerships with local micro-haulers to make composting accessible to all residents. I am eager to support this initiative and am willing to assist in any capacity needed to bring this important program to life.
                  Thank you for your attention to this matter. I look forward to the possibility of discussing how we can move forward with this initiative.<br /><br />
                  Best regards,<br />
                  [Your Full Name]<br />
                  {serviceAddress ? serviceAddress : "[Your Address]"}<br />
                  {serviceCity ? serviceCity : "[Your City]"}, {serviceState ? serviceState : "[Your State]"} {serviceZipCode ? serviceZipCode : "[Your Zip Code]"}<br />

                  <button className="close-email-button" onClick={() => setShowEmail(false)}>Close</button>
                </div>, document.body
              )}
              {/* end of moved contact dropdown */}
            </>
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
              <h4 className="FourPillars-SectionHeading">Odor Control</h4>
              <div>
                Line your bins with newspaper and sprinkle baking soda on the lining to reduce odors.
                Create a mixture of tree oil and water, then spray it on your bins to tackle the odor problem effectively.
              </div>
              <button className="tips-button" onClick={goToCompostingTips}>See More</button>
            </div>
            : ""}
        </div>
      </div>
      {/* <div className="OrganicsRecyclingInfo-Section">
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
            <>
              <button onClick={() => setShowEmail(true)}>
                Sample Email
              </button>
              {showEmail && createPortal(
                <div className="emailModal">
                  Take Action Now! Advocate for Composting in Your Community.<br />
                  Download the sample email and send it to your Mayor.<br />

                  {">>>"}<br />

                  Subject: Request for Composting Program in [City]<br />
                  Dear Mayor [Mayor’s Last Name],<br /><br />
                  I am writing to request the implementation of a composting program in our community. As a resident of [City], I am committed to environmental sustainability and believe that a citywide composting solution would significantly reduce waste, lower greenhouse gas emissions, and provide valuable resources for local agriculture.
                  Many cities across the nation have successfully introduced composting initiatives, demonstrating the benefits of diverting organic waste from landfills. By adopting a similar approach, [City] can lead in sustainability, reduce our environmental impact, and foster a culture of responsibility.
                  I urge you to consider the potential of curbside composting, community composting sites, or partnerships with local micro-haulers to make composting accessible to all residents. I am eager to support this initiative and am willing to assist in any capacity needed to bring this important program to life.
                  Thank you for your attention to this matter. I look forward to the possibility of discussing how we can move forward with this initiative.<br></br>
                  Best regards,<br /><br />
                  [Your Full Name]<br />
                  [Your Address]<br />
                  [City, State, ZIP Code]<br />
                  [Your Phone Number]<br />

                  <button onClick={() => setShowEmail(false)}>Close</button>
                </div>, document.body
              )}
            </>
            : ""}
        </div>
      </div> */}
    </div>
  )
}
