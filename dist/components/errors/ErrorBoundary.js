import React from "../../../_snowpack/pkg/react.js";
export class ErrorBoundary extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {hasError: false};
  }
  static getDerivedStateFromError(error) {
    return {hasError: true};
  }
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ React.createElement("h1", null, `Something went wrong in ${this.props.for}. Inspect the stack-trace, please!`);
    }
    return this.props.children;
  }
}
