import { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import Movies from './pages/Movies'
import Directors from './pages/Directors'


const Routes:FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Movies />
      </Route>

      <Route exact path="/directors">
        <Directors />
      </Route>
    </Switch>
  )
}


export default Routes