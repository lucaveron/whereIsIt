import { Navbar, Nav, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import logoTransport from "../assets/img/logoTransportWhite.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import naviconGH from "../assets/img/naviconGH.png";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import Bus from "./Bus/Bus"; // Importa el componente para la página de inicio
import About from "./About/About";

// import NavDropdown from 'react-bootstrap/NavDropdown';
export const NavBar = () => {
  // const location = useLocation();
  const [activeLink, setActiveLink] = useState("Bus");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(false);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  // const route = useActiveRoute();
  // useEffect(() => {
  //   setActiveLink(route);
  // }, [route]); // Asegurémonos de que setActiveLink se llame cuando cambie la ruta


  return (
    <Router>
      <div style={{ height: "162px" }} />
      <Navbar
        expand="md"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
        className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logoTransport} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/bus"
                className={
                  activeLink === "Bus" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("Bus")}>
                Buses
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className={
                  activeLink === "About" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("About")}>
                About
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/luca-ver%C3%B3n-762602301">
                  <img src={navIcon1} alt="" />
                </a>
                <a href="https://github.com/lucaveron">
                  <img src={naviconGH} alt="" />
                </a>
              </div>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ minHeight: "calc(100vh - 162px)" }}>
        <Routes>
          <Route path="/bus" element={<Bus />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/bus" />} />
        </Routes>
      </div>
    </Router>
  );
};
