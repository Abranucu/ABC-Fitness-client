import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import logoAnimado from "../assets/ABC-fitness-logo-animado-navbar.gif";
import logo from "../assets/ABC-fitness-logo-navbar.png";

function CustomNavbar() {
  const { userRole, loggedUserId } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3"
          sticky="top"
        >
          <Container fluid>
            <Navbar.Brand as={NavLink} to="/">
              <img
                src={isHovered ? logoAnimado : logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="Tu Logo"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  ABC Fitness
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={NavLink} to="/profile">
                    Perfil
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/exercises">
                    Ejercicios
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/routines">
                    Rutinas
                  </Nav.Link>
                  <Nav.Link as={NavLink} to={`/routines/user/${loggedUserId}`}>
                    Mis rutinas
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/create-routine">
                    Crear rutina
                  </Nav.Link>
                  {userRole === "admin" && (
                    <Nav.Link as={NavLink} to="/create-exercise">
                      Crear Ejercicio
                    </Nav.Link>
                  )}
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default CustomNavbar;
