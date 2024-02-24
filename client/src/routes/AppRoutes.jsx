import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Container } from "react-bootstrap";
import { NavbarApp } from "../components/NavbarApp/NavbarApp";
import { Register } from "../pages/Auth/Register/Register";
import { Login } from "../pages/Auth/Login/Login";
import { UserProfile } from "../pages/UserProfile/UserProfile";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <header>
        <NavbarApp />
      </header>
      <Container fluid>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userProfile" element={<UserProfile />} />


          </Routes>
        </main>
      </Container>
    </BrowserRouter>
  );
};
