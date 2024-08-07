import pickupIcon from "../assets/pickupIcon.png";
import dropOffIcon from "../assets/dropOffIcon.png";
import microHaulerIcon from "../assets/microHaulerIcon.png";
import smartBinIcon from "../assets/smartBinIcon.png";

export default function FourPillarsDescription() {
  return (
    <div className="FourPillars-Container">
      <div className="FourPillars-Section">
        <div className="FourPillars-SectionHeader">
          <img className="FourPillars-Image" src={pickupIcon} />
          <div className="FourPillars-SectionHeading">Residential Pickup</div>
        </div>
        <div className="FourPillars-SectionDescription">
          Weekly curbside compost pick-up service for residents
        </div>
      </div>
      <div className="FourPillars-Section">
        <div className="FourPillars-SectionHeader">
          <img className="FourPillars-Image" src={dropOffIcon} />
          <div className="FourPillars-SectionHeading">Drop Off Locations</div>
        </div>
        <div className="FourPillars-SectionDescription">
          Bins setup in public spaces for residents to bring their food scraps to drop off.
        </div>
      </div>
      <div className="FourPillars-Section">
        <div className="FourPillars-SectionHeader">
          <img className="FourPillars-Image" src={microHaulerIcon} />
          <div className="FourPillars-SectionHeading">Micro-haulers</div>
        </div>
        <div className="FourPillars-SectionDescription">
          Local compost collection service for residents and businesses who pay for organic waste pick-up.
        </div>
      </div>
      <div className="FourPillars-Section">
        <div className="FourPillars-SectionHeader">
          <img className="FourPillars-Image" src={smartBinIcon} />
          <div className="FourPillars-SectionHeading">Smart Bins</div>
        </div>
        <div className="FourPillars-SectionDescription">
          A system located in an open space, accessible via app and integrated with a compost collection map.
        </div>
      </div>
    </div>
  )
}