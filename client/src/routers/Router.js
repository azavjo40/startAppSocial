import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Auth, Peoples } from "../pages"
function useRouters(isAuthUser) {
  return (
    <Switch>
      {isAuthUser ? (
        <>
          <Route path='/home' exact>
            <Peoples />
          </Route>
          <Redirect to='/home' />
        </>
      ) : (
        <>
          <Route path='/auth' exact>
            <Auth />
          </Route>
          <Redirect to='/auth' />
        </>
      )}
    </Switch>
  )
}
export default useRouters
