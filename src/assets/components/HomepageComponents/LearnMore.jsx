import React from 'react'
import DogPicture from "../../../images/learnMore-left-img.png"
import videoImage from "../../../images/video.png"

const LearnMore = () => {
  return (
    <>

      <section className={"learnMore-Section"}>

        <div className={"learnMore-leftSection"}>

          <img className={"DogPicture"} src={DogPicture} alt="Pic" />

          <img className={"videoImage"} src={videoImage} alt="Pic" />

        </div>


        <div className={"learnMore-rightSection"}>

          <h2>Pets communicate in their own way—it's up to us to understand them.</h2>
          <br />
          <p>
            Caring for pets goes beyond feeding and sheltering them. It involves understanding their behaviors, emotions, and needs. Whether you're a pet owner, veterinarian, or animal enthusiast, learning to interpret their signals is essential for building a strong bond.
            <br />
            PetVista focuses on leveraging technology to enhance pet care, providing tools to diagnose health conditions, track behavior, and ensure overall well-being. By combining AI-powered diagnostics with expert knowledge, we aim to bridge the communication gap between pets and their caregivers.
          </p>

        </div>

      </section>

    </>
  )
}

export default LearnMore