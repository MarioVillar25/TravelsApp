import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialValue = {
  name: "",
  email: "",
  password: "",
};

export const FormRegister = () => {
  const [register, setRegister] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const onSubmit = () => {
    if (!register.name || !register.email || !register.password) {
      setErrorMessage("Faltan datos o son incorrectos ");
    } else if (register.password.length < 2) {
      setErrorMessage("clave muy corta ");
    }else{
      axios
      .post("http://localhost:3000/users/register", register)
      .then((res)=>{
        console.log(res);
        navigate("/login")


      })
      .catch((err)=>{
        console.log(err);
        if(err.response.data.errno === 1062){
          setErrorMessage("Email already exists")

        }
      })

    }
    console.log(register);
  };

  return (
    <Form>
      <h2>Register</h2>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          value={register.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={register.email}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={register.password}
          onChange={handleChange}
        />
      </Form.Group>
      <p>
        Estas registrado, <Link to="/login"> Login </Link>
      </p>
      <span className="errorMess">{errorMessage}</span>
      <div>
        <Button onClick={onSubmit} variant="primary">
          Submit
        </Button>
        <Button onClick={() => navigate("/")} variant="primary">
          Cancel
        </Button>
      </div>
    </Form>
  );
};
