import * as React from "react";
import { Component } from "react";
import { SelectDataItem, OptionGroup, Keys, SelectDataLabel } from "./Select";

export interface SelectOptionsProps {
    options: Array<SelectDataItem | OptionGroup>;
    showGroups: boolean;
    onSelect: Function;
    selected?: SelectDataLabel;
    labelRenderer?: Function;
}

interface State {
    filteredOptions: Array<SelectDataItem | OptionGroup>;
    selected: SelectDataLabel;
    highlighted: SelectDataLabel;
}

enum Direction {
    Up = 38,
    Down = 40,
}

class SelectOptions extends Component<SelectOptionsProps, State> {
    state: State;
    isGrouped: boolean;
    flattenOptions: Array<SelectDataItem>;
    list!: HTMLDivElement;

    constructor(props: SelectOptionsProps) {
        super(props);

        this.state = {
            filteredOptions: this.props.options,
            selected: this.props.selected || "",
            highlighted: this.props.selected || "",
        };

        this.isGrouped = this._isGrouped();
        this.flattenOptions = this.isGrouped
            ? this._getFlattenGroups()
            : (this.props.options as Array<SelectDataItem>);
    }

    componentDidCatch(err: Error) {
        console.error(err);
    }

    componentDidUpdate() {
        this.flattenOptions = this.isGrouped
            ? this._getFlattenGroups()
            : (this.state.filteredOptions as Array<SelectDataItem>);

        if ((this.state.highlighted as string) && !this._optionIsVisible(this.state.highlighted as string)) {
            this._scrollOptionList(this.state.highlighted as string);
        }
    }

    componentDidMount() {
        // scroll option list to selected element
        if ((this.state.selected as string) && this.state.selected) {
            this._scrollOptionList(this.state.selected as string);
        }
    }

    render() {
        return this.state.filteredOptions && this.state.filteredOptions.length >0 ? (
            <div className="bit-select__options-box">
                <div className="bit-select__options-list" ref={(el: HTMLDivElement) => (this.list = el)}>
                    {this.props.showGroups && this.isGrouped
                        ? this._renderOptionGroups()
                        : this._renderOptions(this.state.filteredOptions as Array<SelectDataItem>)}
                </div>
            </div>
        ):null;
    }

    public usedArrowKeys(key: string): void {
        const currentIndex: number = this._findOptionIndex(this.state.selected);
        let highlightedIndex: number = this._findOptionIndex(this.state.highlighted);

        if (key=== Keys.KEY_UP) {
            highlightedIndex =
                highlightedIndex - 1 >= 0 ? highlightedIndex - 1 : this.flattenOptions.length - 1;
        } else {
            highlightedIndex =
                highlightedIndex + 1 <= this.flattenOptions.length - 1 ? highlightedIndex + 1 : 0;
        }

        if (key=== Keys.ENTER) {
            this.setState({
                selected: this.state.highlighted,
            });

            const newItem: SelectDataItem = this.flattenOptions[
                this._findOptionIndex(this.state.highlighted)
            ];

            this.props.onSelect(newItem.value, newItem.label);

            return;
        }

        this.setState({
            highlighted: this.flattenOptions[highlightedIndex].label,
        });
    }

    private _findOptionIndex(searched: SelectDataLabel): number {
        return this.flattenOptions.findIndex((item: SelectDataItem) => item.label === searched);
    }

    private _renderOptionGroups() {
        if (!this.state.filteredOptions[0].hasOwnProperty("groupName")) {
            throw Error("Wrong dropdown structure for groups of options");
        }

        const filteredOptions = this.state.filteredOptions as Array<OptionGroup>;

        return filteredOptions.map((group: OptionGroup) => {
            return (
                <div className="bit-select__option-group" key={group.groupName} data-group={group.groupName}>
                    <p className="bit-select__option-group__group-name">
                        <strong>{group.groupName}</strong>
                    </p>
                    <ul className="bit-select__options-list__wrapper">
                        {this._renderOptions(group.options as Array<SelectDataItem>)}
                    </ul>
                </div>
            );
        });
    }

    private _renderOptions(items: Array<SelectDataItem>) {
        const { highlighted, selected } = this.state;

        return items.map((item: SelectDataItem) => {
            const selectedClass: string = this.state.selected === item.label ? "selected" : "";
            const hightlightedClass: string = highlighted === item.label ? "highlighted" : "";
            const dataLabel = JSON.stringify(item.label);
            return (
                <li
                    className={`bit-select__options-list__option ${selectedClass} ${hightlightedClass}`}
                    data-value={item.value}
                    data-label={dataLabel}
                    data-group={this.isGrouped ? item.groupName : null}
                    onClick={this._onOptionClick}
                    key={item.value}
                >
                    <span>
                        {this.props.labelRenderer ? this.props.labelRenderer(item.label) : item.label}
                    </span>
                </li>
            );
        });
    }

    private _isGrouped(): boolean {
        return this.props.options && this.props.options.length > 0 && this.props.options[0].hasOwnProperty("groupName");
    }

    /**
     * return flatten (non grouped) list of options
     */
    private _getFlattenGroups(): Array<SelectDataItem> {
        const items = this.state.filteredOptions as Array<OptionGroup>;
        const tmpArr: Array<SelectDataItem> = [];

        return items.reduce((accumulator: Array<SelectDataItem>, group: OptionGroup) => {
            return [...accumulator, ...group.options];
        }, tmpArr);
    }

    private _onOptionClick = (ev: any) => {
        let labelElement = JSON.parse(ev.currentTarget.dataset.label);
        this.setState({ selected: labelElement });
        this.props.onSelect(ev.currentTarget.dataset.value, labelElement);
    };

    /**
     * scroll list to option searched by label
     * @param label {string}
     */
    private _scrollOptionList(label: string): void {
        const option: HTMLLIElement | null = document.querySelector(
            `.bit-select__options-list__option[data-label="${label}"]`
        );

        if (!option) {
            return;
        }

        const list = this.list;

        if (!list) {
            return;
        }

        list.scrollTop = option.offsetTop;
    }

    /**
     * check if option (searched by label) is visible
     * @param label {string}
     */
    private _optionIsVisible(label: string): boolean {
        const option: HTMLLIElement | null = document.querySelector(
            `.bit-select__options-list__option[data-label="${label}"]`
        );

        if (!option) {
            return false;
        }

        const optRect = option.getBoundingClientRect();
        const rect = this.list.getBoundingClientRect();

        return optRect.top >= rect.top && optRect.bottom <= rect.bottom;
    }
}

export { SelectOptions };
