import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveLocalStorage } from "../../utils/localStorageUtils";
import { TravelContext } from "../../Context/TravelsProvider";
import "./edituser.scss";

const initialValue = {
  name: "",
  lastname: "",
  user_city: "",
  address: "",
};

export const EditUser = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { user, setUser } = useContext(TravelContext);
  const [edit, setEdit] = useState(initialValue);
  const [file, setFile] = useState();

  useEffect(() => {
    if (user) {
      setEdit(user);
    }
  }, [user]);

  const onSubmit = () => {
    if (edit.name && edit.lastname && edit.user_city && edit.address) {
      const newFormData = new FormData();

      newFormData.append("editUser", JSON.stringify(edit));
      newFormData.append("file", file);

      axios
        .put("http://localhost:3000/users/editUser", newFormData)
        .then((res) => {
          navigate("/userProfile");

          if (res.data.newImg) {
            setUser({ ...edit, user_img: res.data.newImg });
          } else {
            setUser(edit);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage("rellena los campos");
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  console.log("EditUser", edit);

  return (
    <Row className="d-flex justify-content-center align-items-center edit-main">
      <Col sm={6} md={4} xl={3} xxl={2}>
        {/* eso es para responsive */}
        <Form className="formEdit">
          <h2>Edit user</h2>

          <Form.Group className="mb-3" controlId="formBasicname">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={edit.name}
              onChange={handleChange}
              name="name"
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={edit.lastname === null ? "" : edit.lastname}
              onChange={handleChange}
              name="lastname"
              placeholder="Enter last name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={edit.city === null ? "" : edit.city}
              onChange={handleChange}
              name="user_city"
              placeholder="Enter city"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicaddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={edit.address === null ? "" : edit.address}
              onChange={handleChange}
              name="address"
              placeholder="Enter address"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicImg">
            <Form.Label>Imagen +</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFile}
              // value={user.email}
            />
          </Form.Group>

          <span className="errorMess">{message}</span>

          <div>
            <Button onClick={onSubmit} variant="primary">
              Submit
            </Button>
            <Button onClick={() => navigate("/userProfile")} variant="primary">
              Cancel
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
