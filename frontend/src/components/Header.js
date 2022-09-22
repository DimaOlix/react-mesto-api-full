import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ userInfo, handleSignOut }) {

  function onSignOut() {
    handleSignOut();
  }

  return (
    <section className="header">
      <img className="header__logo" src={logo} alt="Логотип"/>
      <p className='header__text-link'>{userInfo.email}</p>
      <Link className='header__button-exit' onClick={onSignOut} to={'/sign-in'}>Выйти</Link>
    </section>
  )
}

export default Header;
