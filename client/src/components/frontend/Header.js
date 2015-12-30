import React, { Component, PropTypes } from 'react';
import { UIPanel, UserMenuButton, UserMenuBody } from '../../components/shared';
import {Link} from 'react-router';

export default class Header extends Component {

  static propTypes = {
    visibility: PropTypes.object,
    location: PropTypes.object,
    authenticated: PropTypes.bool,
    visibilityToggle: PropTypes.func,
    visibilityHide: PropTypes.func,
    visibilityShow: PropTypes.func,
    panelToggle: PropTypes.func,
    panelHide: PropTypes.func,
    startLogout: PropTypes.func
  };

  render = () => {
    return (
      <header className={'header-browse'}>
        <Link to={'/browse'} className="logo">
          <figure>
            <i className="manicon manicon-manifold-logo"></i>
            <span className="screen-reader-text">
              {'Manifold Logo: Click to return to the browse page'}
            </span>
          </figure>
        </Link>
        <nav className="text-nav">
          <ul>
            <li className={this.props.location.pathname === '/browse/' ? 'active' : ''}>
              <Link to={`/browse/`}>
                {'Projects'}
              </Link>
            </li>
            <li className={this.props.location.pathname === '/browse/following/' ? 'active' : ''}>
              <Link to={`/browse/following/`}>
                {'Following'}
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="menu-dropdowns">
          <ul>
            <li>
              <UserMenuButton
                  authenticated={this.props.authenticated}
                  active={this.props.visibility.uiPanels.user}
                  showLoginOverlay={() => {this.props.visibilityShow('loginOverlay');}}
                  toggleUserMenu={() => {this.props.panelToggle('user');}}
              />
              <UIPanel
                  id="user"
                  visibility={this.props.visibility.uiPanels}
                  bodyComponent={UserMenuBody}

                  // Props required by body component
                  startLogout={this.props.startLogout}
                  hideUserMenu={() => {this.props.panelHide('user');}}
              />
            </li>
          </ul>
        </nav>
      </header>
    );
  };
}
