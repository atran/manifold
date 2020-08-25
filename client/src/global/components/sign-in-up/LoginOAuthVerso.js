import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get, values } from "lodash";
import { commonActions } from "actions/helpers";
import withSettings from "hoc/with-settings";
import Oauth from "./oauth";

class LoginOAuthVerso extends Component {
  static mapStateToProps = state => {
    return {
      authentication: state.authentication,
    };
  };

  static propTypes = {
    authentication: PropTypes.object,
    settings: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.commonActions = commonActions(props.dispatch);
  }

  get customOAuthProviders() {
    return values(get(this.props, "settings.attributes.oauth")).filter(
      provider => provider.custom
    );
  }

  get customOAuthButtons() {
    return this.customOAuthProviders.map(provider => (
      <Oauth.Button
        dispatch={this.props.dispatch}
        provider={provider.name}
        hasIcon={false}
      >
        Log in with {provider.descriptiveName}
      </Oauth.Button>
    ));
  }

  render() {
    return (
      <span className="login-external">
        <Oauth.Monitor dispatch={this.props.dispatch} />
        { 
            this.props.authentication.authenticated
            ? <span 
                className="site-nav__link site-nav__link--oauth" 
                onClick={this.commonActions.logout}
              >
                Log Out
              </span>
            : this.customOAuthButtons
        }
      </span>
    );
  }
}

export default withSettings(
  connect(LoginOAuthVerso.mapStateToProps)(LoginOAuthVerso)
);
