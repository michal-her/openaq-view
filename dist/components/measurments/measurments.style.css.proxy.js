// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".component--measurments {\n  width: 100vw;\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n}\n.component--measurments .latest-measurment {\n  margin: 1rem;\n  font-weight: normal;\n  max-width: 420px;\n  background: #ffffff;\n  color: #333333;\n  padding: 2rem;\n  display: flex;\n  flex-basis: 100%;\n  line-height: 2rem;\n  flex-direction: column;\n  justify-content: space-around;\n  position: relative;\n}\n.component--measurments .latest-measurment .place-name {\n  font-size: 25px;\n  color: #631ea0;\n  font-weight: bold;\n}\n.component--measurments .latest-measurment .values {\n  font-weight: bold;\n}\n.component--measurments .latest-measurment .value {\n  text-transform: uppercase;\n}\n.component--measurments .latest-measurment .duration {\n  text-transform: uppercase;\n  font-weight: bold;\n}\n.component--measurments .close {\n  position: absolute;\n  right: 32px;\n  top: 32px;\n  width: 32px;\n  height: 32px;\n  opacity: 0.8;\n}\n.component--measurments .close:hover {\n  opacity: 1;\n}\n.component--measurments .close:before, .component--measurments .close:after {\n  position: absolute;\n  left: 15px;\n  top: -20px;\n  content: \" \";\n  height: 33px;\n  width: 3px;\n  background-color: #333333;\n}\n.component--measurments .close:before {\n  transform: rotate(45deg);\n}\n.component--measurments .close:after {\n  transform: rotate(-45deg);\n}\n.component--measurments .close:active {\n  transform: scale(0.9);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}