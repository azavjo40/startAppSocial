import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Auth } from "../pages";
function useRouters(isAuthUser) {
  return (
    <Switch>
      {isAuthUser ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <>
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
