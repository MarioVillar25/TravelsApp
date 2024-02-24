import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveLocalStorage } from "../../utils/localStorageUtils";
import { TravelContext } from "../../Context/TravelsProvider";

const initialValue = {
  email: "",
  password: "",
};

export const FormLogin = () => {
  const [login, setLogin] = useState(initialValue);
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const [state, setState] =  useContext(TravelContext);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin({ ...login, [name]: value });
  };

  const onSubmit = () => {
    if (!login.email || !login.password) {
      setMessage("Me debes rellenar todos los campos");
    } else {
      axios
        .post("http://localhost:3000/users/login", login)
        .then((res) => {
          console.log("resAxios", res.data);
          //guardar el token en el locals
          saveLocalStorage("token", res.data.token);
          //decirle a la app quien es el usuario logueado
          //guardar user en un Context
          setState({...state, user: res.data.user})
          navigate("/userProfile");
        })
        .catch((err) => {
          if (err.response.status === 500) {
            setMessage("Error interno del servidor");
          } else {
            setMessage("No autorizado");
          }
          console.log(err);
        });
    }
  };

  return (
    <Form>
      <h2>Login</h2>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={login.email}
          onChange={handleChange}
          name="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={login.password}
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />
      </Form.Group>

      <p>
        Estas mpd, <Link to="/register"> register </Link>
      </p>
      <span className="errorMess">{message}</span>

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
