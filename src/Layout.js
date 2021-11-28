import {Component} from "react";
import NavMenu from "./NavMenu";
import {observer} from "mobx-react-lite";

export default class Layout extends Component {
    static displayName = Layout.name;
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <NavMenu store={this.props.store} />
                <div className="m-3">
                    {this.props.children}
                </div>
            </div>
        );
    }
}