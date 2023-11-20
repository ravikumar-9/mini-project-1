import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'

import LoginForm from './components/LoginForm'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

console.log(sortByOptions)

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  </>
)

export default App
