import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import SmallLoader from '../loaders/SmallLoader.jsx';



export const DashboardPage = () => {

    const [username, setUsername] = useState("")

    useEffect(() => {
        const storedData = localStorage.getItem("loginDetails");

        if (storedData) {
            const parsedData = JSON.parse(storedData); // Parse the JSON string
            if (parsedData.name) {
                setUsername(parsedData.name); // Set the username from the object
            }
        }
    }, [])

    return (
        <>
            <section className={"dashboard-page-section"}>
                <div className={"dashboard-page-header"}>

                    <h3>Dashboard</h3>
                    <br />
                    <h1>Welcome,  {username}</h1>

                </div>
            </section>
        </>
    )
}

// =====================================================================

export const MypetPage = () => {
    const [newPetDetails, setNewPetDetails] = useState({
        animal_name: "",
        age: "",
        species: "",
        breed: ""
    });

    const [userId, setUserId] = useState("")

    // state to store retrieved pets
    const [pets, setPets] = useState([]) //store fetched pets

    // function to get the users  id from the local storage on mount

    useEffect(() => {
        const storedData = localStorage.getItem("loginDetails");

        if (storedData) {
            const parsedData = JSON.parse(storedData); // Parse the JSON string
            if (parsedData.id) {
                setUserId(parsedData.id); // Set the username from the object
            }
        }
    }, [])

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setNewPetDetails({ ...newPetDetails, [name]: value });
    };

    const handleFormValidation = () => {
        if (
            newPetDetails.animal_name.trim() === "" ||
            newPetDetails.age.trim() === "" ||
            newPetDetails.species.trim() === "" ||
            newPetDetails.breed.trim() === ""
        ) {
            toast.error("Please fill all the fields", {
                style: {
                    background: "rgb(240, 139, 156)",
                },
            });
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (userId) {
            fetchUserPets();
        }
    }, [userId]);

    const uploadPetSubmission = async (event) => {
        event.preventDefault();

        if (!handleFormValidation()) {
            setIsLoading(false); // Ensure loader stops if validation fails
            return;
        }

        try {
            const payload = { ...newPetDetails, user_id: Number(userId) };
            setIsLoading(true);
            const response = await fetch('https://vet-vista.onrender.com/mypets/addpet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success("Pet added successfully", {
                    style: {
                        background: "rgb(144, 234, 96)",
                    },
                });
                setNewPetDetails({
                    animal_name: "",
                    age: "",
                    species: "",
                    breed: ""
                });
                fetchUserPets();
            } else {
                toast.error("Failed to add pet. Please try again.", {
                    style: {
                        background: "rgb(240, 139, 156)",
                    },
                });
            }
        } catch (err) {
            toast.error("Oops! Something went wrong", {
                style: {
                    background: "rgb(240, 139, 156)",
                },
            });
            console.error(err);
        } finally {
            setIsLoading(false); // Ensure loader stops in case of error
        }
    };

    // function to fetch all the users pets on mount

    const fetchUserPets = async () => {
        try {
            const response = await fetch(`https://vet-vista.onrender.com/mypets/allpets/${Number(userId)}`);
            if (response.ok) {
                const data = await response.json();
                setPets(data); // Store fetched pets in state
            } else {
                toast.error("Failed to fetch pets");
            }
        } catch (error) {
            toast.error("Error fetching pets");
            console.error(error);
        }
    };

    // function to fetch the users pets on mount


    return (
        <>
            <section className={"my-pet-page-section"}>
                <div className={"my-pet-header"}>
                    <h3>My Pets</h3>
                    <br />
                    <h1>Your personal vet inventory</h1>
                </div>
                <br />

                <section className={"add-new-pet-section"}>
                    <div className={"add-new-pet-form-picture"}>
                        <svg width="74" height="54" viewBox="0 0 74 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M56.9999 0.333252C51.2999 0.333252 47.8333 1.43325 45.8333 2.36659C43.2666 1.09992 40.3333 0.333252 36.9999 0.333252C33.6666 0.333252 30.7333 1.09992 28.1666 2.36659C26.1666 1.43325 22.6999 0.333252 16.9999 0.333252C6.99992 0.333252 0.333252 26.9999 0.333252 33.6666C0.333252 36.4333 4.73325 38.9666 10.7999 39.9999C12.9333 47.4666 22.9999 53.1666 35.3333 53.6666V39.3999C33.3666 38.1666 30.3333 35.9333 30.3333 33.6666C30.3333 30.3333 36.9999 30.3333 36.9999 30.3333C36.9999 30.3333 43.6666 30.3333 43.6666 33.6666C43.6666 35.9333 40.6333 38.1666 38.6666 39.3999V53.6666C50.9999 53.1666 61.0666 47.4666 63.1999 39.9999C69.2666 38.9666 73.6666 36.4333 73.6666 33.6666C73.6666 26.9999 66.9999 0.333252 56.9999 0.333252ZM10.8333 33.2332C9.16659 32.8333 7.86659 32.3666 6.99992 31.9999C7.83325 22.7666 14.3333 8.33325 17.1666 6.99992C18.9666 6.99992 20.3333 7.19992 21.5666 7.36659C14.5666 15.0666 11.7999 27.1333 10.8333 33.2332ZM26.9999 26.9999C26.1159 26.9999 25.268 26.6487 24.6429 26.0236C24.0178 25.3985 23.6666 24.5506 23.6666 23.6666C23.6666 21.8666 25.1666 20.3333 26.9999 20.3333C27.884 20.3333 28.7318 20.6844 29.3569 21.3096C29.9821 21.9347 30.3333 22.7825 30.3333 23.6666C30.3333 25.5333 28.8333 26.9999 26.9999 26.9999ZM46.9999 26.9999C46.1159 26.9999 45.268 26.6487 44.6429 26.0236C44.0178 25.3985 43.6666 24.5506 43.6666 23.6666C43.6666 21.8666 45.1666 20.3333 46.9999 20.3333C47.884 20.3333 48.7318 20.6844 49.3569 21.3096C49.9821 21.9347 50.3333 22.7825 50.3333 23.6666C50.3333 25.5333 48.8333 26.9999 46.9999 26.9999ZM63.1666 33.2332C62.1999 27.1333 59.4333 15.0666 52.4333 7.36659C53.6666 7.19992 55.0333 6.99992 56.8333 6.99992C59.6666 8.33325 66.1666 22.7666 66.9999 31.9999C66.1666 32.3666 64.8666 32.8333 63.1666 33.2332Z" fill="#0C4651" />
                        </svg>

                        <br />
                        <h3>Add Pet</h3>
                        <p>Include your personal pet</p>
                    </div>

                    <form onSubmit={uploadPetSubmission} className={"add-new-pet-form"}>
                        <input type="text" name="animal_name" value={newPetDetails.animal_name} placeholder="Name" onChange={handleInputChange} />
                        <input type="number" name="age" value={newPetDetails.age} placeholder="Age" onChange={handleInputChange} />
                        <input type="text" name="species" value={newPetDetails.species} placeholder="Specie" onChange={handleInputChange} />
                        <input type="text" name="breed" value={newPetDetails.breed} placeholder="Breed" onChange={handleInputChange} />

                        <button type="submit">
                            {isLoading ? <SmallLoader /> : "Add"}
                        </button>
                    </form>
                </section>

                <br />

                <section className="my-pets-list-container">
          <h2>Your Pets</h2>
          {pets.length === 0 ? (
            <p>No pets added yet.</p>
          ) : (
            <ul className="pet-card-list">
              {pets.map((pet) => (
                <li key={pet._id} className="pet-card">
                  <h3 className="pet-name">{pet.animal_name}</h3>
                  <p className="pet-age">Age: {pet.age}</p>
                  <p className="pet-species">Species: {pet.species}</p>
                  <p className="pet-breed">Breed: {pet.breed}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
                <Toaster position="top-center" reverseOrder={false} />
            </section>
        </>
    );
};


// =====================================================================




// import "./DiagnosisPage.css"; // Make sure your CSS is imported if needed
export const DiagnosisPage = () => {
    const [petDetails, setPetDetails] = useState({
      species: "",
      breed: "",
      gender: "",
      symptoms: [],
      follow_up: {
        Appetite_Loss: false,
        Vomiting: false,
        Diarrhea: false,
        Coughing: false,
        Labored_Breathing: false,
        Lameness: false,
        Skin_Lesions: false,
        Nasal_Discharge: false,
        Eye_Discharge: false,
      },
    });
  
    const [isLoading, setIsLoading] = useState(false);
  
    // Predefined array of follow-up questions
    const followUpQuestions = [
      {
        key: "Appetite_Loss",
        label: "Has your pet lost appetite recently?",
        explanation:
          "Appetite loss can be a sign of various conditions including gastrointestinal or metabolic issues.",
      },
      {
        key: "Vomiting",
        label: "Has your pet been vomiting?",
        explanation:
          "Vomiting can indicate digestive tract problems, infections, or other health concerns.",
      },
      {
        key: "Diarrhea",
        label: "Is your pet experiencing diarrhea?",
        explanation:
          "Diarrhea can lead to dehydration and may signal intestinal inflammation or infection.",
      },
      {
        key: "Coughing",
        label: "Has your pet been coughing?",
        explanation:
          "Coughing might suggest respiratory infections, heart problems, or other underlying issues.",
      },
      {
        key: "Labored_Breathing",
        label: "Is your pet breathing heavily or laboring to breathe?",
        explanation:
          "Labored breathing can be a symptom of respiratory distress, heart disease, or other serious conditions.",
      },
      {
        key: "Lameness",
        label: "Does your pet show signs of lameness or difficulty walking?",
        explanation:
          "Lameness may be caused by injuries, arthritis, or neurological problems.",
      },
      {
        key: "Skin_Lesions",
        label: "Does your pet have any noticeable skin lesions?",
        explanation:
          "Skin lesions can indicate allergies, infections, or parasitic infestations.",
      },
      {
        key: "Nasal_Discharge",
        label: "Does your pet have nasal discharge?",
        explanation:
          "Nasal discharge may be a sign of upper respiratory infection or other nasal conditions.",
      },
      {
        key: "Eye_Discharge",
        label: "Is your pet experiencing any eye discharge?",
        explanation:
          "Eye discharge could indicate infection, injury, or irritations that need prompt attention.",
      },
    ];
  
    const HowItWorksContainer = useRef(null);
    const petDetailsForm = useRef(null);
  
    // Step tracking: 1 (pet info), 2 (symptoms), 3 (follow-up Qs)
    const [step, setStep] = useState(1);
  
    // For step 2 (symptoms)
    const [symptomInputs, setSymptomInputs] = useState(["", ""]);
  
    // For step 3 (one question per page)
    const [currentFollowUpIndex, setCurrentFollowUpIndex] = useState(0);
    const [tempAnswer, setTempAnswer] = useState(null);
  
    // Hide "How It Works" and show Step 1 form
    const handleRemoveHowItWorks = () => {
      if (HowItWorksContainer.current) {
        HowItWorksContainer.current.style.display = "none";
      }
      if (petDetailsForm.current) {
        petDetailsForm.current.style.display = "flex";
      }
      setStep(1);
    };
  
    // ----- Step 1: Pet Info -----
    const handleStep1Next = (e) => {
      e.preventDefault();
      if (!petDetails.species || !petDetails.breed || !petDetails.gender) {
        toast.error("Please fill in species, breed, and gender");
        return;
      }
      setStep(2);
    };
  
    // ----- Step 2: Symptoms -----
    const handleSymptomChange = (index, value) => {
      const newSymptoms = [...symptomInputs];
      newSymptoms[index] = value;
      setSymptomInputs(newSymptoms);
    };
  
    const handleAddSymptom = () => {
      if (symptomInputs.length < 4) {
        setSymptomInputs([...symptomInputs, ""]);
      }
    };
  
    const handleStep2Next = (e) => {
      e.preventDefault();
      // Create a formatted data object that contains only non-empty symptoms
      const formattedData = {
        symptoms: symptomInputs.filter((symptom) => symptom.trim() !== ""),
      };
  
      if (formattedData.symptoms.length < 2) {
        toast.error("Please enter at least 2 symptoms");
        return;
      }
      // Update petDetails with a properly formatted symptoms array
      setPetDetails((prev) => ({ ...prev, symptoms: formattedData.symptoms }));
      setStep(3);
    };
  
    // ----- Step 3: Single-Question Flow -----
    const currentQuestion = followUpQuestions[currentFollowUpIndex] || null;
  
    const handlePreviousQuestion = () => {
      if (currentFollowUpIndex > 0) {
        if (tempAnswer !== null && currentQuestion) {
          setPetDetails((prev) => ({
            ...prev,
            follow_up: {
              ...prev.follow_up,
              [currentQuestion.key]: tempAnswer,
            },
          }));
        }
        setCurrentFollowUpIndex((prevIndex) => prevIndex - 1);
        const prevKey = followUpQuestions[currentFollowUpIndex - 1].key;
        const prevAnswer = petDetails.follow_up[prevKey];
        setTempAnswer(prevAnswer);
      }
    };
  
    const handleNextQuestion = () => {
      if (tempAnswer === null) {
        toast.error("Please select True or False");
        return;
      }
      if (currentQuestion) {
        setPetDetails((prev) => ({
          ...prev,
          follow_up: {
            ...prev.follow_up,
            [currentQuestion.key]: tempAnswer,
          },
        }));
      }
      setTempAnswer(null);
      if (currentFollowUpIndex < followUpQuestions.length - 1) {
        setCurrentFollowUpIndex((prevIndex) => prevIndex + 1);
      }
    };
  
    const handleGetDiagnosis = async (event) => {
        event.preventDefault();
        setIsLoading(true);
      
        // Construct the final payload directly
        const finalPayload = {
          species: petDetails.species,
          breed: petDetails.breed,
          gender: petDetails.gender,
          symptoms: petDetails.symptoms,
          follow_up: {
            ...petDetails.follow_up,
            // Update the current question's follow_up if needed:
            ...(currentQuestion && {
              [currentQuestion.key]:
                tempAnswer !== null
                  ? tempAnswer
                  : petDetails.follow_up[currentQuestion.key],
            }),
          },
        };
      
        try {
          const response = await fetch(
            "https://vet-vista.onrender.com/diagnosis/model",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(finalPayload),
            }
          );
      
          if (response.ok) {
            const data = await response.json();
            console.log(petDetails)
            toast.success("Diagnosis submitted successfully!");
            console.log(data);
            return data;
          } else {
            toast.error("Oops! Something went wrong");
          }
        } catch (err) {
          toast.error("An error occurred while submitting diagnosis");
          console.error("error message:", err);
        } finally {
          setIsLoading(false);
        }
      };
  
    return (
      <>
        <section className="diagnosis-page-general-section">
          <h2>Diagnosis</h2>
          <br />
  
          <section className="diagnosis-main-container">
            {/* "How it works" container */}
            <div
              ref={HowItWorksContainer}
              className="diagnosis-page-howItWorks-container"
            >
              <h1>Begin Diagnosis</h1>
              <br />
              <h3>How it works</h3>
              <br />
              <ol>
                <li>Enter the species, breed, and gender of your pet.</li>
                <li>Enter a list of observed symptoms (between 2 and 4).</li>
                <li>Answer follow-up questions from the system.</li>
                <li>Submit, and wait for the prognosis report.</li>
              </ol>
              <br />
              <button onClick={handleRemoveHowItWorks}>Begin</button>
            </div>
  
            {/* Multi-step form container */}
            <section className="diagnosis-page-form-container">
              {/* Step 1: Pet Info */}
              {step === 1 && (
                <form
                  className="petDetailsForm"
                  ref={petDetailsForm}
                  onSubmit={handleStep1Next}
                  style={{ display: "none" }}
                >
                  <h1>Provide Your Pet Details</h1>
                  <div>
                    <input
                      type="text"
                      name="species"
                      placeholder="Species"
                      value={petDetails.species}
                      onChange={(e) =>
                        setPetDetails({
                          ...petDetails,
                          species: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="breed"
                      placeholder="Breed"
                      value={petDetails.breed}
                      onChange={(e) =>
                        setPetDetails({
                          ...petDetails,
                          breed: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="gender"
                      placeholder="Gender"
                      value={petDetails.gender}
                      onChange={(e) =>
                        setPetDetails({
                          ...petDetails,
                          gender: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button type="submit">Next</button>
                </form>
              )}
  
              {/* Step 2: Symptoms */}
              {step === 2 && (
                <form className="petSymptomsForm" onSubmit={handleStep2Next}>
                  <h3>Enter Observable Symptoms</h3>
                  {symptomInputs.map((symptom, index) => (
                    <div key={index}>
                      {/* Fixed string interpolation with backticks */}
                      <input
                        type="text"
                        value={symptom}
                        placeholder={`Symptom ${index + 1}`}
                        onChange={(e) =>
                          handleSymptomChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <div
                    className="add-symptom-button-container"
                    style={{ textAlign: "right" }}
                  >
                    <button
                      className="addSymptomButton"
                      type="button"
                      onClick={handleAddSymptom}
                      disabled={symptomInputs.length >= 4}
                    >
                      Add Symptom
                    </button>
                  </div>
                  <br />
                  <button className="add-symptoms-next-Button" type="submit">
                    Next
                  </button>
                </form>
              )}
  
              {/* Step 3: One Question Per Page */}
              {step === 3 && currentQuestion && (
                <div className={"follow-up-questions-container"}>
                  <div className="followUpQuestionCard">
                    <h2>{currentQuestion.label}</h2>
                    <p className="why-ask-this">
                      <strong>Why ask this?</strong>{" "}
                      {currentQuestion.explanation}
                    </p>
  
                    {/* True/False Buttons */}
                    <div className="answerButtons">
                      <button
                        className={tempAnswer === true ? "selected" : ""}
                        onClick={() => setTempAnswer(true)}
                      >
                        True
                      </button>
                      <button
                        className={tempAnswer === false ? "selected" : ""}
                        onClick={() => setTempAnswer(false)}
                      >
                        False
                      </button>
                    </div>
  
                    {/* Navigation Buttons */}
                    <div className="navButtons">
                      {currentFollowUpIndex > 0 && (
                        <button
                          className={"follow-up-previous-button"}
                          onClick={handlePreviousQuestion}
                        >
                          Previous
                        </button>
                      )}
                      {currentFollowUpIndex < followUpQuestions.length - 1 ? (
                        <button
                          className={"follow-up-next-button"}
                          onClick={handleNextQuestion}
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          className="getDiagnosisButton"
                          onClick={handleGetDiagnosis}
                        >
                          {isLoading ? <SmallLoader /> : "Get Diagnosis"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>
          </section>
        </section>
        <Toaster position="top-center" />
      </>
    );
  };
  



// =====================================================================

export const NearbyVetsPage = () => {
    return (
        <div>NEARBY VETS PAGE</div>
    )
}
