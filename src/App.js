import React from 'react';
import './App.css';
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Reservations from './pages/Reservations'
import CurrentOrder from './pages/CurrentOrder'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'
import {Route,Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import CheckOut from './pages/checkout/CheckOut'
function App() {
  return (
    <div className="App">
    <Navbar/>
    <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/checkout' component={CheckOut}/>
    <Route exact path='/rooms/' component={Rooms}/>
    <Route exact path='/rooms/:slug' component={SingleRoom}/>
    <Route exact path='/rooms/:slug/reservation' component={Reservations}/>
    <Route exact path='/rooms/:slug/reservation/currentorder' component={CurrentOrder}/>
    <Route component={Error}/>
    </Switch>
  
    </div>
  );
}

export default App;
