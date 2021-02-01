import * as React from "../../../snowpack/pkg/react.js";
import {Component} from "../../../snowpack/pkg/react.js";
import {Keys} from "./Select.js";
import debounce from "../../../snowpack/pkg/lodash/debounce.js";
class SelectSearch extends Component {
  constructor(props) {
    super(props);
    this._onKeyUp = (ev) => {
      if (ev.key === Keys.KEY_DOWN || ev.key === Keys.KEY_UP) {
        return;
      }
      this.setState({
        searchText: ev.target.value.toLowerCase()
      });
    };
    this._onArrowClick = () => {
      this.props.onClose();
    };
    this.state = {
      searchText: this.props.selected ? this.props.selected || "" : "",
      showSelected: false
    };
    this._debouncedFiltering = debounce(this._filterResults, 200);
  }
  componentDidUpdate() {
    this._debouncedFiltering();
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "bit-select__search"
    }, /* @__PURE__ */ React.createElement("input", {
      type: "text",
      className: "bit-select__search__input",
      placeholder: this.props.placeholder,
      onKeyUp: this._onKeyUp,
      autoFocus: true
    }));
  }
  _filterResults() {
    this.props.onSearch(this.state.searchText);
  }
}
export {SelectSearch};
