import React from 'react'

type Translation = {
    [key:string]:string|Translation
}

export type AirQualityContextType = {
    texts: Translation;
    selectedCities:Array<string>;
    updateCities: (cities:Array<string>) => void;
}
export const texts = {
    headline: "Compare your Air",
    intro: "Compare the air quality between cities in the UK.",
    selectCity:"Select cities to compare using the search tool below.",
    selectCityPlaceholder:"Enter city name...",
    countryName:{
      "GB":  "United Kingdom",
      "PL":"Poland",
    },
    values:"Values"
}
export const initialState:AirQualityContextType = {
    texts,
    selectedCities:[] as Array<string>,
    updateCities: () => {}
};
const AirQualityContext = React.createContext<AirQualityContextType>(initialState)
export const AirQualityContextProvider = AirQualityContext.Provider;
export const AirQualityContextConsumer = AirQualityContext.Consumer;
export default AirQualityContext;