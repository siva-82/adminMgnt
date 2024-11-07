import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import {useEditEmpMutation, useDeleteEmpMutation } from "../slices/empsApiSlice";
import {LinkContainer } from 'react-router-bootstrap'
import Confirm from "../utils/Confirm";

const TableContainer = ({data}) => {
  const [eId,setEId]=useState("")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [contact,setContact]=useState("")
  const [image, setImage] = useState();
const [deleteEmply,setDeleteEmply]=useState({})
  const [ modalShow,setModalShow]=useState(false)
  const [ showConfirmModal,setShowConfirmModal]=useState(false)
  
  const [editEmp,isError,isLoading]=useEditEmpMutation() || {}
  const [deleteEmp,{isError:deleteEror,isLoading:deleteLoading}]=useDeleteEmpMutation() || {}



 

const onEdit=async(val)=>{
console.log(val)   
const empVal=data.filter(emp=>emp._id==val) 
console.log(name,email,contact,image,empVal[0]?.name)   
  setEId(val)
  setName(empVal[0]?.name)
  setEmail(empVal[0]?.email)
  setContact(empVal[0]?.contact)
  setModalShow(true)
}

 const editHandler=async(e)=>{
  e.preventDefault()
console.log(name,email,contact,image,eId)   
  
  const formData = new FormData();
  formData.append("name",name);
  formData.append("email", email);   
  formData.append("contact", contact);
  formData.append("image", image);

    for (let [key, value] of formData) {
      console.log("formdataloop", `${key}: ${value}`);
    }

    try {
      const res = await editEmp({id:eId,data:formData});

      console.log("submitHandler res try" + JSON.stringify(res));
    } catch (err) {
      console.log("submitHandler res catch" + e?.data?.message || err);
    }

  setModalShow(false)
  setName("")
  setEmail("")
  setContact("")
}
const handleCancel = () => setShowConfirmModal(false);
const onDelete=async(val)=>{
  setShowConfirmModal(true)
  console.log(val)   
  const empVal=data.filter(emp=>emp._id==val) 
  console.log(name,email,contact,image,empVal[0]?.name)   
  setDeleteEmply({id:val,name:empVal[0]?.name,email:empVal[0]?.email,contact:empVal[0]?.contact })
    
  }
const deleteEmpHandler = async() => {
  
  try {
    const res = deleteEmp(deleteEmply?.id);
    console.log("delete res",deleteEmply?.id, res);
  } catch (error) {}
  setShowConfirmModal(false);
};
  return (
    <>
    {showConfirmModal && (
        <Confirm
        showConfirmModal={showConfirmModal}
          data={deleteEmply}
          handleCancel={handleCancel}
          deleteEmpHandler={deleteEmpHandler}
        />
      )}
      <Modal
      
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered 
      show={modalShow}
        onHide={() => setModalShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <Form onSubmit={editHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="Name"
                value={name}
                placeholder="Name"
                autoFocus
                onChange={(e)=>setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                placeholder="Select your image"
                onChange={(e)=>setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="number"
                placeholder="Contact number"
                value={contact }
                onChange={(e)=>setContact(e.target.value)}
              />
            </Form.Group>
                             
      <Modal.Footer>
        <Button type='submit' >Submit</Button>
      </Modal.Footer>
      </Form>
      </Modal.Body>
    </Modal>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {data?.slice(0)?.map((emp,i) => {
            return(<tr key={i} value={emp._id} >
              <td>{i+1}</td>
              <td><img style={{height:"50px",width:"50px",borderRadius:"50%"}} src={emp.image}></img></td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.contact}</td>
              <td>
              <LinkContainer to={"/Profile"}>
              <Button className="btn btn-success " >View</Button></LinkContainer>
              <Button className="btn btn-secondary mx-2" value={emp._id} onClick={(e)=>onEdit(e.target.value)} >Edit</Button>
                <Button className="btn btn-danger"value={emp._id} onClick={(e)=>onDelete(e.target.value)}>Delete</Button>
              </td>
            </tr>)

           
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TableContainer;
