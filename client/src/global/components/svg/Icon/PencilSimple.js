import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class IconPencilSimple extends Component {
  static displayName = "Icon.PencilSimple";

  static propTypes = {
    iconClass: PropTypes.string,
    size: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string
  };

  static defaultProps = {
    size: 24,
    fill: "currentColor"
  };

  render() {
    const { iconClass, size, fill, stroke } = this.props;
    const classes = classnames("manicon-svg", iconClass);

    return (
      <svg
        className={classes}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={fill}
        stroke={stroke}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M9.40612602,17.7199728 L19.0839055,8.06418391 L15.9511664,4.92410056 L6.27386418,14.5784572 L4.97459192,19.0173654 L9.40612602,17.7199728 Z M3.50140802,20.4906347 L5.38613577,14.0515428 L15.9528336,3.50989938 L20.4980945,8.06581606 L9.93187396,18.6080272 L3.50140802,20.4906347 Z M10.0233532,17.8105469 L9.31544675,18.5168531 L5.47564673,14.6683531 L6.18355322,13.9620469 L10.0233532,17.8105469 Z" />
      </svg>
    );
  }
}