import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";



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
    return (
        <>
            <section className={"my-pet-page-section"}>

                <div className={"my-pet-header"}>

                    <h3>My Pets</h3>
                    <br />
                    <h1>Your personal vet inventory</h1>

                </div>

            </section>
        </>
    )
}

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
