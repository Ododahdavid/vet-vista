import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import SmallLoader from '../loaders/SmallLoader.jsx';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import BigLoader from '../loaders/BigLoader.jsx';
import { getPetIcon } from '../general components/PetIcons.jsx';
ChartJS.register(ArcElement, Tooltip, Legend);



export const DashboardPage = () => {
    const [username, setUsername] = useState("");
  
    useEffect(() => {
      const storedData = localStorage.getItem("loginDetails");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.name) {
          setUsername(parsedData.name);
        }
      }
    }, []);
  
    // 15 static news items
    const newsData = [
      {
        id: 1,
        title: "Rabies @ Nation Town",
        description: "Hide your dogs, keep your cats, and release all hounds on earth.",
        comments: 12,
        likes: 5,
        avatarColors: ["#FFB6C1", "#FFD700", "#ADD8E6"],
      },
      {
        id: 2,
        title: "Avian Flu Cases",
        description: "Local farms on alert as bird flu spreads rapidly.",
        comments: 8,
        likes: 10,
        avatarColors: ["#98FB98", "#FFA07A"],
      },
      {
        id: 3,
        title: "Foot-and-Mouth Outbreak",
        description: "Livestock quarantined in eastern regions to contain disease.",
        comments: 14,
        likes: 7,
        avatarColors: ["#FFC0CB", "#B0E0E6", "#FFFFE0"],
      },
      {
        id: 4,
        title: "Parvovirus in Puppies",
        description: "Veterinarians urge timely vaccinations for new pups.",
        comments: 5,
        likes: 2,
        avatarColors: ["#F0E68C", "#FA8072", "#E6E6FA"],
      },
      {
        id: 5,
        title: "Tick Fever on the Rise",
        description: "Tick-borne diseases spike as summer heat intensifies.",
        comments: 9,
        likes: 4,
        avatarColors: ["#FFDAB9", "#B0C4DE", "#FF7F50"],
      },
      {
        id: 6,
        title: "Distemper Outbreak",
        description: "Local shelters offering free distemper vaccines.",
        comments: 11,
        likes: 6,
        avatarColors: ["#FF69B4", "#8FBC8F", "#CD5C5C"],
      }
    ];
  
    return (
      <>
        <section className="dashboard-page-section">
          <div className="dashboard-page-header">
            <h3>Dashboard</h3>
            <br />
            <h1>Welcome, {username}</h1>
          </div>

          <section className="news-section">
          <h2>News</h2>
          <div className="news-cards-container">
            {newsData.map((item) => (
              <div className="news-card" key={item.id}>
                <div className="news-badge">New</div>
                <h3>{item.title}</h3>
                <p className="news-description">{item.description}</p>
  
                <div className="news-footer">
                  <div className="avatar-group">
                    {item.avatarColors.map((color, index) => (
                      <div
                        className="avatar-circle"
                        style={{ backgroundColor: color }}
                        key={index}
                      ></div>
                    ))}
                  </div>
  
                  <div className="news-meta">
                    <span>{item.comments} comments</span>
                    <span>{item.likes} Likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        </section>
  
        {/* News Section */}
       
      </>
    );
  };
// =====================================================================

export const MypetPage = () => {
    const [newPetDetails, setNewPetDetails] = useState({
      animal_name: "",
      age: "",
      species: "",
      breed: "",
    });
    const [userId, setUserId] = useState("");
    const [pets, setPets] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const storedData = localStorage.getItem("loginDetails");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.id) {
          setUserId(parsedData.id);
        }
      }
    }, []);
  
    useEffect(() => {
      if (userId) {
        fetchUserPets();
      }
    }, [userId]);
  
    const fetchUserPets = async () => {
      try {
        const response = await fetch(
          `https://vet-vista.onrender.com/mypets/allpets/${Number(userId)}`
        );
        if (response.ok) {
          const data = await response.json();
          setPets(data);
        } else {
          toast.error("Failed to fetch pets");
        }
      } catch (error) {
        toast.error("Error fetching pets");
        console.error(error);
      }
    };
  
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
        toast.error("Please fill all the fields");
        return false;
      }
      return true;
    };
  
    const uploadPetSubmission = async (event) => {
      event.preventDefault();
  
      if (!handleFormValidation()) {
        setIsLoading(false);
        return;
      }
  
      try {
        const payload = { ...newPetDetails, user_id: Number(userId) };
        setIsLoading(true);
        const response = await fetch(
          "https://vet-vista.onrender.com/mypets/addpet",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
  
        if (response.ok) {
          toast.success("Pet added successfully");
          setNewPetDetails({
            animal_name: "",
            age: "",
            species: "",
            breed: "",
          });
          fetchUserPets();
        } else {
          toast.error("Failed to add pet. Please try again.");
        }
      } catch (err) {
        toast.error("Oops! Something went wrong");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <>
        <section className="my-pet-page-section">
          <div className="my-pet-header">
            <h3>My Pets</h3>
            <br />
            <h1>Your personal vet inventory</h1>
          </div>
          <br />
  
          <section className="add-new-pet-section">
            <div className="add-new-pet-form-picture">
              {/* Some decorative SVG or image */}
              <svg
                width="74"
                height="54"
                viewBox="0 0 74 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* your path here */}
              </svg>
  
              <br />
              <h3>Add Pet</h3>
              <p>Include your personal pet</p>
            </div>
  
            <form onSubmit={uploadPetSubmission} className="add-new-pet-form">
              <input
                type="text"
                name="animal_name"
                value={newPetDetails.animal_name}
                placeholder="Name"
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="age"
                value={newPetDetails.age}
                placeholder="Age"
                onChange={handleInputChange}
              />
  
              {/* Species Dropdown */}
              <select
                className="animal-dropdown-select-my-pet-page"
                name="species"
                value={newPetDetails.species}
                onChange={(e) => {
                  const species = e.target.value;
                  setNewPetDetails({
                    ...newPetDetails,
                    species,
                    breed: "", // reset breed on species change
                  });
                }}
              >
                <option value="" disabled>
                  Select Animal
                </option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="cow">Cow</option>
                <option value="rabbit">Rabbit</option>
                <option value="horse">Horse</option>
                <option value="goat">Goat</option>
                <option value="sheep">Sheep</option>
                <option value="pig">Pig</option>
              </select>
  
              {/* Breed Dropdown */}
              <select
                className="animal-dropdown-select-my-pet-page"
                name="breed"
                value={newPetDetails.breed}
                onChange={(e) =>
                  setNewPetDetails({
                    ...newPetDetails,
                    breed: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select Breed
                </option>
                {newPetDetails.species === "dog" && (
                  <>
                    <option value="Labrador">Labrador</option>
                    <option value="Beagle">Beagle</option>
                    <option value="German shepherd">German shepherd</option>
                    <option value="Bulldog">Bulldog</option>
                    <option value="Poodle">Poodle</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Siberian Husky">Siberian Husky</option>
                    <option value="Golden Retriever">Golden Retriever</option>
                    <option value="Dachshund">Dachshund</option>
                    <option value="Husky">Husky</option>
                    <option value="Border collie">Border collie</option>
                    <option value="Labrador retriever">Labrador retriever</option>
                    <option value="Rottweiler">Rottweiler</option>
                    <option value="Shih Tzu">Shih Tzu</option>
                    <option value="Dalmatian">Dalmatian</option>
                    <option value="Akita">Akita</option>
                    <option value="Boxer">Boxer</option>
                    <option value="Corgi">Corgi</option>
                    <option value="Doberman pinscher">Doberman pinscher</option>
                    <option value="Pit Bull">Pit Bull</option>
                    <option value="Cocker spaniel">Cocker spaniel</option>
                    <option value="Yorkshire Terrier">Yorkshire Terrier</option>
                  </>
                )}
                {newPetDetails.species === "cat" && (
                  <>
                    <option value="Scottish Fold">Scottish Fold</option>
                    <option value="Russian Blue">Russian Blue</option>
                    <option value="Ragdoll">Ragdoll</option>
                    <option value="Sphynx">Sphynx</option>
                    <option value="Abyssinian">Abyssinian</option>
                    <option value="Siberian">Siberian</option>
                    <option value="Siamese">Siamese</option>
                    <option value="Bombay">Bombay</option>
                    <option value="Persian">Persian</option>
                    <option value="Burmese">Burmese</option>
                    <option value="Devon Rex">Devon Rex</option>
                    <option value="Manx">Manx</option>
                    <option value="Maine Coon">Maine Coon</option>
                    <option value="American Curl">American Curl</option>
                    <option value="Bengal">Bengal</option>
                    <option value="British Shorthair">British Shorthair</option>
                  </>
                )}
                {newPetDetails.species === "cow" && (
                  <>
                    <option value="Red Angus">Red Angus</option>
                    <option value="Ayrshire">Ayrshire</option>
                    <option value="Hereford">Hereford</option>
                    <option value="Red Poll">Red Poll</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Dexter">Dexter</option>
                    <option value="Brown Swiss">Brown Swiss</option>
                    <option value="Limousin">Limousin</option>
                    <option value="Charolais">Charolais</option>
                    <option value="Holstein">Holstein</option>
                    <option value="Shorthorn">Shorthorn</option>
                    <option value="Aberdeen Angus">Aberdeen Angus</option>
                    <option value="Brahman">Brahman</option>
                    <option value="Angus">Angus</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Belted Galloway">Belted Galloway</option>
                    <option value="Simmental">Simmental</option>
                  </>
                )}
                {newPetDetails.species === "rabbit" && (
                  <>
                    <option value="English Lop">English Lop</option>
                    <option value="Flemish Giant">Flemish Giant</option>
                    <option value="Mini Rex">Mini Rex</option>
                    <option value="Mini Lop">Mini Lop</option>
                    <option value="Holland Lop">Holland Lop</option>
                    <option value="English Spot">English Spot</option>
                    <option value="Dutch">Dutch</option>
                    <option value="Himalayan">Himalayan</option>
                    <option value="English Angora">English Angora</option>
                  </>
                )}
                {newPetDetails.species === "horse" && (
                  <>
                    <option value="Thoroughbred">Thoroughbred</option>
                    <option value="Mustang">Mustang</option>
                    <option value="Appaloosa">Appaloosa</option>
                    <option value="Arabian">Arabian</option>
                    <option value="American Quarter">American Quarter</option>
                    <option value="Morgan">Morgan</option>
                    <option value="Percheron">Percheron</option>
                    <option value="Shire">Shire</option>
                    <option value="Welsh Pony">Welsh Pony</option>
                    <option value="Tennessee Walker">Tennessee Walker</option>
                    <option value="Belgian">Belgian</option>
                    <option value="Paint">Paint</option>
                    <option value="Shetland Pony">Shetland Pony</option>
                    <option value="Tennessee Walking Horse">Tennessee Walking Horse</option>
                    <option value="Andalusian">Andalusian</option>
                    <option value="Pinto">Pinto</option>
                    <option value="Quarter Horse">Quarter Horse</option>
                    <option value="Standardbred">Standardbred</option>
                    <option value="Clydesdale">Clydesdale</option>
                  </>
                )}
                {newPetDetails.species === "goat" && (
                  <>
                    <option value="Nigerian Dwarf">Nigerian Dwarf</option>
                    <option value="Kiko">Kiko</option>
                    <option value="Saanen">Saanen</option>
                    <option value="Angora">Angora</option>
                    <option value="Toggenburg">Toggenburg</option>
                    <option value="Alpine">Alpine</option>
                    <option value="Boer">Boer</option>
                    <option value="Nubian">Nubian</option>
                    <option value="LaMancha">LaMancha</option>
                  </>
                )}
                {newPetDetails.species === "sheep" && (
                  <>
                    <option value="Blackface">Blackface</option>
                    <option value="Romney">Romney</option>
                    <option value="Karakul">Karakul</option>
                    <option value="Suffolk">Suffolk</option>
                    <option value="Cheviot">Cheviot</option>
                    <option value="Leicester Longwool">Leicester Longwool</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Merino">Merino</option>
                    <option value="Southdown">Southdown</option>
                    <option value="Hampshire">Hampshire</option>
                    <option value="Lincoln">Lincoln</option>
                    <option value="Finnsheep">Finnsheep</option>
                    <option value="Dorset">Dorset</option>
                    <option value="Texel">Texel</option>
                    <option value="Corriedale">Corriedale</option>
                    <option value="Dorper">Dorper</option>
                    <option value="Rambouillet">Rambouillet</option>
                    <option value="Border Leicester">Border Leicester</option>
                  </>
                )}
                {newPetDetails.species === "pig" && (
                  <>
                    <option value="Hampshire">Hampshire</option>
                    <option value="Wessex Saddleback">Wessex Saddleback</option>
                    <option value="Yorkshire">Yorkshire</option>
                    <option value="Berkshire">Berkshire</option>
                    <option value="Poland China">Poland China</option>
                    <option value="Pietrain">Pietrain</option>
                    <option value="Duroc">Duroc</option>
                    <option value="Landrace">Landrace</option>
                    <option value="Large White">Large White</option>
                    <option value="Chester White">Chester White</option>
                    <option value="Tamworth">Tamworth</option>
                  </>
                )}
              </select>
  
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
                    {/* Pet Icon */}
                    <div className="pet-icon">{getPetIcon(pet.species)}</div>
  
                    {/* Pet Info */}
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
    // Stores the API response (which now includes description and solution per disease)
    const [diagnosisResults, setDiagnosisResults] = useState(null);
    // Step tracking: 1 (pet info), 2 (symptoms), 3 (follow-up Qs), 4 (results)
    const [step, setStep] = useState(1);
    // For step 2 (symptoms)
    const [symptomInputs, setSymptomInputs] = useState(["", ""]);
    // For step 3 (one question per page)
    const [currentFollowUpIndex, setCurrentFollowUpIndex] = useState(0);
    const [tempAnswer, setTempAnswer] = useState(null);
    // New state: when true, the solutions page is shown instead of the results
    const [viewSolutions, setViewSolutions] = useState(false);
    // New state for modal popup
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDiseaseDesc, setSelectedDiseaseDesc] = useState("");

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
        const formattedData = {
            symptoms: symptomInputs.filter((symptom) => symptom.trim() !== ""),
        };

        if (formattedData.symptoms.length < 2) {
            toast.error("Please enter at least 2 symptoms");
            return;
        }
        setPetDetails((prev) => ({ ...prev, symptoms: formattedData.symptoms }));
        setStep(3);
    };

    // ----- Step 3: Follow-up Questions -----
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

    // ----- Step 4: Get Diagnosis and Show Results -----
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
                toast.success("Diagnosis submitted successfully!");
                // Save results and move to step 4 (results page)
                setDiagnosisResults(data);
                setStep(4);
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

    // ----- Modal functions for Disease Description -----
    const openModal = (description) => {
        setSelectedDiseaseDesc(description);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedDiseaseDesc("");
    };

    // ----- Render Diagnosis Results Page -----
    const renderResultsPage = () => {
        if (!diagnosisResults || !diagnosisResults.prioritized_results) return null;

        // Assuming each entry is now [disease, percentage, description, solution]
        const sortedResults = Object.entries(diagnosisResults.prioritized_results)
            .map(([key, value]) => ({
                key,
                disease: value[0],
                percentage: value[1],
                // Swap description and solution fields:
                description: value[3],
                solution: value[2],
            }))
            .sort((a, b) => b.percentage - a.percentage);


        // Example chart data & options (adjust as needed)
        const chartData = {
            labels: sortedResults.map((result) => result.disease),
            datasets: [
                {
                    data: sortedResults.map((result) => result.percentage),
                    backgroundColor: [
                        "#88D7B7",
                        "#70C1B3",
                        "#B2F7EF",
                        "#98DDDE",
                        "#5FB49C",
                        "#1DAA8F",
                    ],
                    hoverBackgroundColor: [
                        "#7CCBA9",
                        "#62B2A5",
                        "#A3E2DF",
                        "#87C9CA",
                        "#4CA28C",
                        "#169B7F",
                    ],
                },
            ],
        };

        const chartOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        font: {
                            size: 14,
                        },
                    },
                },
            },
        };

        return (
            <div className="diagnosis-results-page">
                <h2>Diagnosis Results</h2>
                {/* Pet Details Summary */}
                <div className="pet-details-summary">
                    <h3>Pet Details</h3>
                    <p>
                        <strong>Species:</strong> {petDetails.species}
                    </p>
                    <p>
                        <strong>Breed:</strong> {petDetails.breed}
                    </p>
                    <p>
                        <strong>Gender:</strong> {petDetails.gender}
                    </p>
                    <p>
                        <strong>Symptoms:</strong> {petDetails.symptoms.join(", ")}
                    </p>
                    <div>
                        <strong>Follow-up Responses:</strong>
                        <ul>
                            {Object.entries(petDetails.follow_up).map(([key, value]) => (
                                <li key={key}>
                                    {key.replace(/_/g, " ")}: {value ? "Yes" : "No"}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Results Content: Disease List & Chart */}
                <div className="results-content">
                    <div className="results-list">
                        <h3>Prioritized Diseases</h3>
                        <ul>
                            {sortedResults.map((result) => (
                                <li key={result.key}>
                                    <span className="disease-name">{result.disease}</span>
                                    <span className="disease-percentage">
                                        {result.percentage.toFixed(2)}%
                                    </span>
                                    {/* Info icon to trigger description modal */}
                                    <span
                                        className="info-icon"
                                        onClick={() => openModal(result.description)}
                                    >
                                        &#x3f;
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="chart-container">
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>
                </div>
                <button
                    className="view-solutions-button"
                    onClick={() => setViewSolutions(true)}
                >
                    View Possible Solutions
                </button>
            </div>
        );
    };

    // ----- Render Solutions Page -----
    const renderSolutionsPage = () => {
        if (!diagnosisResults || !diagnosisResults.prioritized_results) return null;

        const sortedResults = Object.entries(diagnosisResults.prioritized_results)
            .map(([key, value]) => ({
                key,
                disease: value[0],
                percentage: value[1],
                // Swap these two so that:
                // description is now at index 3 (to show in the modal)
                // solution is at index 2 (to show on the solutions page)
                solution: value[2],
                description: value[3],
            }))
            .sort((a, b) => b.percentage - a.percentage);

        return (
            <div className="solutions-page">
                <h2>Possible Solutions</h2>
                <ul>
                    {sortedResults.map((result) => (
                        <li key={result.key}>
                            <h3>{result.disease}</h3>
                            <p>{result.solution}</p>
                        </li>
                    ))}
                </ul>
                <button
                    className="back-to-results-button"
                    onClick={() => setViewSolutions(false)}
                >
                    Back to Results
                </button>
            </div>
        );
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
                            <li>
                                Enter a list of observed symptoms (between 2 and 4).
                            </li>
                            <li>Answer follow-up questions from the system.</li>
                            <li>Submit and wait for the prognosis report.</li>
                        </ol>
                        <br />
                        <button onClick={handleRemoveHowItWorks}>Begin</button>
                    </div>

                    {/* Multi-step form (Steps 1-3) */}
                    {step !== 4 && (
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
                                        <select
                                            className="animal-dropdown-select"
                                            name="species"
                                            value={petDetails.species}
                                            onChange={(e) => {
                                                const species = e.target.value;
                                                setPetDetails({
                                                    ...petDetails,
                                                    species,
                                                    breed: "",
                                                });
                                            }}
                                        >
                                            <option value="" disabled>
                                                Select Animal
                                            </option>
                                            <option value="dog">Dog</option>
                                            <option value="cat">Cat</option>
                                            <option value="cow">Cow</option>
                                            <option value="rabbit">Rabbit</option>
                                            <option value="horse">Horse</option>
                                            <option value="goat">Goat</option>
                                            <option value="sheep">Sheep</option>
                                            <option value="pig">Pig</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            className="animal-dropdown-select"
                                            name="breed"
                                            value={petDetails.breed}
                                            onChange={(e) =>
                                                setPetDetails({
                                                    ...petDetails,
                                                    breed: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="" disabled>
                                                Select Breed
                                            </option>
                                            {petDetails.species === "dog" && (
                                                <>
                                                    <option value="Labrador">Labrador</option>
                                                    <option value="Beagle">Beagle</option>
                                                    <option value="German shepherd">German shepherd</option>
                                                    <option value="Bulldog">Bulldog</option>
                                                    <option value="Poodle">Poodle</option>
                                                    <option value="Chihuahua">Chihuahua</option>
                                                    <option value="Siberian Husky">Siberian Husky</option>
                                                    <option value="Golden Retriever">Golden Retriever</option>
                                                    <option value="Dachshund">Dachshund</option>
                                                    <option value="Husky">Husky</option>
                                                    <option value="Border collie">Border collie</option>
                                                    <option value="Labrador retriever">Labrador retriever</option>
                                                    <option value="Rottweiler">Rottweiler</option>
                                                    <option value="Shih Tzu">Shih Tzu</option>
                                                    <option value="Dalmatian">Dalmatian</option>
                                                    <option value="Akita">Akita</option>
                                                    <option value="Boxer">Boxer</option>
                                                    <option value="Corgi">Corgi</option>
                                                    <option value="Doberman pinscher">Doberman pinscher</option>
                                                    <option value="Pit Bull">Pit Bull</option>
                                                    <option value="Cocker spaniel">Cocker spaniel</option>
                                                    <option value="Yorkshire Terrier">Yorkshire Terrier</option>

                                                </>
                                            )}
                                            {petDetails.species === "cat" && (
                                                <>
                                                    <option value="Scottish Fold">Scottish Fold</option>
                                                    <option value="Russian Blue">Russian Blue</option>
                                                    <option value="Ragdoll">Ragdoll</option>
                                                    <option value="Sphynx">Sphynx</option>
                                                    <option value="Abyssinian">Abyssinian</option>
                                                    <option value="Siberian">Siberian</option>
                                                    <option value="Siamese">Siamese</option>
                                                    <option value="Bombay">Bombay</option>
                                                    <option value="Persian">Persian</option>
                                                    <option value="Burmese">Burmese</option>
                                                    <option value="Devon Rex">Devon Rex</option>
                                                    <option value="Manx">Manx</option>
                                                    <option value="Maine Coon">Maine Coon</option>
                                                    <option value="American Curl">American Curl</option>
                                                    <option value="Bengal">Bengal</option>
                                                    <option value="British Shorthair">British Shorthair</option>

                                                </>
                                            )}
                                            {petDetails.species === "cow" && (
                                                <>
                                                    <option value="Red Angus">Red Angus</option>
                                                    <option value="Ayrshire">Ayrshire</option>
                                                    <option value="Hereford">Hereford</option>
                                                    <option value="Red Poll">Red Poll</option>
                                                    <option value="Guernsey">Guernsey</option>
                                                    <option value="Dexter">Dexter</option>
                                                    <option value="Brown Swiss">Brown Swiss</option>
                                                    <option value="Limousin">Limousin</option>
                                                    <option value="Charolais">Charolais</option>
                                                    <option value="Holstein">Holstein</option>
                                                    <option value="Shorthorn">Shorthorn</option>
                                                    <option value="Aberdeen Angus">Aberdeen Angus</option>
                                                    <option value="Brahman">Brahman</option>
                                                    <option value="Angus">Angus</option>
                                                    <option value="Jersey">Jersey</option>
                                                    <option value="Belted Galloway">Belted Galloway</option>
                                                    <option value="Simmental">Simmental</option>

                                                </>
                                            )}
                                            {petDetails.species === "rabbit" && (
                                                <>
                                                    <option value="English Lop">English Lop</option>
                                                    <option value="Flemish Giant">Flemish Giant</option>
                                                    <option value="Mini Rex">Mini Rex</option>
                                                    <option value="Mini Lop">Mini Lop</option>
                                                    <option value="Holland Lop">Holland Lop</option>
                                                    <option value="English Spot">English Spot</option>
                                                    <option value="Dutch">Dutch</option>
                                                    <option value="Himalayan">Himalayan</option>
                                                    <option value="English Angora">English Angora</option>
                                                </>
                                            )}
                                            {petDetails.species === "horse" && (
                                                <>
                                                    <option value="Thoroughbred">Thoroughbred</option>
                                                    <option value="Mustang">Mustang</option>
                                                    <option value="Appaloosa">Appaloosa</option>
                                                    <option value="Arabian">Arabian</option>
                                                    <option value="American Quarter">American Quarter</option>
                                                    <option value="Morgan">Morgan</option>
                                                    <option value="Percheron">Percheron</option>
                                                    <option value="Shire">Shire</option>
                                                    <option value="Welsh Pony">Welsh Pony</option>
                                                    <option value="Tennessee Walker">Tennessee Walker</option>
                                                    <option value="Belgian">Belgian</option>
                                                    <option value="Paint">Paint</option>
                                                    <option value="Shetland Pony">Shetland Pony</option>
                                                    <option value="Tennessee Walking Horse">Tennessee Walking Horse</option>
                                                    <option value="Andalusian">Andalusian</option>
                                                    <option value="Pinto">Pinto</option>
                                                    <option value="Quarter Horse">Quarter Horse</option>
                                                    <option value="Standardbred">Standardbred</option>
                                                    <option value="Clydesdale">Clydesdale</option>
                                                </>
                                            )}
                                            {petDetails.species === "goat" && (
                                                <>
                                                    <option value="Nigerian Dwarf">Nigerian Dwarf</option>
                                                    <option value="Kiko">Kiko</option>
                                                    <option value="Saanen">Saanen</option>
                                                    <option value="Angora">Angora</option>
                                                    <option value="Toggenburg">Toggenburg</option>
                                                    <option value="Alpine">Alpine</option>
                                                    <option value="Boer">Boer</option>
                                                    <option value="Nubian">Nubian</option>
                                                    <option value="LaMancha">LaMancha</option>
                                                </>
                                            )}
                                            {petDetails.species === "sheep" && (
                                                <>
                                                    <option value="Blackface">Blackface</option>
                                                    <option value="Romney">Romney</option>
                                                    <option value="Karakul">Karakul</option>
                                                    <option value="Suffolk">Suffolk</option>
                                                    <option value="Cheviot">Cheviot</option>
                                                    <option value="Leicester Longwool">Leicester Longwool</option>
                                                    <option value="Tunis">Tunis</option>
                                                    <option value="Merino">Merino</option>
                                                    <option value="Southdown">Southdown</option>
                                                    <option value="Hampshire">Hampshire</option>
                                                    <option value="Lincoln">Lincoln</option>
                                                    <option value="Finnsheep">Finnsheep</option>
                                                    <option value="Dorset">Dorset</option>
                                                    <option value="Texel">Texel</option>
                                                    <option value="Corriedale">Corriedale</option>
                                                    <option value="Dorper">Dorper</option>
                                                    <option value="Rambouillet">Rambouillet</option>
                                                    <option value="Border Leicester">Border Leicester</option>

                                                </>
                                            )}
                                            {petDetails.species === "pig" && (
                                                <>
                                                    <option value="Hampshire">Hampshire</option>
                                                    <option value="Wessex Saddleback">Wessex Saddleback</option>
                                                    <option value="Yorkshire">Yorkshire</option>
                                                    <option value="Berkshire">Berkshire</option>
                                                    <option value="Poland China">Poland China</option>
                                                    <option value="Pietrain">Pietrain</option>
                                                    <option value="Duroc">Duroc</option>
                                                    <option value="Landrace">Landrace</option>
                                                    <option value="Large White">Large White</option>
                                                    <option value="Chester White">Chester White</option>
                                                    <option value="Tamworth">Tamworth</option>

                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            className="animal-dropdown-select"
                                            name="gender"
                                            value={petDetails.gender}
                                            onChange={(e) =>
                                                setPetDetails({
                                                    ...petDetails,
                                                    gender: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="" disabled>
                                                Select Gender
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
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

                            {/* Step 3: Follow-up Questions */}
                            {step === 3 && currentQuestion && (
                                <div className="follow-up-questions-container">
                                    <div className="followUpQuestionCard">
                                        <h2>{currentQuestion.label}</h2>
                                        <p className="why-ask-this">
                                            <strong>Why ask this?</strong>{" "}
                                            {currentQuestion.explanation}
                                        </p>
                                        <div className="answerButtons">
                                            <button
                                                className={tempAnswer === true ? "selected" : ""}
                                                onClick={() => setTempAnswer(true)}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className={tempAnswer === false ? "selected" : ""}
                                                onClick={() => setTempAnswer(false)}
                                            >
                                                No
                                            </button>
                                        </div>
                                        <div className="navButtons">
                                            {currentFollowUpIndex > 0 && (
                                                <button
                                                    className="follow-up-previous-button"
                                                    onClick={handlePreviousQuestion}
                                                >
                                                    Previous
                                                </button>
                                            )}
                                            {currentFollowUpIndex < followUpQuestions.length - 1 ? (
                                                <button
                                                    className="follow-up-next-button"
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
                    )}

                    {/* Step 4: Diagnosis Results or Solutions Page */}
                    {step === 4 &&
                        (viewSolutions ? renderSolutionsPage() : renderResultsPage())}
                </section>
            </section>

            {/* Modal for Disease Description */}
            {modalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Disease Description</h3>
                        <p>{selectedDiseaseDesc}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
                <div className={"disclaimer"}><h3 >Disclaimer: This system provides diagnosis suggestions and may not always be accurate. Consult a Veterinarian for confirmation</h3></div>


            <Toaster position="top-center" />
        </>
    );
};

// =====================================================================







export const NearbyVetsPage = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [vetStores, setVetStores] = useState([]);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  // Fetch nearby vet stores from your API
  const fetchData = async (lat, lon) => {
    try {
      const apiUrl = "https://vet-vista.onrender.com/vet-stores";
      const response = await fetch(`${apiUrl}/nearbyvet?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVetStores(data);
    } catch (error) {
      console.error("Error fetching vet stores:", error);
      setVetStores([]);
      setLocationError("Service temporarily unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Geolocation success and error callbacks
  const geoSuccess = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("User location:", { lat, lon });
    setUserPosition({ lat, lon });
    await fetchData(lat, lon);
  };

  const geoError = (error) => {
    console.error("Error getting location:", error);
    setLocationError("Please enable location access to use this feature.");
    setLoading(false);
  };

  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 10000, // 10 seconds
    maximumAge: 0,
  };

  // Get user's location once when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  // Initialize the map once we have the user position, vet stores, and the map container is rendered
  useEffect(() => {
    if (!userPosition || !window.google || !mapRef.current) return;

    const { lat, lon } = userPosition;
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng: lon },
      zoom: 12,
    });

    // Add a marker for the user location
    new window.google.maps.Marker({
      position: { lat, lng: lon },
      map,
      title: "Your Location",
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });

    // Add markers for each vet store
    vetStores.forEach((store) => {
      new window.google.maps.Marker({
        position: { lat: store.latitude, lng: store.longitude },
        map,
        title: store.name,
      });
    });
  }, [userPosition, vetStores]);

  return (
    <div className="nearby-vets-container">
      <h2>Nearby Vets</h2>

            <br />
            <br />

      {locationError && <p className="error-message">{locationError}</p>}
      {loading && <BigLoader/>}

      {!loading && !locationError && (
        <>
          <div id="map" ref={mapRef} className="map-container" />
          <div className="vet-details">
            <h3>Available Vet Services</h3>
            <table className="vet-table">
              <thead>
                <tr>
                  <th>Locations</th>
                  <th>Sessions</th>
                  <th>Time Frame</th>
                </tr>
              </thead>
              <tbody>
                {vetStores.length > 0 ? (
                  vetStores.map((store, index) => (
                    <tr key={store.id || index}>
                      <td>{store.name}</td>
                      <td className={store.status?.toLowerCase() || "open"}>
                        {store.status || "Open"}
                      </td>
                      <td>8am - 11pm</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-data">
                      No vet stores found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};