import React, { useState, useEffect } from 'react'
import { Link as RouteLink } from "react-router-dom"
import Logo from "../../../images/petVistaLogo.png"

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  return (
    <>
      <nav className={"homeNavBar"}>
        <div className={"LogoContainer"}>
          <img src={Logo} alt="Logo" className={"logo"} />
          <h2>VetVista</h2>
        </div>

        {/* New Hamburger Menu Button */}
        <button 
          className={`hamburger-menu-btn ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navCotentContainer ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li onClick={() => setIsMenuOpen(false)}>Our Services</li>
            <li onClick={() => setIsMenuOpen(false)}>About Us</li>
            <li onClick={() => setIsMenuOpen(false)}>Pet Care</li>
            <li onClick={() => setIsMenuOpen(false)}>Contact</li>

            <RouteLink className={"RouteLink"} to={"/login"}>
              <li className={"Nav-Sign-In"} onClick={() => setIsMenuOpen(false)}>Sign In</li>
            </RouteLink>

            <RouteLink className={"RouteLink"} to={"/signup"}>
              <li className={"Nav-Sign-Register"} onClick={() => setIsMenuOpen(false)}>Register</li>
            </RouteLink>
          </ul>
        </div>

        {/* New Mobile Menu Overlay */}
        <div 
          className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        ></div>
      </nav>
    </>
  )
}

export default NavBar