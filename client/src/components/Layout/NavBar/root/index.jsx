import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Login from '../Login';
import NavLinks from '../NavLinks';
import SearchBar from '../SearchBar';
import { rootPath, searchPath } from 'constants/paths';
import { logoBlack } from 'assets/icons';
import { navBar, logo, navContentLeft, navContentRight } from './styles.css';

export const navBarText = {
  logo: 'Planted',
};

const NavBar = props => {
  const [isLogoutVisible, toggleLogoutVisible] = useState(false);
  const [isAuthenticated, toggleIsAuthenticated] = useState(
    localStorage.getItem('user') !== null,
  );

  const onSearchSubmit = e => {
    e.preventDefault();
    localStorage.setItem('searchString', e.target[0].value);
    props.history.push(searchPath);
  };

  const baseProps = {
    isLogoutVisible,
    toggleLogoutVisible,
    isAuthenticated,
    toggleIsAuthenticated,
    onSearchSubmit,
    ...props,
  };
  return <BaseNavBar {...baseProps} />;
};

const BaseNavBar = props => (
  <nav className={navBar}>
    <Link to={rootPath}>
      <img src={logoBlack} alt={navBarText.logo} className={logo} />
    </Link>
    <NavLinks {...props} />
    <SearchBar {...props} />
    <Login {...props} />
  </nav>
);
export default withRouter(NavBar);
