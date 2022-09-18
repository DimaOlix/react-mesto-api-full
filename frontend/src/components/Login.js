import React from "react";
import AuthForm from "./AuthForm.js"


function Login({ requestLogin }) {

  return (
    <>
      <AuthForm name='Login'  onRequest={requestLogin} />
    </>
  )
}

export default Login;