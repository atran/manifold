import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { connect } from 'react-redux';
import { select } from 'utils/entityUtils';
import { requests } from 'api';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withDispatch(WrappedComponent) {

  const displayName = `HigherOrder.WithDispatch('${getDisplayName(WrappedComponent)})`;

  class WithDispatch extends React.PureComponent {

    static displayName = displayName;

    static WrappedComponent = WrappedComponent;

    static mapDispatchToProps(dispatch) {
      return { dispatch };
    }

    render() {
      const props = Object.assign({}, this.props);
      return React.createElement(WrappedComponent, props);
    }
  }

  const ConnectedWithSettings = connect(
    null, WithDispatch.mapDispatchToProps
  )(WithDispatch);

  return hoistStatics(ConnectedWithSettings, WrappedComponent);

}
