import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg';
import { useForm } from "../hooks/useForm";


function AuthForm({ name, onRequest, children }) {

  const{ values, handleChange } = useForm({ login: '', password: '' });

  function onSubmit(e) {
    e.preventDefault();
    onRequest({ values });
  }

  return (
    <>
      <section className="header">
        <img className="header__logo" src={logo} alt="Логотип"/>
        <Link className="header__link" to={name !== 'Register' ? '/sign-up' : '/sign-in'}>
          {name === 'Register' ? 'Войти' : 'Регистрация' }
        </Link>
      </section>

      <div className="page-identification">
        <h1 className="page-identification__title">
          {name === 'Register' ? 'Регистрация' : 'Вход'}
        </h1>      
        <form 
        className="form-identification form-identification_type_login"
        name="identification-login"
        onSubmit={onSubmit}
        >

          <input
          className="form-identification__input form-identification__input_value_login"
          type="text"
          name="login"
          id="login-input"
          value={ values.login }
          onChange={ handleChange }
          required
          placeholder="Email"
          />
          <span
          className="form-identification__input-error form-identification__input-error_position_top"
          id="login-input-error">
          </span>
          <input
          className="form-identification__input form-identification__input_value_password"
          type="password"
          name="password"
          id="password-input"
          value={ values.password }
          onChange={ handleChange }
          required
          placeholder="Пароль"
          />
          <span
          className="form-identification__input-error form-identification__input-error_position_button"
          id="password-input-error">
          </span>
          <button 
          className="form-identification__button"
          type="submit" 
          name="save-button">
            {name === 'Register' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>
        {children}
      </div>
    </>
  )
}

export default AuthForm;