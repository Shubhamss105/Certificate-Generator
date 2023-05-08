import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    sessionStorage.getItem('access_token')
      ? <Component {...props} />
      : <Navigate replace to='/login'/>
  )} />
);

export default PrivateRoute;
