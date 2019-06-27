import React, { useContext, useState, useEffect } from "react";
import "./CitySelector.style.scss";
import AirQualityContext, { texts } from "../../context/AirQualityContext";
import { Select, SelectDataItem } from "../Select/Select";
import { FetchUtils } from "../../utils/FetchUtils";


export function CitySelector():JSX.Element  {
    const {texts:{selectCity},selectedCities,updateCities} = useContext(AirQualityContext);
    const [items,setItems] = useState([] as Array<SelectDataItem>);

     function citySelected(value:string, label:string) {
         const ci = new Set(selectedCities);
         ci.add(value)
        updateCities(Array.from(ci));
    }


    useEffect(() => {
        const cities = initCities();
        cities.then(items => setItems(items.map(c =>{return {label:c.city, value:c.city}})))
    },[1])

    return <>
        <span className="info">{selectCity}</span>
        <Select selected="" data={{selected:"",items:items}} onSelect={citySelected} filteringEnabled={true} 
                showSelected={false} placeholder={texts.selectCityPlaceholder}
        />
    </>;
}

async function initCities() {
   const cities = FetchUtils.getCities();
   const j = await cities;
    return j.results;
}





