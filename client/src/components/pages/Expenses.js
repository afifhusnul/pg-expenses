import React,{ useState, useEffect, useCallback } from "react";
// import { Redirect, useHistory } from "react-router-dom";
import { Table, Card, Form, Button, Row, Col } from 'react-bootstrap';
import * as IconBS from "react-icons/bs";
import DatePicker from "react-datepicker";
import Api from '../utils/Api';
import Paginations from '../utils/Paginations';
import "react-datepicker/dist/react-datepicker.css";

const Expenses = () => {

  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  let NUM_OF_RECORDS = data.length;
  let LIMIT = 10;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const currentData = data.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );

  // useEffect( async () => {
  //   try {
  //     const result = await Api.get('/expenses') 
  //     setData(result.data.response);
  //   } catch(e) {
  //     // statements
  //     console.log(e);
  //   }    
  // },[]);


  useEffect(() => {
    async function fetchData() {
      const result = await Api.get('/expenses')      
      setData(result.data.response)
    }
    fetchData();
  },[]);
  
 
// If press search
  const onSearch = e => {
    // e.preventDefault();
    // try {
    //   // statements expenses/search
    //   // const user_id === "2"
    //   // const {}
    //   const result = Api.get('/expenses/search')
    //   const newData = {
    //     user_id : "2",
    //     start_dt: startDate,
    //     end_date: endDate
    //   }
    //   setData(result.data.response);
    // } catch(e) {
    //   // statements
    //   console.log(e);
    // }
  };


  const rows = currentData.map((single) => (     
    <tr key={single.expenses_id}>      
      <td>{single.dt_exp.substring(0,10)}</td>
      <td>{single.desc_exp}</td>
      <td>{new Intl.NumberFormat().format(single.amt_exp)}</td>
      <td>Edit <IconBS.BsPencilSquare style={{color: 'blue'}}/>   Delete <IconBS.BsFillTrashFill style={{color: 'red'}} /></td>
    </tr>
    )
  );

  return (

    <div>

      <Card className="mb-3" >
        <Card.Body>
          <Form>
            <Row className="justify-content-md-center">
                <Col md="auto">
                  <DatePicker className="mr-3"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    isClearable
                    placeholderText="Start Date"
                    dateFormat="yyyy-MM-dd"
                  />
                  </Col>
                  <Col md="auto">
                  <DatePicker className="ml-5"
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    isClearable
                    placeholderText="End Date"
                    dateFormat="yyyy-MM-dd"
                  />
                </Col>
                <Col md="auto" ><Button size="sm" variant="outline-success" onClick={onSearch()}>Search <IconBS.BsSearch /></Button></Col>
                <Col>
                  <div className="pagination-wrapper">
                    <Paginations
                      totalRecords={NUM_OF_RECORDS}
                      pageLimit={LIMIT}
                      pageNeighbours={2}
                      onPageChanged={onPageChanged}
                      currentPage={currentPage}
                    />
                  </div>
                </Col>  
            </Row>
          </Form>          
        </Card.Body>
      </Card>

      <Table striped bordered hover size="sm" classname="mt-2">
        <thead>
          <tr>                
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>      

    </div>
  )
}

export default Expenses
