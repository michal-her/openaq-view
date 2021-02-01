// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@import url(\"https://fonts.googleapis.com/css?family=Merriweather:400,700,900|Roboto:100i,300,300i,400,400i,500,500i,700,700i&subset=latin-ext\");\n:root {\n  --main-font-color: white;\n}\n\nbody {\n  background: #7737af;\n  background: linear-gradient(90deg, #7737af 0%, #6154ae 50%, #3f79ae 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n}\n\n#app {\n  padding: 2rem 0;\n  font-family: \"Roboto\", serif;\n  font-weight: lighter;\n  color: var(--main-font-color, white);\n  font-size: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-direction: column;\n}\n#app > * {\n  padding-bottom: 2rem;\n}\n\nfooter a, footer a:visited {\n  color: var(--main-font-color, white);\n  text-decoration: none;\n  font-weight: 400;\n}\n\n[role=button] {\n  cursor: pointer;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}