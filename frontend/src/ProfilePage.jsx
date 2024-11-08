import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteEmpMutation,
  useGetSingleEmpQuery,
} from "./slices/empsApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { useEditEmpMutation } from "./slices/empsApiSlice";
import { Button, Form, Modal, Spinner, Table } from "react-bootstrap";
import Confirm from "./utils/Confirm";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState();
  const [deleteEmply, setDeleteEmply] = useState({});

  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { id } = useParams();
  const { data, isError, isLoading } = useGetSingleEmpQuery(id) || {};

  const [editEmp, { isError: editError, isLoading: editLoading }] =
    useEditEmpMutation() || {};
  const [deleteEmp, { isError: deleteEror, isLoading: deleteLoading }] =
    useDeleteEmpMutation() || {};

  // console.log("editEmp", data?.name);
  // console.log(" single data", id, data);
  const onEdit = () => {
    setModalShow(true);
    setEmail(data.email);
    setName(data.name);
    setContact(data.contact);
  };
  const editHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("image", image);

    // for (let [key, value] of formData) {
    //   console.log("formdataloop", `${key}: ${value}`);
    // }

    try {
      const res = await editEmp({ id: id, data: formData });

      console.log("editError ");
      toast.success("Editted Successfully");
      console.log("editError", res?.data);

      console.log("submitHandler res try" + JSON.stringify(res));
    } catch (err) {
      console.log("submitHandler res catch" + e?.data?.message || err);
    }

    setModalShow(false);
    setName("");
    setEmail("");
    setContact("");
  };
  const handleCancel = () => setShowConfirmModal(false);
  const onDelete = () => {
    setShowConfirmModal(true);

    // const empVal=data.filter(emp=>emp._id==val)
    console.log(name, email, contact, image, data?.name);
    setDeleteEmply({
      id: id,
      name: data?.name,
      email: data?.email,
      contact: data?.contact,
    });
  };
  const deleteEmpHandler = async () => {
    try {
      const res = await deleteEmp(id);
      console.log("delete res", JSON.stringify(res));
      if (res && !deleteLoading) navigate("/");

      toast.success(res?.data?.message);
    } catch (error) {}
    setShowConfirmModal(false);
  };
  return (
    <div
      className="container-fluid d-flex "
      style={{
        height: "100vh",
        minHeight: "fit-content",
        background: "#e1e1e1",
      }}
    >
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
              <Button type="submit">
                {!editLoading ? (
                  "Submit"
                ) : (
                  <Spinner
                    className="mx-auto spinner-border "
                    style={{ height: "20px", width: "20px" }}
                  />
                )}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {!isLoading ? (
        <>
          <div
            className="container d-flex flex-column justify-content-between align-self-center"
            style={{
              height: "90%",
              minHeight: "fit-content",
              background: "ghostwhite",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h4 className=" my-5 d-flex justify-content-center">
                Details of Employee
              </h4>
              <div>
                <button className="btn btn-outline-danger " onClick={onDelete}>
                  Delete
                </button>
              </div>
            </div>
            <div className="row h-100" style={{ maxHeight: "500px" }}>
              <div className=" col-6 d-flex justify-content-center align-items-center">
                <div>
                  <img
                    className="rounded-circle"
                    style={{ height: "250px", width: "250px" }}
                    src={data?.emplyImg}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-6 d-flex flex-column justify-content-center align-items-start">
                <div className="d-flex flex-column justify-content-around w-100 h-100 px-2">
                  {/* <div className="d-flex  justify-content-between w-100  px-2"> */}
                  <div className="w-50">
                    <h4>Name: {data?.name}</h4>
                  </div>
                  <div className="w-50">
                    <h4>Email: {data?.email}</h4>
                  </div>
                  {/* </div> */}

                  {/* <div  className="d-flex  justify-content-between w-100  px-2"> */}
                  <div className="w-50">
                    <h4>Contact: {data?.contact}</h4>
                  </div>
                  <div className="w-50">
                    <h4>Experience: {data?.experience || "Not Updated"}</h4>
                  </div>
                  {/* </div> */}

                  <div className="w-100 ">
                    <h4>Address: {data?.address || "Not Updated "}</h4>
                  </div>
                  <div className="w-100">
                    <h4>Companies worked: {data?.address || "Not Updated "}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="row " style={{ height: "100px" }}>
              <div className="col-6 d-flex align-items-center">
                <LinkContainer to={"/"}>
                  <Button className="w-100 mx-2 btn-primary">Back</Button>
                </LinkContainer>
              </div>
              <div className="col-6 d-flex align-items-center">
                <Button onClick={onEdit} className="col-6 w-100 btn-success">
                  Edit
                </Button>
              </div>
              {/* <div className="col-4 d-flex align-items-center">
            <Button onClick={onEdit} className="col-6 w-100 btn-danger">
              Delete
            </Button>
          </div> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <Spinner
            className=" spinner-border "
            style={{
              height: "100px",
              width: "100px",
              position: " absolute",
              right: " 50%",
              top: "50%",
            }}
          />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
