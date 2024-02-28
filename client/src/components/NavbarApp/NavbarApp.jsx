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
import "./navbar.scss";

export const NavbarApp = () => {
  const { user, setUser, setToken } = useContext(TravelContext);
  const navigate = useNavigate();

  const logOut = () => {
    deleteLocalStorage("token");
    setUser();
    setToken();
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
              <Nav.Link as={Link} to="/userProfile">
                Go To Profile
              </Nav.Link>


            </Nav>

            {!user ? (
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

                <Button
                  onClick={() => navigate("/editUser")}
                  variant="outline-success"
                >
                  Edit Profile
                </Button>
              </div>
            )}
            <div className="d-flex align-items-center navbarImg">
              <p className="m-0">{user?.name[0].toUpperCase()}</p>

              {user?.user_img ? (
                <img onClick={() => navigate("/userProfile")}
                  src={`http://localhost:3000/images/users/${user?.user_img}`}
                  alt=""
                />
              ) : (
                <img onClick={() => navigate("/userProfile")} src="/assets/images/user.png" alt="" />
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};
