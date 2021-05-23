import React, { useState } from "react";
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import Api from '../utils/Api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Salary = () => {

  const [salary, setSalary] = useState({user_id: '', salary_id: '', dt_salary: '', desc_salary: '', amt_salary: '0'});
  const [startDate, setStartDate] = useState(new Date())
  const [submitted, setSubmitted] = useState(false);

  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setData({ ...data, [name]: value });
  // };
  
  const { user_id, salary_id, dt_salary, desc_salary, amt_salary } = salary

  // const onHandleChange = e => setSalary({ ...salary, [e.target.name] : e.target.value}) 

  const saveSalary = () => {
    // var data = {
    //   dt_salary: data.dt_salary,
    //   desc_salary: data.desc_salary,
    //   amt_salary: data.amt_salary
    // };

    Api.post('/gaji', salary)
      .then(response => {
        setSalary({
          id: response.data.id,
          dt_salary: response.data.dt_salary,
          desc_salary: response.data.desc_salary,
          amt_salary: response.data.amt_salary
        });
        // setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  }

  

  return (
    <div>
      
      <Card style={{ width: '50rem' }}>
        <Card.Header>Salary</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Date</Form.Label>
              <Col sm="10">
                
                <DatePicker className="mr-3"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    // onChange={handleInputChange}
                    isClearable
                    
                    placeholderText="Start Date"
                    dateFormat="yyyy-MM-dd"
                  />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">Description</Form.Label>
              <Col sm="10">
                <Form.Control size="sm" type="text"  placeholder="Description" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">Amount</Form.Label>
              <Col sm="10">
                <Form.Control size="sm" type="text"  placeholder="0000" />
              </Col>
            </Form.Group>

            <Button onClick={saveSalary} className="btn btn-success" size="sm"> Save Data</Button>

          </Form>
        </Card.Body>
      </Card>

    </div>
  )
}

export default Salary