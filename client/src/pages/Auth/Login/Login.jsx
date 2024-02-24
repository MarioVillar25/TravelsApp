import React from "react";
import { Row, Col } from "react-bootstrap";
import "./login.scss";

import { FormLogin } from "../../../components/FormLogin/FormLogin";

export const Login = () => {
  return (
    <Row className="registerMain">
      <Col className="d-flex justify-content-center align-items-center">
        <div className="formRegister">
          <FormLogin />
        </div>
      </Col>
    </Row>
  );
};
