"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const Drawer_1 = require("material-ui/Drawer");
const movie_1 = require("material-ui/svg-icons/av/movie");
const movie_filter_1 = require("material-ui/svg-icons/image/movie-filter");
const theaters_1 = require("material-ui/svg-icons/action/theaters");
const List_1 = require("material-ui/List");
const menus = [
    { url: '/', icon: React.createElement(movie_filter_1.default, null), text: '現正上映' },
    { url: '/upcoming', icon: React.createElement(movie_1.default, null), text: '即將上映' },
    { url: '/theaters', icon: React.createElement(theaters_1.default, null), text: '戲院總覽' },
];
class AppDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.handleTouchTap = (text) => {
            this.props.changeTitle(text);
            this.setState({ open: false });
        };
        this.toggle = () => {
            this.setState({ open: !this.state.open });
        };
        this.state = {
            open: false
        };
    }
    render() {
        return (React.createElement(Drawer_1.default, { docked: false, width: 300, containerStyle: { maxWidth: '75%' }, open: this.state.open, onRequestChange: (open) => this.setState({ open }) },
            React.createElement(List_1.List, null, menus.map(({ url, icon, text }) => React.createElement(react_router_dom_1.Link, { to: url },
                React.createElement(List_1.ListItem, { onTouchTap: () => this.handleTouchTap(text), leftIcon: icon }, text))))));
    }
}
exports.default = AppDrawer;
//# sourceMappingURL=appDrawer.js.map