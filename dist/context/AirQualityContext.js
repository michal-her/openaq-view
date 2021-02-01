import React from "../../_snowpack/pkg/react.js";
export const texts = {
  headline: "Compare your Air",
  intro: "Compare the air quality between cities in the UK.",
  selectCity: "Select cities to compare using the search tool below.",
  selectCityPlaceholder: "Enter city name...",
  countryName: {
    GB: "United Kingdom",
    PL: "Poland"
  },
  values: "Values"
};
export const initialState = {
  texts,
  selectedCities: [],
  updateCities: () => {
  }
};
const AirQualityContext = React.createContext(initialState);
export const AirQualityContextProvider = AirQualityContext.Provider;
export const AirQualityContextConsumer = AirQualityContext.Consumer;
export default AirQualityContext;
