
import React, { createContext, useEffect, useState } from "react";

// import propTypes from "prop-types"

// This is a global variable set as a context api
export const AppContext = createContext("here");

export const AppcontextProvider = (props) => {




    const { children } = props;

    // Here i am destructing the form details from the student sign in form, so it can be accessble for later

    const [dashBoardClick, setDashBoardClick] = useState(true)
    const [myPetsButtonClick, setMyPetsButtonClick] = useState(false)
    const [diagnosisButtonClick, setDiagnosisButtonClick] = useState(false)
    const [nearbyVetButtonClick, setNearbyVetButtonClick] = useState(false)








    





    //   Here, is where i place the variables i want to make accessible to all components in my Project
    const contextValue = {
        dashBoardClick, setDashBoardClick, myPetsButtonClick, setMyPetsButtonClick, diagnosisButtonClick, setDiagnosisButtonClick, nearbyVetButtonClick, setNearbyVetButtonClick
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// AppcontextProvider.propTypes = {
//     children: propTypes.node.isRequired //Validating children PROPS
// }
