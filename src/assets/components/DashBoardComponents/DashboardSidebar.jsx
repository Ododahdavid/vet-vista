import React, { useContext } from 'react'
import { AppContext } from '../general components/ContextApi'

const DashboardSidebar = () => {
    const {
        dashBoardClick,
        setDashBoardClick,
        myPetsButtonClick,
        setMyPetsButtonClick,
        diagnosisButtonClick,
        setDiagnosisButtonClick,
        nearbyVetButtonClick,
        setNearbyVetButtonClick
    } = useContext(AppContext);

    const handleDashboardClick = () => {
        setDashBoardClick(true);
        setMyPetsButtonClick(false);
        setDiagnosisButtonClick(false);
        setNearbyVetButtonClick(false);
    }

    const handleMypetsClick = () => {
        setDashBoardClick(false);
        setMyPetsButtonClick(true);
        setDiagnosisButtonClick(false);
        setNearbyVetButtonClick(false);
    }

    const handleDiagnosisClick = () => {
        setDashBoardClick(false);
        setMyPetsButtonClick(false);
        setDiagnosisButtonClick(true);
        setNearbyVetButtonClick(false);
    }

    const handleNearbyVetClick = () => {
        setDashBoardClick(false);
        setMyPetsButtonClick(false);
        setDiagnosisButtonClick(false);
        setNearbyVetButtonClick(true);
    }

    // Define common inline styles for the green line
    const greenLineStyle = (active) => ({
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        backgroundColor: 'green',
        display: active ? 'block' : 'none',
        borderRadius: "8px",
        transition: "all 0.25s"
    });

    // Each list item needs to be position relative for the absolute div
    const liStyle = {
        position: 'relative',
        cursor: 'pointer',
        paddingRight: '10px',
        marginBottom: '10px'
    };

    return (
        <aside className="DashBoard-sideBar">
            <div className="sideBar-Header">
                <h2>VetVista</h2>
            </div>
            <br />
            <div className="sideBar-menu">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li onClick={handleDashboardClick} style={liStyle}>
                        <div className="sidebar-menu-content">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_23_686)">
                                    <path d="M10 19V14H14V19C14 19.55 14.45 20 15 20H18C18.55 20 19 19.55 19 19V12H20.7C21.16 12 21.38 11.43 21.03 11.13L12.67 3.59997C12.29 3.25997 11.71 3.25997 11.33 3.59997L2.97 11.13C2.63 11.43 2.84 12 3.3 12H5V19C5 19.55 5.45 20 6 20H9C9.55 20 10 19.55 10 19Z" fill="#A3D0BE" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_23_686">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            Dashboard
                        </div>
                        <div style={greenLineStyle(dashBoardClick)}></div>
                    </li>

                    <li onClick={handleMypetsClick} style={liStyle}>
                        <div className="sidebar-menu-content">
                            <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_23_643)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.39286 2.46436C6.57964 2.46436 5.94221 2.95886 5.54793 3.55193C5.14871 4.14993 4.92857 4.93028 4.92857 5.75007C4.92857 6.56986 5.14871 7.35021 5.54793 7.94821C5.94221 8.53964 6.57964 9.03578 7.39286 9.03578C8.20607 9.03578 8.8435 8.54128 9.23779 7.94821C9.637 7.35021 9.85714 6.56986 9.85714 5.75007C9.85714 4.93028 9.637 4.14993 9.23779 3.55193C8.8435 2.9605 8.20607 2.46436 7.39286 2.46436ZM15.6071 2.46436C14.7939 2.46436 14.1565 2.95886 13.7622 3.55193C13.363 4.14993 13.1429 4.93028 13.1429 5.75007C13.1429 6.56986 13.363 7.35021 13.7622 7.94821C14.1565 8.53964 14.7939 9.03578 15.6071 9.03578C16.4204 9.03578 17.0578 8.54128 17.4521 7.94821C17.8513 7.35021 18.0714 6.56986 18.0714 5.75007C18.0714 4.93028 17.8513 4.14993 17.4521 3.55193C17.0578 2.9605 16.4204 2.46436 15.6071 2.46436ZM2.46429 9.85721C1.65107 9.85721 1.01364 10.3517 0.619357 10.9448C0.220143 11.5428 0 12.3231 0 13.1429C0 13.9627 0.220143 14.7431 0.619357 15.3411C1.01364 15.9325 1.65107 16.4286 2.46429 16.4286C3.2775 16.4286 3.91493 15.9341 4.30921 15.3411C4.70843 14.7431 4.92857 13.9627 4.92857 13.1429C4.92857 12.3231 4.70843 11.5428 4.30921 10.9448C3.91493 10.3534 3.2775 9.85721 2.46429 9.85721ZM11.5 9.85721C9.52857 9.85721 8.06807 10.9152 7.13493 12.2279C6.21329 13.5208 5.75 15.1259 5.75 16.4286C5.75 17.9466 6.66179 19.0014 7.78057 19.6355C8.88129 20.2598 10.2613 20.5358 11.5 20.5358C12.7387 20.5358 14.1187 20.2614 15.2194 19.6355C16.3366 19.0014 17.25 17.9466 17.25 16.4286C17.25 15.1259 16.7867 13.5208 15.8651 12.2279C14.9336 10.9136 13.4731 9.85721 11.5 9.85721ZM20.5357 9.85721C19.7225 9.85721 19.0851 10.3517 18.6908 10.9448C18.2916 11.5428 18.0714 12.3231 18.0714 13.1429C18.0714 13.9627 18.2916 14.7431 18.6908 15.3411C19.0851 15.9325 19.7225 16.4286 20.5357 16.4286C21.3489 16.4286 21.9864 15.9341 22.3806 15.3411C22.7799 14.7431 23 13.9627 23 13.1429C23 12.3231 22.7799 11.5428 22.3806 10.9448C21.9864 10.3534 21.3489 9.85721 20.5357 9.85721Z" fill="#A3D0BE" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_23_643">
                                        <rect width="23" height="23" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            My pets
                        </div>
                        <div style={greenLineStyle(myPetsButtonClick)}></div>
                    </li>

                    <li onClick={handleDiagnosisClick} style={liStyle}>
                        <div className="sidebar-menu-content">
                            <svg width="24" height="24" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.66667 17.2084H12.3333V15.2917H4.66667V17.2084ZM4.66667 14.3334H12.3333V12.4167H4.66667V14.3334ZM8.5 10.7876C9.55417 9.82925 10.4566 8.97889 11.2073 8.2365C11.958 7.49411 12.3333 6.7153 12.3333 5.90008C12.3333 5.32508 12.1257 4.82994 11.7104 4.41466C11.2951 3.99939 10.8 3.79175 10.225 3.79175C9.88959 3.79175 9.56599 3.85979 9.25421 3.99587C8.94243 4.13196 8.69103 4.31947 8.5 4.55841C8.30834 4.31883 8.05661 4.13132 7.74484 3.99587C7.43306 3.86043 7.10978 3.79239 6.775 3.79175C6.2 3.79175 5.70486 3.99939 5.28959 4.41466C4.87431 4.82994 4.66667 5.32508 4.66667 5.90008C4.66667 6.71466 5.0302 7.48133 5.75725 8.20008C6.48431 8.91883 7.39856 9.78133 8.5 10.7876ZM14.25 20.0834H2.75C2.22292 20.0834 1.77186 19.8959 1.39684 19.5209C1.02181 19.1458 0.833975 18.6945 0.833336 18.1667V2.83341C0.833336 2.30633 1.02117 1.85528 1.39684 1.48025C1.7725 1.10522 2.22356 0.917387 2.75 0.916748H14.25C14.7771 0.916748 15.2285 1.10458 15.6041 1.48025C15.9798 1.85591 16.1673 2.30697 16.1667 2.83341V18.1667C16.1667 18.6938 15.9792 19.1452 15.6041 19.5209C15.2291 19.8965 14.7777 20.0841 14.25 20.0834Z" fill="#A3D0BE" />
                            </svg>

                            Diagnosis AI
                        </div>
                        <div style={greenLineStyle(diagnosisButtonClick)}></div>
                    </li>

                    <li onClick={handleNearbyVetClick} style={liStyle}>
                        <div className="sidebar-menu-content">
                            <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 15.7168L7.28333 11.5001L11.5 7.28345L15.7167 11.5001L11.5 15.7168ZM11.5 21.8262L1.17396 11.5001L11.5 1.17407L21.826 11.5001L11.5 21.8262ZM11.5 18.4001L18.4 11.5001L11.5 4.60011L4.6 11.5001L11.5 18.4001Z" fill="#A3D0BE" />
                            </svg>

                            Nearby Vets
                        </div>
                        <div style={greenLineStyle(nearbyVetButtonClick)}></div>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default DashboardSidebar;


