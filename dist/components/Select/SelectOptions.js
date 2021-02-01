import * as React from "../../../_snowpack/pkg/react.js";
import {Component} from "../../../_snowpack/pkg/react.js";
import {Keys} from "./Select.js";
var Direction;
(function(Direction2) {
  Direction2[Direction2["Up"] = 38] = "Up";
  Direction2[Direction2["Down"] = 40] = "Down";
})(Direction || (Direction = {}));
class SelectOptions extends Component {
  constructor(props) {
    super(props);
    this._onOptionClick = (ev) => {
      let labelElement = JSON.parse(ev.currentTarget.dataset.label);
      this.setState({selected: labelElement});
      this.props.onSelect(ev.currentTarget.dataset.value, labelElement);
    };
    this.state = {
      filteredOptions: this.props.options,
      selected: this.props.selected || "",
      highlighted: this.props.selected || ""
    };
    this.isGrouped = this._isGrouped();
    this.flattenOptions = this.isGrouped ? this._getFlattenGroups() : this.props.options;
  }
  componentDidCatch(err) {
    console.error(err);
  }
  componentDidUpdate() {
    this.flattenOptions = this.isGrouped ? this._getFlattenGroups() : this.state.filteredOptions;
    if (this.state.highlighted && !this._optionIsVisible(this.state.highlighted)) {
      this._scrollOptionList(this.state.highlighted);
    }
  }
  componentDidMount() {
    if (this.state.selected && this.state.selected) {
      this._scrollOptionList(this.state.selected);
    }
  }
  render() {
    return this.state.filteredOptions && this.state.filteredOptions.length > 0 ? /* @__PURE__ */ React.createElement("div", {
      className: "bit-select__options-box"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "bit-select__options-list",
      ref: (el) => this.list = el
    }, this.props.showGroups && this.isGrouped ? this._renderOptionGroups() : this._renderOptions(this.state.filteredOptions))) : null;
  }
  usedArrowKeys(key) {
    const currentIndex = this._findOptionIndex(this.state.selected);
    let highlightedIndex = this._findOptionIndex(this.state.highlighted);
    if (key === Keys.KEY_UP) {
      highlightedIndex = highlightedIndex - 1 >= 0 ? highlightedIndex - 1 : this.flattenOptions.length - 1;
    } else {
      highlightedIndex = highlightedIndex + 1 <= this.flattenOptions.length - 1 ? highlightedIndex + 1 : 0;
    }
    if (key === Keys.ENTER) {
      this.setState({
        selected: this.state.highlighted
      });
      const newItem = this.flattenOptions[this._findOptionIndex(this.state.highlighted)];
      this.props.onSelect(newItem.value, newItem.label);
      return;
    }
    this.setState({
      highlighted: this.flattenOptions[highlightedIndex].label
    });
  }
  _findOptionIndex(searched) {
    return this.flattenOptions.findIndex((item) => item.label === searched);
  }
  _renderOptionGroups() {
    if (!this.state.filteredOptions[0].hasOwnProperty("groupName")) {
      throw Error("Wrong dropdown structure for groups of options");
    }
    const filteredOptions = this.state.filteredOptions;
    return filteredOptions.map((group) => {
      return /* @__PURE__ */ React.createElement("div", {
        className: "bit-select__option-group",
        key: group.groupName,
        "data-group": group.groupName
      }, /* @__PURE__ */ React.createElement("p", {
        className: "bit-select__option-group__group-name"
      }, /* @__PURE__ */ React.createElement("strong", null, group.groupName)), /* @__PURE__ */ React.createElement("ul", {
        className: "bit-select__options-list__wrapper"
      }, this._renderOptions(group.options)));
    });
  }
  _renderOptions(items) {
    const {highlighted, selected} = this.state;
    return items.map((item) => {
      const selectedClass = this.state.selected === item.label ? "selected" : "";
      const hightlightedClass = highlighted === item.label ? "highlighted" : "";
      const dataLabel = JSON.stringify(item.label);
      return /* @__PURE__ */ React.createElement("li", {
        className: `bit-select__options-list__option ${selectedClass} ${hightlightedClass}`,
        "data-value": item.value,
        "data-label": dataLabel,
        "data-group": this.isGrouped ? item.groupName : null,
        onClick: this._onOptionClick,
        key: item.value
      }, /* @__PURE__ */ React.createElement("span", null, this.props.labelRenderer ? this.props.labelRenderer(item.label) : item.label));
    });
  }
  _isGrouped() {
    return this.props.options && this.props.options.length > 0 && this.props.options[0].hasOwnProperty("groupName");
  }
  _getFlattenGroups() {
    const items = this.state.filteredOptions;
    const tmpArr = [];
    return items.reduce((accumulator, group) => {
      return [...accumulator, ...group.options];
    }, tmpArr);
  }
  _scrollOptionList(label) {
    const option = document.querySelector(`.bit-select__options-list__option[data-label="${label}"]`);
    if (!option) {
      return;
    }
    const list = this.list;
    if (!list) {
      return;
    }
    list.scrollTop = option.offsetTop;
  }
  _optionIsVisible(label) {
    const option = document.querySelector(`.bit-select__options-list__option[data-label="${label}"]`);
    if (!option) {
      return false;
    }
    const optRect = option.getBoundingClientRect();
    const rect = this.list.getBoundingClientRect();
    return optRect.top >= rect.top && optRect.bottom <= rect.bottom;
  }
}
export {SelectOptions};
