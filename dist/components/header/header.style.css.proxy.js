// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@media (max-width: 992px) {\n  .component--header {\n    font-size: 14pt;\n  }\n}\n.component--header h1 {\n  font-weight: bolder;\n  font-family: \"Merriweather\", sans-serif;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}