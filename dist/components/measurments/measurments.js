import React, {useContext, useState, useEffect} from "../../../_snowpack/pkg/react.js";
import "./measurments.style.css.proxy.js";
import AirQualityContext from "../../context/AirQualityContext.js";
import {FetchUtils} from "../../utils/FetchUtils.js";
import {humanizer} from "../../../_snowpack/pkg/humanize-duration.js";
export function MeasurementsComponent() {
  const {selectedCities, updateCities} = useContext(AirQualityContext);
  const [latestData, setLatestData] = useState([]);
  function loadLatestMeasurments() {
    Promise.all(Array.from(selectedCities).map(FetchUtils.getLatestMeasurments)).then((arr) => arr.map((r) => r.results.shift()).filter((l) => !!l)).then((arr) => {
      if (!arr || arr.length == 0) {
        throw "No data";
      } else {
        return arr;
      }
    }).then(setLatestData).catch(() => {
      setLatestData([]);
    });
  }
  function removeCity(city) {
    const cities = selectedCities.filter((s) => !(s == city));
    updateCities(cities);
  }
  useEffect(loadLatestMeasurments, [selectedCities]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "component--measurments"
  }, latestData.map((data, idx) => {
    const props = {data, removeCity};
    return /* @__PURE__ */ React.createElement(LastMeasurmentEntry, {
      ...props,
      key: `data-${idx}`
    });
  }));
}
function LastMeasurmentEntry(props) {
  const {texts} = useContext(AirQualityContext);
  function removeCity(e) {
    props.removeCity(props.data.city);
  }
  const countryName = texts.countryName;
  return /* @__PURE__ */ React.createElement("div", {
    className: "latest-measurment"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "close",
    role: "button",
    onClick: removeCity
  }), /* @__PURE__ */ React.createElement("span", {
    className: "duration"
  }, "Updated ", calculateLastUpdate(props.data.measurements), " ago"), /* @__PURE__ */ React.createElement("span", {
    className: "place-name"
  }, props.data.location), /* @__PURE__ */ React.createElement("span", {
    className: "city-name"
  }, `in ${props.data.city}, ${countryName[props.data.country]}`), /* @__PURE__ */ React.createElement(MeasurmentsResults, {
    measurments: props.data.measurements
  }));
}
function calculateLastUpdate(measurements) {
  const hd = humanizer({largest: 1});
  const now = new Date();
  const date = measurements.map((m) => m.lastUpdated).sort().map((d) => new Date(d)).shift() ?? now;
  return hd(now.getTime() - date.getTime(), {largest: 1});
}
function MeasurmentsResults(props) {
  const {texts} = useContext(AirQualityContext);
  return /* @__PURE__ */ React.createElement("div", {
    className: "values"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "value-label"
  }, texts.values, ":"), /* @__PURE__ */ React.createElement("span", {
    className: "value"
  }, props.measurments.map(measurmentToValue).join(", ")));
}
function measurmentToValue(m) {
  return `${m.parameter}: ${m.value}`;
}
