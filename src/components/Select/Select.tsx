import * as React from "react";
import { Component } from "react";
import { SelectSearch, SelectSearchProps } from "./SelectSearch";
import { SelectOptions, SelectOptionsProps } from "./SelectOptions";
import { KeyboardEvent } from "react";

interface State {
    isOpen: boolean;
    selected: SelectDataLabel;
    showGroups: boolean;
}
export interface SelectDataElement {
    kind: string;
}
export type SelectDataLabel = string | SelectDataElement;
export type SelectDataItem = {
    label: SelectDataLabel;
    value: string;
    groupName?: string;
};

export interface OptionGroup {
    groupName: string;
    options: Array<SelectDataItem>;
}

export type SelectData = {
    selected: string;
    items: Array<SelectDataItem> | Array<OptionGroup>;
};

export enum Keys {
    KEY_UP = 38,
    KEY_DOWN = 40,
    ENTER = 13,
}

interface SelectProps {
    className?: string;
    onSelect: Function;
    onSearch?: Function;
    data: SelectData;
    filteringEnabled?: boolean;
    showGroups?: boolean;
    selected?: SelectDataLabel;
    dataElementRenderer?: Function;
    showSelected?:boolean;
    placeholder?:string;
}

function isOptionGroupArray(items: Array<OptionGroup> | Array<SelectDataItem>): items is Array<OptionGroup> {
    return !!items.length && (items[0] as OptionGroup).groupName !== undefined;
}

class Select extends Component<SelectProps, State> {
    state: State;
    SelectOptionsComponent: any;
    SelectSearchComponent: any;
    scrollbarParent!: HTMLDivElement | null;

    constructor(props: SelectProps) {
        super(props);

        this.state = {
            isOpen: false,
            selected: this._getSelected(),
            showGroups: this.props.showGroups || false,
        };
    }

    componentWillReceiveProps(nextProp: SelectProps) {
        this.setState({
            selected: nextProp.selected || nextProp.data.selected || this._getSelected(),
            showGroups: nextProp.showGroups || false,
        });
    }

    render() {
        const activeClass: string = this.state.isOpen ? "active" : "";

        return (
            <div className={`bit-select ${this.props.className ? this.props.className : ""} ${activeClass}`}>
                {this.state.isOpen ? this.renderOpenSelect() : this.renderClosedSelect()}
                {this.state.isOpen ? <div className="bit-select__layer" onClick={this.onClick} /> : ""}
            </div>
        );
    }

    renderOpenSelect() {
        const selectSearchProps: SelectSearchProps = {
            data: this.props.data,
            onSearch:  this.onFilter || function() {},
            onClose: this.onClick,
            selected: this.state.selected,
            placeholder: this.props.placeholder
        };

        const selectOptionsProps: SelectOptionsProps = {
            options: this.props.data.items,
            showGroups: this.state.showGroups,
            onSelect: this.onSelect,
            selected: this.state.selected,
            labelRenderer: this.renderSelectDataLabel.bind(this),
        };

        return (
            <div
                className="bit-select__select-open"
                ref={(el: HTMLDivElement) => (this.scrollbarParent = el)}
                onKeyUp={this.onKeyPress}
            >
                {this.props.filteringEnabled ? (
                    <SelectSearch {...selectSearchProps} ref={el => (this.SelectSearchComponent = el)} />
                ) : null}

                <SelectOptions {...selectOptionsProps} ref={el => (this.SelectOptionsComponent = el)} />
            </div>
        );
    }

    renderSelectDataLabel(element: SelectDataLabel) {
        if (typeof element === "string") return element;
        if ("kind" in element && this.props && this.props.dataElementRenderer) {
            return this.props.dataElementRenderer(element);
        }
    }

    renderClosedSelect() {
        return (
            <a className="bit-select__select-closed" onClick={this.onClick}>
                <span className="selected-option">{
                  this.props.showSelected? this.renderSelectDataLabel(this.state.selected):
                    this.props.placeholder
                }</span>
                
                <span className="fa fa-chevron-down" />
                {/* <AngleDownSVG className="arrow-icon" /> */}
                {/* @TODO we need to convert fa to fas when we will use font-awesome 5 pro */}
            </a>
        );
    }

    onClick = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    onFilter = (value: string) => {
        let items: Array<OptionGroup> | Array<SelectDataItem>;
        // filtering in groups
        if (isOptionGroupArray(this.props.data.items)) {
            let tmpArray: Array<OptionGroup> = [];
            items = this.props.data.items
                .filter((group: OptionGroup) => {
                    return (
                        group.options.findIndex((option: SelectDataItem) =>
                            (option.label as string).toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
                        ) >= 0
                    );
                })
                .map((group: OptionGroup) => {
                    return {
                        ...group,
                        options: group.options.filter((option: SelectDataItem) =>
                            (option.label as string).toLowerCase().startsWith(value.toLowerCase())
                        ),
                    };
                });
        } else {
            // filtering in standard options
            items = this.props.data.items.filter((item: SelectDataItem) =>
                (item.label as string).toLowerCase().startsWith(value.toLowerCase())
            );
        }
        this.SelectOptionsComponent.setState({
            filteredOptions: items,
        });
    };

    onSelect = (value: string, label: SelectDataLabel) => {
        this.setState({
            selected: label,
            isOpen: false,
        });

        this.props.onSelect(value);
    };

    onKeyPress = (ev: KeyboardEvent<HTMLDivElement>) => {
        if (ev.keyCode !== Keys.KEY_UP && ev.keyCode !== Keys.KEY_DOWN && ev.keyCode !== Keys.ENTER) {
            return;
        }

        this.SelectOptionsComponent.usedArrowKeys(ev.keyCode);
    };

    _getSelected():string|SelectDataLabel {
        if(!this.props.data.items || this.props.data.items.length==0) return "";
        const isGrouped: boolean = this.props.data.items[0].hasOwnProperty("groupName");
        let selectedFromItems: SelectDataLabel;

        if (isGrouped) {
            let items = this.props.data.items as Array<OptionGroup>;
            selectedFromItems = items[0].options[0].label;
        } else {
            let items = this.props.data.items as Array<SelectDataItem>;
            selectedFromItems = items[0].label;
        }

        return this.props.selected || this.props.data.selected || selectedFromItems || "";
    }
}

export { Select };
