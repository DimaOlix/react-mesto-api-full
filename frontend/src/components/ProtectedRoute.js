import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({ component: Component, path, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component path={path} {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;