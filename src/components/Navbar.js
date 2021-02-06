import React, { useState , useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import { UserContext } from '../userContext'
const TopNav = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { isLoggedIn, setIsloggedIn } = useContext(UserContext);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const logOutHandler = () => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userID');
      setIsloggedIn(false)
  }
  
  return  isLoggedIn ?
    
    <div>
      {console.log(isLoggedIn)};
      <Navbar color="faded" light>
        <NavbarToggler onClick={toggleNavbar}></NavbarToggler>
        <NavbarBrand style={{marginLeft: '20px'}} onClick={logOutHandler} href="/login" >Sign Out</NavbarBrand>
        {/* <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" /> */}
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
             <Link style={{color:"gray"}} to="/">Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link style={{color:"gray"}} to="/event">Create Event</Link>
            </NavItem>
            <NavItem>
              <Link  style={{color:"gray"}} to="/registeration">Registeration Request</Link>
            </NavItem>
            <NavItem>
              <Link style={{color:"gray"}} to="/registerationresult">Registeration Results</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    : "" ;
}

export default TopNav;