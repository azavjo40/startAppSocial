import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Auth, Home, MyPage } from "../pages";
function useRouters(isAuthUser) {
  return (
    <Switch>
      {isAuthUser ? (
        <>
          <Route path="/myPage" exact>
            <MyPage />
          </Route>
          <Redirect to="/myPage" />
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
