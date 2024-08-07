import USAMap from "react-usa-map";

export default function USStates() {
  function makeConfig() {
    const strong = "#e6daf3";
    const moderate = "#c0eaf6";
    const weak = "#ffe79e";

    return {
      "VT": {
        fill: strong,
      },
      "CA": {
        fill: strong,
      },
      "WA": {
        fill: moderate,
      },
      "MA": {
        fill: moderate,
      },
      "NH": {
        fill: weak,
      },
      "NY": {
        fill: weak,
      },
      "OR": {
        fill: weak,
      },
      "CO": {
        fill: weak,
      },
      "MD": {
        fill: weak,
      },
      "HI": {
        fill: weak,
      },
      "NJ": {
        fill: weak,
      },
      "MN": {
        fill: weak,
      },
      "WI": {
        fill: weak,
      },
      "TX": {
        fill: weak,
      },
      "RI": {
        fill: weak,
      },
      "CT": {
        fill: weak,
      },
    }
  }
  const stateConfig = makeConfig()
  return (
    <USAMap defaultFill={"#606073"} customize={stateConfig}/>
  )
}

