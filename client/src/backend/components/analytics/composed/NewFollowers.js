import React, { Component } from "react";
import PropTypes from "prop-types";
import Block from "../Block";
import Figure from "../parts/Figure";

export default class NewFollowers extends Component {
  static displayName = "Analytics.Composed.NewFollowers";

  static propTypes = {};

  get data() {
    return this.props.data.data;
  }

  get blockWidth() {
    return this.props.width || 25;
  }

  render() {
    return (
      <Block
        width={this.blockWidth}
        icon="starSquircle32"
        title="New Followers"
      >
        <Figure
          stat={`${this.data.value}`}
          caption="Average number of followed projects for each visitor"
        />
      </Block>
    );
  }
}
