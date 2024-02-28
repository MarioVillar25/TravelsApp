import React, { useContext, useEffect, useState } from "react";
import { TravelContext } from "../../Context/TravelsProvider";
import { Button, Col, Row } from "react-bootstrap";
import "./userProfile.scss";
import { ModalBasic } from "../../components/ModalBasic/ModalBasic";
import { FormNewTravel } from "../../components/FormNewTravel/FormNewTravel";
import axios from "axios";
import { TravelsGallery } from "../../components/travelsGallery/TravelsGallery";

export const UserProfile = () => {
  const { user } = useContext(TravelContext);
  const [show, setShow] = useState(false);
  const [travels, setTravels] = useState([]);
  //const [refreshTravels, setRefreshTravels] = useState(false);

  useEffect(() => {
    if (user) {
      //pedir todos los viajes de este user
      axios
        .get(`http://localhost:3000/travels/travelsOneUser/${user?.user_id}`)
        .then((res) => {
          console.log("RESVIAJES", res);
          setTravels(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]); //en el array de dependencia cada vez que cambia de estado user se va a ejecutar el UseEffect.

  console.log("travels", travels);

  const HandleClose = () => {
    setShow(!show);
  };

  const refresh = () => {
    setRefreshTravels(!refreshTravels)
  }

  return (
    <Row>
      <Col>
        <h2>Hola {user?.name} </h2>

        <Row>
          <Col sm={12} md={6}>
            <div className="profileMain">
              <p>Name: {user?.name}</p>
              <p>lastname: {user?.lastname}</p>
              <p>address: {user?.address}</p>
              <p>city: {user?.user_city}</p>
            </div>
            <div>
              <Button onClick={HandleClose} variant="success">
                Add travel
              </Button>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className="imgProfile">
              {user?.user_img ? (
                <img
                  src={`http://localhost:3000/images/users/${user?.user_img}`}
                  alt=""
                />
              ) : (
                <img src="/assets/images/user.png" alt="" />
              )}
            </div>
            <ModalBasic show={show} HandleClose={HandleClose}>
              <FormNewTravel
                HandleClose={HandleClose}
                show={show}
                user_id={user?.user_id}
                //refresh={refresh}
                travels={travels}
                setTravels={setTravels}
              />
            </ModalBasic>
          </Col>
        </Row>
        <Row>
          <Col>
            <TravelsGallery travels={travels} setTravels={setTravels} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
