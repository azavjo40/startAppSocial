import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Auth, Home } from "../pages";
function useRouters(isAuthUser) {
  return (
    <Switch>
      {isAuthUser ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Redirect to="/" />
        </>
      )}
    </Switch>
  );
}
export default useRouters;
