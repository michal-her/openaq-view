import React, {useState} from "../../_snowpack/pkg/react.js";
import AirQualityContext, {texts} from "../context/AirQualityContext.js";
import {Header} from "./header/Header.js";
import {CitySelector} from "./city-selector/CitySelector.js";
import {MeasurementsComponent} from "./measurments/measurments.js";
import {ErrorBoundary} from "./errors/ErrorBoundary.js";
function updateCitiesDecorator(updateCities) {
  return (cities) => {
    window.localStorage.setItem("cities", JSON.stringify(cities));
    updateCities(cities);
  };
}
function initCities() {
  const cities = JSON.parse(window.localStorage.getItem("cities") ?? "[]") || [];
  return cities;
}
export function App() {
  const [selectedCities, updateCities] = useState(initCities());
  const initialState = {
    texts,
    selectedCities,
    updateCities: updateCitiesDecorator(updateCities)
  };
  return /* @__PURE__ */ React.createElement(AirQualityContext.Provider, {
    value: initialState
  }, /* @__PURE__ */ React.createElement(ErrorBoundary, null, /* @__PURE__ */ React.createElement(MainComponent, null)));
}
function MainComponent() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement(CitySelector, null), /* @__PURE__ */ React.createElement(MeasurementsComponent, null), /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("span", null, "The data from the page ", /* @__PURE__ */ React.createElement("a", {
    href: "https://www.openaq.org"
  }, "openaq.org"))));
}
