import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'


export default function NavBar() {
  return (
    <Navbar 
      collapseOnSelect 
      fixed="top"
    >
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex w-100 justify-content-around">
            <NavLink to="/" exact activeClassName="active">Movies</NavLink>
            <NavLink to="/directors" activeClassName="active">Directors</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
