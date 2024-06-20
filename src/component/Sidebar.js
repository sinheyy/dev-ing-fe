import React, { useState } from "react";
import { Offcanvas, Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import '../style/sidebar.style.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleSelectMenu = (url) => {
    setShow(false);
    navigate(url);
  };

  const NavbarContent = () => {
    return (
      <div>
        <Link to="/">
          <img width={100} src="/img/logo.png" alt="dev-ing-logo.png" />
        </Link>
        <ul className="sidebar-area">
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu("/admin")}
          >
            Admin Account
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu("/admin/post")}
          >
            Post
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu("/admin/qna")}
          >
            Q&A
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu("/admin/meetup")}
          >
            MeetUp
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu("/admin/report")}
          >
            Report
          </li>
        </ul>
      </div>
    );
  };
  return (
    <>
      <div className="sidebar-toggle">{NavbarContent()}</div>

      <Navbar bg="light" expand={false} className="mobile-sidebar-toggle">
        <Container fluid>
          <img width={80} src="/img/logo.png" alt="dev-ing-logo.png" />
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand`}
            onClick={() => setShow(true)}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="start"
            className="sidebar"
            show={show}
          >
            <Offcanvas.Header closeButton onClick={() => setShow(false)}></Offcanvas.Header>
            <Offcanvas.Body>{NavbarContent()}</Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Sidebar;
