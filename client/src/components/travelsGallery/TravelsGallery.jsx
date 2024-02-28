import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./travelsGallery.scss";
import { ImgGallery } from "../ImgGallery/ImgGallery";
import { ModalBasic } from "../ModalBasic/ModalBasic";
import { FormEditTravel } from "../FormEditTravel/FormEditTravel";
import axios from "axios";

export const TravelsGallery = ({ travels, setTravels }) => {
  const [show, setShow] = useState(false);
  const [travelToEdit, setTravelToEdit] = useState();

  const HandleClose = () => {
    setShow(!show);
  };

  const delTravel = (id) => {
    //borrar el travel de bd
    //modificar el array que se está pintando

    axios
      .put(`http://localhost:3000/travels/delTravel`, { id })
      .then((res) => {
        console.log(res);
        let arrayTemp = travels.filter((e) => e.travel_id !== id);
        setTravels(arrayTemp)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editTravel = (travel) => {
    setShow(true);
    setTravelToEdit(travel);
  };

  return (
    <>
      {travels.map((elem) => {
        return (
          <Row key={elem.travel_id}>
            <Col md={4}>
              <div className="dataTravel">
                <span>{elem.travel_city}</span>
                <span>{elem.country}</span>
                <span>{elem.description}</span>
                <div>
                  <Button
                    onClick={() => delTravel(elem.travel_id)}
                    variant="danger"
                    className="ms-2 me-2"
                  >
                    Eliminar
                  </Button>

                  <Button
                    variant="success"
                    className="ms-2 me-2"
                    onClick={() => editTravel(elem)}
                  >
                    editar
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <ImgGallery travel_id={elem.travel_id} />
            </Col>
          </Row>
        );
      })}

      <ModalBasic show={show} HandleClose={HandleClose} title="edit">
        <FormEditTravel
          travels={travels}
          setTravels={setTravels}
          travelToEdit={travelToEdit}
          setTravelToEdit={setTravelToEdit}
          HandleClose={HandleClose}
        />
      </ModalBasic>
    </>
  );
};
