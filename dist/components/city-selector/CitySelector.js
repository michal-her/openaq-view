import React, {useContext, useState, useEffect} from "../../../snowpack/pkg/react.js";
import "./CitySelector.style.css.proxy.js";
import AirQualityContext, {texts} from "../../context/AirQualityContext.js";
import {Select} from "../Select/Select.js";
import {FetchUtils} from "../../utils/FetchUtils.js";
export function CitySelector() {
  const {texts: {selectCity}, selectedCities, updateCities} = useContext(AirQualityContext);
  const [items, setItems] = useState([]);
  function citySelected(value, label) {
    const ci = new Set(selectedCities);
    ci.add(value);
    updateCities(Array.from(ci));
  }
  useEffect(() => {
    const cities = initCities();
    cities.then((items2) => setItems(items2.map((c) => {
      return {label: c.city, value: c.city};
    })));
  }, [1]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "info"
  }, selectCity), /* @__PURE__ */ React.createElement(Select, {
    selected: "",
    data: {selected: "", items},
    onSelect: citySelected,
    filteringEnabled: true,
    showSelected: false,
    placeholder: texts.selectCityPlaceholder
  }));
}
async function initCities() {
  const cities = FetchUtils.getCities();
  const j = await cities;
  return j.results;
}
