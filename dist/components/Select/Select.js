import * as React from "../../../snowpack/pkg/react.js";
import {Component} from "../../../snowpack/pkg/react.js";
import {SelectSearch} from "./SelectSearch.js";
import {SelectOptions} from "./SelectOptions.js";
export var Keys;
(function(Keys2) {
  Keys2["KEY_UP"] = "ArrowUp";
  Keys2["KEY_DOWN"] = "ArrowUp";
  Keys2["ENTER"] = "Enter";
})(Keys || (Keys = {}));
function isOptionGroupArray(items) {
  return !!items.length && items[0].groupName !== void 0;
}
class Select extends Component {
  constructor(props) {
    super(props);
    this.onClick = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };
    this.onFilter = (value) => {
      let items;
      if (isOptionGroupArray(this.props.data.items)) {
        let tmpArray = [];
        items = this.props.data.items.filter((group) => {
          return group.options.findIndex((option) => option.label.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())) >= 0;
        }).map((group) => {
          return {
            ...group,
            options: group.options.filter((option) => option.label.toLowerCase().startsWith(value.toLowerCase()))
          };
        });
      } else {
        items = this.props.data.items.filter((item) => item.label.toLowerCase().startsWith(value.toLowerCase()));
      }
      this.SelectOptionsComponent.setState({
        filteredOptions: items
      });
    };
    this.onSelect = (value, label) => {
      this.setState({
        selected: label,
        isOpen: false
      });
      this.props.onSelect(value);
    };
    this.onKeyPress = (ev) => {
      if (ev.key !== Keys.KEY_UP && ev.key !== Keys.KEY_DOWN && ev.key !== Keys.ENTER) {
        return;
      }
      this.SelectOptionsComponent.usedArrowKeys(ev.keyCode);
    };
    this.state = {
      isOpen: false,
      selected: this._getSelected(),
      showGroups: this.props.showGroups || false
    };
  }
  render() {
    const activeClass = this.state.isOpen ? "active" : "";
    return /* @__PURE__ */ React.createElement("div", {
      className: `bit-select ${this.props.className ? this.props.className : ""} ${activeClass}`
    }, this.state.isOpen ? this.renderOpenSelect() : this.renderClosedSelect(), this.state.isOpen ? /* @__PURE__ */ React.createElement("div", {
      className: "bit-select__layer",
      onClick: this.onClick
    }) : "");
  }
  renderOpenSelect() {
    const selectSearchProps = {
      data: this.props.data,
      onSearch: this.onFilter || function() {
      },
      onClose: this.onClick,
      selected: this.state.selected,
      placeholder: this.props.placeholder
    };
    const selectOptionsProps = {
      options: this.props.data.items,
      showGroups: this.state.showGroups,
      onSelect: this.onSelect,
      selected: this.state.selected,
      labelRenderer: this.renderSelectDataLabel.bind(this)
    };
    return /* @__PURE__ */ React.createElement("div", {
      className: "bit-select__select-open",
      ref: (el) => this.scrollbarParent = el,
      onKeyUp: this.onKeyPress
    }, this.props.filteringEnabled ? /* @__PURE__ */ React.createElement(SelectSearch, {
      ...selectSearchProps,
      ref: (el) => this.SelectSearchComponent = el
    }) : null, /* @__PURE__ */ React.createElement(SelectOptions, {
      ...selectOptionsProps,
      ref: (el) => this.SelectOptionsComponent = el
    }));
  }
  renderSelectDataLabel(element) {
    if (typeof element === "string")
      return element;
    if ("kind" in element && this.props && this.props.dataElementRenderer) {
      return this.props.dataElementRenderer(element);
    }
  }
  renderClosedSelect() {
    return /* @__PURE__ */ React.createElement("a", {
      className: "bit-select__select-closed",
      onClick: this.onClick
    }, /* @__PURE__ */ React.createElement("span", {
      className: "selected-option"
    }, this.props.showSelected ? this.renderSelectDataLabel(this.state.selected) : this.props.placeholder), /* @__PURE__ */ React.createElement("span", {
      className: "fa fa-chevron-down"
    }));
  }
  _getSelected() {
    if (!this.props.data.items || this.props.data.items.length == 0)
      return "";
    const isGrouped = this.props.data.items[0].hasOwnProperty("groupName");
    let selectedFromItems;
    if (isGrouped) {
      let items = this.props.data.items;
      selectedFromItems = items[0].options[0].label;
    } else {
      let items = this.props.data.items;
      selectedFromItems = items[0].label;
    }
    return this.props.selected || this.props.data.selected || selectedFromItems || "";
  }
}
export {Select};
