import React, { useContext } from "react";
import AirQualityContext from "../../context/AirQualityContext";
import "./header.style.scss";


export function Header():JSX.Element {
    const {texts}= useContext(AirQualityContext);
    return <div className="component--header"><h1>{texts.headline}</h1>
    <span>{texts.intro}</span>
     </div>
}