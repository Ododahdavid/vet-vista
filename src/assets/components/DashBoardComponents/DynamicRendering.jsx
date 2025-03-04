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
        name: "",
        age: "",
        specie: "",
        breed: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setNewPetDetails({ ...newPetDetails, [name]: value });
    };

    const handleFormValidation = () => {
        if (
            newPetDetails.name.trim() === "" ||
            newPetDetails.age.trim() === "" ||
            newPetDetails.specie.trim() === "" ||
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

    const uploadPetSubmission = async (event) => {
        event.preventDefault();

        if (!handleFormValidation()) {
            setIsLoading(false); // Ensure loader stops if validation fails
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch('https://vet-vista.onrender.com/addpet/addpet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPetDetails),
            });

            if (response.ok) {
                toast.success("Pet added successfully", {
                    style: {
                        background: "rgb(144, 234, 96)",
                    },
                });
                setNewPetDetails({
                    name: "",
                    age: "",
                    species: "",
                    breed: ""
                });
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
                        <input type="text" name="name" value={newPetDetails.name} placeholder="Name" onChange={handleInputChange} />
                        <input type="number" name="age" value={newPetDetails.age} placeholder="Age" onChange={handleInputChange} />
                        <input type="text" name="specie" value={newPetDetails.specie} placeholder="Specie" onChange={handleInputChange} />
                        <input type="text" name="breed" value={newPetDetails.breed} placeholder="Breed" onChange={handleInputChange} />

                        <button type="submit">
                            {isLoading ? <SmallLoader /> : "Add"}
                        </button>
                    </form>
                </section>

                <Toaster position="top-center" reverseOrder={false} />
            </section>
        </>
    );
};


// =====================================================================

export const DiagnosisPage = () => {
    return (
        <div>DIAGNOSIS PAGE</div>
    )
}

// =====================================================================

export const NearbyVetsPage = () => {
    return (
        <div>NEARBY VETS PAGE</div>
    )
}
