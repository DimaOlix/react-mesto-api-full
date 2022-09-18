import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm.js"


function Register({ requestRegister }) {

  return (
    <AuthForm name='Register' onRequest={requestRegister}>
      <p className="page-identification__text">
        Уже зарегистрированы?
        <Link className="page-identification__link" to='/sign-in'> Войти</Link>
      </p>
    </ AuthForm >
  )
}

export default Register;