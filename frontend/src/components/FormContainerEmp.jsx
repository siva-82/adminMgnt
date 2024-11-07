import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAddEmpMutation } from "../slices/empsApiSlice";
const FormContainerEmp = ({ modalShow, setModalShow }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState();

  const [addEmp, isError, isLoading] = useAddEmpMutation() || {};

  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("image", image);

    try {
      const res = await addEmp(formData).unwrap();
      console.log(res);
    } catch (err) {
      console.log(" catch" + e?.data?.message || err);
    }

    setModalShow(false);
    setName("");
    setEmail("");
    setContact("");
  };

  return (
    <div>
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
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="Name"
                value={name}
                placeholder="Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                placeholder="Select your image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="number"
                placeholder="Contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>

            <Modal.Footer>
              <Button type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FormContainerEmp;

//https://www.youtube.com/watch?v=qmr9NCYjueM&ab_channel=SamLama
