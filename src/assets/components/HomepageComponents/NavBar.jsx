import React from 'react'
import { Link as RouteLink } from "react-router-dom"
import Logo from "../../../images/petVistaLogo.png"


const NavBar = () => {
  return (
    <>
      <nav className={"homeNavBar"}>
        <div className={"navCotentContainer"}>

          <div className={"LogoContainer"}>
            <img src={Logo} alt="Logo" className={"logo"} />
            <h2>VetVista</h2>
          </div>

          <ul>
            <li>Our Services</li>
            <li>About Us</li>
            <li>Pet Care</li>
            <li>Contact</li>
            <br />

            <RouteLink className={"RouteLink"} to={"/login"}>
              <li className={"Nav-Sign-In"}>Sign In</li>
            </RouteLink>

            <RouteLink className={"RouteLink"} to={"/signup"}>
              <li className={"Nav-Sign-Register"}>Register</li>
            </RouteLink>

          </ul>

        </div>
      </nav>
    </>
  )
}

export default NavBar