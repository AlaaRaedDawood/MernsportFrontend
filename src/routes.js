import React from 'react'
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import Login from './pages/Login/'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Event from './pages/Events';
import TopNav from './components/Navbar'
import RegisterationsView from './pages/Registerations' ;
import RegisterationsResultsView from './pages/RegisterationsResult'

export default function Routes() {
    //const { isLoggedIn , setIsLoggedIn} = useContext(UserContext)
    return (
        <BrowserRouter>
            <TopNav></TopNav>
            <Switch>
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/' exact component={Dashboard} />
                <Route path='/event' component={Event} />
                <Route path='/registerationresult' component={RegisterationsResultsView} />
                <Route path='/registeration' component={RegisterationsView} />
            </Switch>
        </BrowserRouter>
    );
}