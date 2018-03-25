import React, { Component } from "react";
import PropTypes from "prop-types";
import humps from "humps";

export default class MetaList extends Component {
  static displayName = "MetaList";

  static propTypes = {
    metadata: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = this.regenerateState(props.metadata);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.metadata !== nextProps.metadata) {
      this.setState(this.regenerateState(nextProps.metadata));
    }
  }

  regenerateState(metadata) {
    const long = {};
    const short = {};

    Object.keys(metadata).forEach(key => {
      const value = metadata[key];
      if (value.length > 280) {
        long[key] = value;
      } else {
        short[key] = value;
      }
    });

    return {
      long: Object.assign({}, long),
      short: Object.assign({}, short)
    };
  }

  render() {
    const { long, short } = this.state;
    const shortKeys = Object.keys(short).sort();

    return (
      <div>
        <ul className="meta-list-primary">
          {Object.keys(long).map(key => {
            return (
              <li key={key}>
                <span className="meta-label">
                  {humps.decamelize(key, { separator: " " })}
                </span>
                <div
                  className="meta-value"
                  dangerouslySetInnerHTML={{ __html: long[key] }}
                />
              </li>
            );
          })}
        </ul>
        <ul className="meta-list-primary columnar">
          {shortKeys.map(key => {
            return (
              <li key={key}>
                <span className="meta-label">
                  {humps.decamelize(key, { separator: " " })}
                </span>
                <div
                  className="meta-value"
                  dangerouslySetInnerHTML={{ __html: short[key] }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
