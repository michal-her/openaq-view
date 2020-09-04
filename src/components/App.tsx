import React, { useContext, useState } from "react";
import AirQualityContext, { AirQualityContextType, texts } from "../context/AirQualityContext";
import { Header } from "./header/Header";
import { CitySelector } from "./city-selector/CitySelector";
import { MeasurementsComponent } from "./measurments/measurments";
import { ErrorBoundary } from "./errors/ErrorBoundary";

function updateCitiesDecorator(updateCities:(cities:Array<string>)=>void): (cities:Array<string>)=>void {
    return (cities:Array<string>) => {
        window.localStorage.setItem("cities",JSON.stringify(cities));
        updateCities(cities);
    }
}

function initCities(){
    const cities:string[] = JSON.parse(window.localStorage.getItem("cities")) || [] 
    return cities;
}

export function App():JSX.Element {
    const [selectedCities, updateCities] = useState(initCities());
    const initialState:AirQualityContextType = {
        texts,
        selectedCities,
        updateCities:updateCitiesDecorator(updateCities)
    };
    return (
        <AirQualityContext.Provider value={initialState}>
        <ErrorBoundary>
            <MainComponent/>
        </ErrorBoundary>
        </AirQualityContext.Provider>)
    ;
}


function MainComponent():JSX.Element {
    return <>
    <Header/>
    <CitySelector/>
    <MeasurementsComponent/>
    </>
}

