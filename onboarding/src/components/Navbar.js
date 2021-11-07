import React from 'react';
import { Nav } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from '@material-ui/core';

export default function Navbar(props) {

  const switchactive = () => {
    const active = props.isactive
    if (active === "true") {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/home">OnBoarding Form </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/list">List Students</a>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <a className="nav-link" href="/home">OnBoarding Form </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/list">List Students</a>
          </li>
        </ul>
      )
    }

  }

  const logout = () => {
    localStorage.setItem("name", " ")
    props.history.push("/login");
  }
  return (
    <div>
      {
        localStorage.getItem("name") === " " ? (
          props.history.push("/login")
        ) : (
            <div>
              <Nav className="navbar navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">On Boarding App</span>
                <span className="navbar-brand mb-0 h1">
                  <Button onClick={logout}>
                    {
                      localStorage.getItem("name")
                    }
                  </Button>
                </span>
              </Nav>
              <Nav
                className="navbar navbar-expand-lg navbar-dark bg-dark position-flexible"
                style={{ marginTop: "20px", marginLeft: "50px", width: "30%" }}>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  {
                    switchactive()
                  }
                </div>
              </Nav>
            </div>
          )
      }
    </div>
  )
}