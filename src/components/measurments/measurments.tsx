import React, { useContext, useState, useEffect, MouseEvent } from "react"
import "./measurments.style.scss"
import AirQualityContext from "../../context/AirQualityContext";
import { LatestData, Measurement } from "../../model/MeasurmentsModel";
import { FetchUtils } from "../../utils/FetchUtils";
import  {humanizer}  from "humanize-duration";
import { string } from "prop-types";

export function MeasurementsComponent():JSX.Element{
    const {selectedCities,updateCities} = useContext(AirQualityContext);
    const [latestData,setLatestData] = useState([] as Array<LatestData>);

    function loadLatestMeasurments(){
        Promise.all(Array.from(selectedCities).map(FetchUtils.getLatestMeasurments))
            .then(arr => arr.map(r => r.results.shift()))
            .then(arr =>{
                 if(!arr || arr.length == 0){
                     throw "No data"
                    }
                    else
                    {
                        return arr;
                    }
                })
            .then(ld => ld.filter(i => !!i))
            .then(setLatestData).catch(()=>{setLatestData([] as LatestData[])});
    } 
   
    function removeCity(city:string){
        const cities = selectedCities.filter(s =>!(s==city))
        updateCities(cities);
    }
    useEffect(loadLatestMeasurments,[selectedCities]);
    return <div className="component--measurments">{
        latestData.map((data,idx) =>{
            const props = {data,removeCity}
            return (<LastMeasurmentEntry {...props} key={`data-${idx}`} />)
        } )
    }
    </div>;
}

type LastMeasurmentEntryProps = {
    data: LatestData;
    removeCity: (city:string)=>void
}

function LastMeasurmentEntry(props:LastMeasurmentEntryProps):JSX.Element {
    const {texts} = useContext(AirQualityContext);

    function removeCity(e:MouseEvent<HTMLDivElement>) {
        props.removeCity(props.data.city);
    }
    const countryName = texts.countryName as {[key:string]:string};
    return (<div className="latest-measurment" >
        <div className="close" role="button" onClick={removeCity}/>
        <span className="duration">Updated {calculateLastUpdate(props.data.measurements)} ago</span>
        <span className="place-name">{props.data.location}</span>
        <span className="city-name">{`in ${props.data.city}, ${countryName[props.data.country]}`}</span>
        <MeasurmentsResults measurments={props.data.measurements} />
    </div>);
}

function calculateLastUpdate(measurements:Measurement[]):string {
    const hd = humanizer({largest: 1});
    const now:Date = new Date;
    const date:Date =new Date(measurements.map(m => m.lastUpdated).sort().shift());
    return hd(now.getTime() - date.getTime(), { largest: 1 });
}

function MeasurmentsResults(props:{measurments:Measurement[]}):JSX.Element {
    const {texts} = useContext(AirQualityContext);
    return (<div className="values"><span className="value-label">{texts.values}:</span><span className="value">{props.measurments.map(measurmentToValue).join(", ")}</span></div>);
}

function measurmentToValue(m:Measurement):string {
    return `${m.parameter}: ${m.value}`;
}