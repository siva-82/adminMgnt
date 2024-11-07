import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const Confirm = ({ showConfirmModal, handleCancel, deleteEmpHandler, data }) => {
  console.log("confirm",data)
  return (
    <Modal show={showConfirmModal} onHide={handleCancel}>
      <Modal.Header>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body><div>Are You Sure to Delete this employee</div> </Modal.Body>
      <Modal.Body><div>{`Name: ${data?.name}` }</div> 
      <div>{`email: ${data?.email}  &  contact: ${data?.contact}`}</div> </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={deleteEmpHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirm;
