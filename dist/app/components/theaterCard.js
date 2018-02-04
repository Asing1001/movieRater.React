"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const location_on_1 = require("material-ui/svg-icons/communication/location-on");
const call_1 = require("material-ui/svg-icons/communication/call");
const colors_1 = require("material-ui/styles/colors");
const theaterCardStyle = {
    marginRight: '0.5em',
    fontSize: 'small',
    alignItems: 'center',
    display: 'inline-flex'
};
class TheaterCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { phone, distance, name, address } = this.props.theater;
        let roomTypes = this.props.roomTypes;
        return (React.createElement("div", null,
            React.createElement("h5", { style: { marginBottom: "-.2em", fontSize: "16px" } }, name),
            React.createElement("div", { style: { paddingTop: '0.5em', display: 'flex', alignItems: 'center' } },
                roomTypes && roomTypes.length > 0 && React.createElement("span", { style: theaterCardStyle }, roomTypes.map(roomType => React.createElement("img", { key: roomType, src: `https://s.yimg.com/f/i/tw/movie/movietime_icon/icon_${roomType}.gif` }))),
                phone && React.createElement("a", { href: `tel:${phone}`, style: Object.assign({ whiteSpace: 'nowrap' }, theaterCardStyle) },
                    React.createElement("span", null,
                        React.createElement(call_1.default, { color: colors_1.grey500, viewBox: '0 0 30 24' })),
                    phone),
                React.createElement("a", { href: `https://maps.google.com?q=${name}`, style: theaterCardStyle },
                    React.createElement("span", null,
                        React.createElement(location_on_1.default, { color: colors_1.grey500, viewBox: '-3 0 30 24' })),
                    distance ? ` ${distance} km` : address))));
    }
}
exports.default = TheaterCard;
//# sourceMappingURL=theaterCard.js.map