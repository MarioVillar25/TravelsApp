import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export const FormEditTravel = ({
  HandleClose,
  travelToEdit,
  setTravelToEdit,
  travels,
  setTravels,
}) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTravelToEdit({ ...travelToEdit, [name]: value });
  };

  const onSubmit = () => {
    axios
      .put("http://localhost:3000/travels/editTravel", travelToEdit)
      .then((res) => {
        console.log(res);

        let arrayProv = travels.map((e) => {
          if (e.travel_id !== travelToEdit.travel_id) {
            return e;
          } else {
            return {
              ...e,
              travel_city: travelToEdit.travel_city,
              country: travelToEdit.country,
              description: travelToEdit.description,
            };
          }
        });

        setTravels(arrayProv);

        HandleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={travelToEdit?.travel_city}
          onChange={handleChange}
          name="travel_city"
          placeholder="Enter city"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pais</Form.Label>
        <Form.Control
          type="text"
          value={travelToEdit?.country}
          onChange={handleChange}
          name="country"
          placeholder="Country"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>description</Form.Label>
        <Form.Control
          type="text"
          value={travelToEdit?.description}
          onChange={handleChange}
          name="description"
          placeholder="description"
        />
      </Form.Group>

      <Button variant="primary" onClick={onSubmit}>
        Submit
      </Button>
      <Button variant="secondary" onClick={HandleClose}>
        Cancel
      </Button>

      <span className="errorMess">{message}</span>
    </Form>
  );
};
