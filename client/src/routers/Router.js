import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Auth, Home, UserPage, SearchPeople } from "../pages"
function useRouters(isAuthUser) {
  return (
    <Switch>
      {isAuthUser ? (
        <>
          <Route path='/userPage' exact>
            <UserPage />
          </Route>
          <Route path='/searchPeople' exact>
            <SearchPeople />
          </Route>
          <Redirect to='/userPage' />
        </>
      ) : (
        <>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/auth' exact>
            <Auth />
          </Route>
          <Redirect to='/' />
        </>
      )}
    </Switch>
  )
}
export default useRouters
