import * as React from "react";
import { Component, KeyboardEvent } from "react";
import { SelectData, Keys, SelectDataLabel } from "./Select";
import debounce from "lodash/debounce";

interface State {
    searchText: string;
    selected?: string;
    showSelected: boolean;
}

export interface SelectSearchProps {
    data: SelectData;
    selected: SelectDataLabel;
    onSearch: Function;
    onClose: Function;
    placeholder?:string;
}

class SelectSearch extends Component<SelectSearchProps, State> {
    state: State;
    _debouncedFiltering: Function;

    constructor(props: any) {
        super(props);

        this.state = {
            searchText: (this.props.selected as string) ? (this.props.selected as string) || "" : "",
            showSelected: false,
        };

        this._debouncedFiltering = debounce(this._filterResults, 200);
    }

    componentDidUpdate() {
        this._debouncedFiltering();
    }

    render() {
        return (
            <div className="bit-select__search">
                <input
                    type="text"
                    className="bit-select__search__input"
                    placeholder={this.props.placeholder}
                    onKeyUp={this._onKeyUp}
                    autoFocus
                />
            </div>
        );
    }

    _onKeyUp = (ev: KeyboardEvent<HTMLInputElement>) => {
        if (ev.keyCode === Keys.KEY_DOWN || ev.keyCode === Keys.KEY_UP) {
            return;
        }

        this.setState({
            searchText: (ev.target as HTMLInputElement).value.toLowerCase(),
        });
    };

    _onArrowClick = () => {
        this.props.onClose();
    };

    _filterResults() {
        this.props.onSearch(this.state.searchText);
    }
}

export { SelectSearch };
