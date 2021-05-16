import React from "react";
import { Redirect, useHistory, BrowserRouter as Router } from "react-router-dom";
import { Nav, Navbar,NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import Salary from './Salary';

const Dashboard = () => {

  const history = useHistory();
  // const { customer, setCustomer } = useCustomer();
  // 
  const logout = () => {
    // client.request(remove_refresh_token).finally(() => {
    //   history.push("/auth/signin");

    //   setCustomer(null);
    // });
  };

  return (
    <Router>

    <Nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Tracking Expenses</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"><a className="nav-link" href="/salary">Salary</a></li>
        <li className="nav-item"><a className="nav-link" href="/expenses">Expenses</a></li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>            
          </ul>
        </li>        
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item"><a className="nav-link" href="/logout">Logout</a></li>        
      </ul>
    </div>
  </div>
</Nav>
      
    </Router>
  )
}

export default Dashboard
