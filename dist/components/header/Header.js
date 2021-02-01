import React, {useContext} from "../../../_snowpack/pkg/react.js";
import AirQualityContext from "../../context/AirQualityContext.js";
import "./header.style.css.proxy.js";
export function Header() {
  const {texts} = useContext(AirQualityContext);
  return /* @__PURE__ */ React.createElement("div", {
    className: "component--header"
  }, /* @__PURE__ */ React.createElement("h1", null, texts.headline), /* @__PURE__ */ React.createElement("span", null, texts.intro));
}
