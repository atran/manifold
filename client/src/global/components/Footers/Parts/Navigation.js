import React from "react";
import NavigationLink from "./NavigationLink";
import LoginOAuthVerso from "global/components/sign-in-up/LoginOAuthVerso";
import chunk from "lodash/chunk";
import has from "lodash/has";

export default function FooterPartNavigation({ children }) {
  // Remove default Login button
  children.shift();

  const withIcons = children.filter(child => has(child, "icon"));
  const withoutIcons = children.filter(child => !has(child, "icon"));
  const groupedLinks = chunk(withoutIcons, 4);

  /* eslint-disable react/no-array-index-key */
  return (
    <div>
      <nav
        className="app-footer-navigation app-footer-navigation--mobile"
        aria-hidden="true"
      >
        <ul className="app-footer-navigation__list">
          <li>
            <ul className="app-footer-navigation__group">
              <li
                className="app-footer-navigation__item"
                key="oauth-login"
              >
                <LoginOAuthVerso />
              </li>
              {withoutIcons.map(link => (
                <li
                  className="app-footer-navigation__item"
                  key={`${link.to}${link.title}`}
                >
                  <NavigationLink
                    className="app-footer-navigation__link"
                    item={link}
                  />
                </li>
              ))}
            </ul>
          </li>
          <li>
            <ul className="app-footer-navigation__group">
              {withIcons.map(link => (
                <li
                  className="app-footer-navigation__item"
                  key={`${link.to}${link.title}`}
                >
                  <NavigationLink
                    className="app-footer-navigation__link"
                    item={link}
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
      <nav
        className="app-footer-navigation app-footer-navigation--desktop"
        aria-label="Footer Navigation"
      >
        <ul className="app-footer-navigation__list">
          {groupedLinks.map((linkGroup, linkGroupIndex) => (
            <li key={linkGroupIndex}>
              {linkGroup.length > 0 && (
                <ul className="app-footer-navigation__group">
                    <li
                      className="app-footer-navigation__item"
                      key="oauth-login"
                    >
                      <LoginOAuthVerso />
                    </li>
                  {linkGroup.map(link => (
                    <li
                      className="app-footer-navigation__item"
                      key={`${link.to}${link.title}`}
                    >
                      <NavigationLink
                        className="app-footer-navigation__link"
                        item={link}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <ul className="app-footer-navigation__group">
              {withIcons.map(link => (
                <li
                  className="app-footer-navigation__item"
                  key={`${link.to}${link.title}`}
                >
                  <NavigationLink
                    className="app-footer-navigation__link"
                    item={link}
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
  /* eslint-enable react/no-array-index-key */
}
