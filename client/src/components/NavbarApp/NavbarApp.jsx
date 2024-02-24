import React, { useContext } from "react";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { TravelContext } from "../../Context/TravelsProvider";
import { deleteLocalStorage } from "../../utils/localStorageUtils";

export const NavbarApp = () => {
  const [state, setState] = useContext(TravelContext);
  const navigate = useNavigate();

  if (state.user) {
    console.log("hay user");
  }

  const logOut = () => {
    deleteLocalStorage("token");
    setState({});
    navigate("/");
  };
  return (
    <nav>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Logo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/services">
                Services
              </Nav.Link>
            </Nav>

            {!state.user ? (
              <div className="d-flex gap-2">
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                  variant="outline-success"
                >
                  Register
                </Button>
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  variant="outline-success"
                >
                  Login
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Button onClick={logOut} variant="outline-success">
                  LogOut
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};
