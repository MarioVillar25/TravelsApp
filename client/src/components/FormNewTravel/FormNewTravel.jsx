import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";



export const FormNewTravel = ({ HandleClose, user_id, travels, setTravels }) => {

  const initialValue = {
    travel_city: "",
    country: "",
    description: "",
    user_id
  };



  const [message, setMessage] = useState("");
  const [travel, setTravel] = useState(initialValue);
  const [file, setFile] = useState();



  const handleChange = (e) => {
    const { name, value } = e.target;

    setTravel({ ...travel, [name]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files);
  };

  const onSubmit = () => {
    if (travel.travel_city && travel.country && travel.description) {
      const newFormData = new FormData();
      newFormData.append("regTravel", JSON.stringify(travel));
      if (file) {
        for (const elem of file) {
          newFormData.append("file", elem);
        }
      }

      axios
        .post("http://localhost:3000/travels/createTravel", newFormData)
        .then((res)=>{

          let travelProv = {
            travel_city: travel.travel_city,
            country: travel.country,
            description: travel.description,
            user_id: travel.user_id,
            travel_id: res.data
          }


          console.log("res", res.data);
          setTravels([...travels, travelProv])
          HandleClose()
          

        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage("rellena algo, porfavor");
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={travel?.travel_city}
          onChange={handleChange}
          name="travel_city"
          placeholder="Enter city"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pais</Form.Label>
        <Form.Control
          type="text"
          value={travel?.country}
          onChange={handleChange}
          name="country"
          placeholder="Country"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>description</Form.Label>
        <Form.Control
          type="text"
          value={travel?.description}
          onChange={handleChange}
          name="description"
          placeholder="description"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="travelImg">
        <Form.Label>
          <img src="/assets/icons/logofile.png" alt="" />
        </Form.Label>
        <Form.Control type="file" onChange={handleFile} multiple hidden />
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
