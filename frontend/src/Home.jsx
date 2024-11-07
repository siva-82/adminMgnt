import React from 'react'


import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";

import FormContainerEmp from "./components/FormContainerEmp";
import TableContainer from "./components/TableContainer";

import { useGetEmpsQuery } from "./slices/empsApiSlice";
const Home = () => {
    const [modalEmpShow, setModalEmpShow] = useState(false);

    const {data, isError, isLoading} = useGetEmpsQuery() || {};
  return (
    
      <div className="container">
    <h1>Management</h1>
    <div className="row my-2">

      <FormContainerEmp
        modalShow={modalEmpShow}
        setModalShow={setModalEmpShow}
      />

      <Button
        className=" w-25"
        variant="primary"
        onClick={() => setModalEmpShow(true)}
      >
        Add Employee
      </Button>
    </div>
    
    <div className="row">
      {isLoading && <Spinner
              className=" spinner"
              style={{ height: "50px", width: "50px", position:' absolute',right:" 50%", top: '50%' }}
            />}
      {!isLoading && <TableContainer data={data} />}
    </div>
  </div>
  )
}

export default Home