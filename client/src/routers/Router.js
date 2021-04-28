import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Auth, UserPage, Peoples } from "../pages"
function useRouters(isAuthUser) {
  return (
    <Switch>
      {isAuthUser ? (
        <>
          <Route path='/userPage' exact>
            <UserPage />
          </Route>
          <Route path='/searchPeople' exact>
            <Peoples />
          </Route>
          <Redirect to='/searchPeople' />
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
