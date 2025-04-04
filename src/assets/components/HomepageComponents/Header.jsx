import React from 'react'
import HeaderDog from "../../../images/upscaleHeaderPhoto.png"
import { Link as RouteLink } from "react-router-dom"


const Header = () => {
    return (
        <>
            <section className={"Header-section"}>

                <svg className={"Header-blob"} width="1438" height="600" viewBox="0 0 1438 765" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-229.833 67.5652C-251.115 25.4931 -163.359 11.8556 -19.7981 11.7457C-13.9161 4.51216 -10.5947 0 -10.5947 0L-12.8371 11.7508C310.973 12.4658 907.537 79.1404 1188.13 46.9178C1596.69 0 1317.05 539.852 1410.69 518.573C1504.33 497.294 1349.39 784.559 1043.69 763.073C737.985 741.587 176.067 506.423 174.033 620.983C171.998 735.543 -125.033 599.704 -125.033 599.704L-12.8371 11.7508C-15.1717 11.7457 -17.4921 11.744 -19.7981 11.7457C-53.4708 53.1557 -171.06 183.752 -229.833 67.5652Z" fill="#B3FFD5" fill-opacity="0.34" />
                </svg>

                <div className={"Header-left-side"}>

                    <div className="headerInformationContainer">
                        <h1>Monitor your pets health and well-being!</h1>
                        <br />
                        <p>
                        Vet Vista is your personal pet management system. Easily add and track your pets’ details—including name, age, species, and breed—in one convenient dashboard. Designed for pet owners and veterinary practices alike, Vet Vista simplifies the way you manage your pet inventory, ensuring you always have the most up-to-date information at your fingertips.
                        </p>
                        <br />
                        <RouteLink className={"header-getStarted-button"} to={"/signup"}>
                                Get Started
                        </RouteLink>
                    </div>

                </div>

                <div className={"Header-right-side"}>

                </div>

            </section>
        </>
    )
}

export default Header