import React from 'react'
import AboutUsPicture from "../../../images/AboutUsPic.png"
import AboutUsMain from "../../../images/AboutUsMain.png"

const AboutUs = () => {
    return (
        <>
            <section className={"about-us-section"}>

                <div className={"about-us-left"}>
                    <h2>About Us</h2>
                    <br />

                    <p>
                        At PetVista, we are dedicated to revolutionizing pet care through technology. Our platform leverages AI-powered diagnostics and smart tracking tools to help pet owners and veterinarians better understand and care for their pets.
                        <br />

                        With a focus on health monitoring, behavioral analysis, and early disease detection, we aim to bridge the communication gap between pets and their caregivers. Our mission is to ensure that every pet receives the attention and care they deserve, making pet ownership more informed, responsible, and rewarding.
                        <br />

                        Join us in creating a future where pets are healthier, happier, and better understood.
                    </p>
                </div>

                <div className={"about-us-right"}>
                    <img src={AboutUsMain} alt="Pic" />
                </div>

            </section>
        </>
    )
}

export default AboutUs