import React,{ useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Button, Card, Form, Row, Col } from 'react-bootstrap';

const Salary = () => {
  return (
    <div>
      
      <Card style={{ width: '50rem' }}>
        <Card.Header>Salary</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Date</Form.Label>
              <Col sm="10">
                <Form.Control size="sm" type="text" placeholder="Enter Date"/>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">Description</Form.Label>
              <Col sm="10">
                <Form.Control size="sm" type="text" placeholder="Description" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">Amount</Form.Label>
              <Col sm="10">
                <Form.Control size="sm" type="text" placeholder="0000" />
              </Col>
            </Form.Group>

          </Form>
        </Card.Body>
      </Card>

    </div>
  )
}

export default Salary