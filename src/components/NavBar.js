import { Navbar, Nav, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import logoTransport from "../assets/img/logoTransportWhite.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import naviconGH from "../assets/img/naviconGH.png";
import { isMobile } from "react-device-detect";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Bus from "./Bus/Bus";
import About from "./About/About";

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

  useEffect(() => {
    // localStorage.clear();
    const storedActiveLink = localStorage.getItem("activeLink");
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
    localStorage.setItem("activeLink", value);
  };

  return (
    <Router basename="/whereIsIt">
      {isMobile && (
        <div
          className="alert alert-danger text-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
          }}>
          I am working to make this app compatible with mobile devices.
        </div>
      )}

      {!isMobile && (
        <>
          <Navbar
            expand="md"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 1000,
              height: "20vh"
            }}
            className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
            <Container>
              <Navbar.Brand as={Link} to="/bus" onClick={() => onUpdateActiveLink("Bus")} >
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
                      activeLink === "Bus"
                        ? "active navbar-link"
                        : "navbar-link"
                    }
                    onClick={() => onUpdateActiveLink("Bus")}>
                    Buses
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/about"
                    className={
                      activeLink === "About"
                        ? "active navbar-link"
                        : "navbar-link"
                    }
                    onClick={() => onUpdateActiveLink("About")}>
                    About
                  </Nav.Link>
                </Nav>
                <span className="navbar-text">
                  <div className="social-icon">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/luca-ver%C3%B3n-762602301">
                      <img src={navIcon1} alt="" />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/lucaveron/whereIsIt">
                      <img src={naviconGH} alt="" />
                    </a>
                  </div>
                </span>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div style={{marginTop : "20vh"}}>
            <Routes>
              <Route path="/bus" element={<Bus />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/bus" />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
};
