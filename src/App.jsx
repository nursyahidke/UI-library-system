import React from 'react'
import { Provider } from 'react-redux'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './components/Home'
import Details from './components/Details'
import Login from './components/Login'
import Navbar from './components/CustomNavbar'
import Register from './components/Register'
import Release from './components/Release'
import Genre from './components/Genre'
import Modal from './components/Modal'
import CardImage from './components/Card'
import store from '../src/redux/Store'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div>
            <Navbar/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/details/:id" component={Details}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/genre/:id" component={Genre}/>
            <Route exact path="/release/:id" component={Release}/>
            <Route exact path="/modal/:id" component={Modal} />
            <Route exact path="/explore" component={CardImage} />
            </div>
        </Provider>
      </Router>
    )
    }

}

export default App
