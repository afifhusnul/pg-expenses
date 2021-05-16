import React from 'react'
import { Nav, Navbar,NavDropdown} from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar bg="light" expand="lg" className="navbar navbar-default">
          <Navbar.Brand href="/">Tracking Expenses</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="mr-auto">                                    
              <NavDropdown title="Master Data  " id="basic-nav-dropdown">
                <NavDropdown.Item href="/salary">Salary</NavDropdown.Item>
                <NavDropdown.Item href="/expenses">Expenses</NavDropdown.Item>              
              </NavDropdown>            
            </Nav>          
          </Navbar.Collapse>
        </Navbar>
      </BrowserRouter>
    </div>
  )
}

export default Header