import {BrowserRouter, Route} from 'react-router-dom';
import { Container } from "react-bootstrap";
import logo from './logo.svg';
import './App.css';

import Header from './components/pages/layout/Header';
import Salary from './components/pages/Salary';
import Expenses from './components/pages/Expenses';


function App() {
  return (
    <div className="App">
      <Header />
        <Container className="container-fluid mt-4">
          <BrowserRouter>
            <Route path="/salary" component={Salary}/>
            <Route path="/expenses" component={Expenses}/>
          </BrowserRouter>
        </Container>      
    </div>
  );
}

export default App;
