import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class StopSign extends Component {
  static displayName = "Icon.StopSign";

  static propTypes = {
    iconClass: PropTypes.string,
    size: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string
  };

  static defaultProps = {
    size: 64,
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
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path d="M42.7692,5.97639996 L21.23,5.97639996 L5.99999996,21.2068 L5.99999996,42.746 L21.23,57.976 L42.7692,57.976 L58,42.746 L58,21.2068 L42.7692,5.97639996 Z M32,45 C30.3431457,45 29,43.6568543 29,42 C29,40.3431458 30.3431457,39 32,39 C33.6568543,39 35,40.3431458 35,42 C35,43.6568543 33.6568543,45 32,45 Z M32.9963,35.0011 L31.0025,35.0011 L28.0178,19 L36.0114,19 L32.9963,35.0011 Z" />
      </svg>
    );
  }
}