import React, { useContext } from 'react'
import DashboardSidebar from '../components/DashBoardComponents/DashboardSidebar'
import { DashboardPage, MypetPage, DiagnosisPage, NearbyVetsPage } from '../components/DashBoardComponents/DynamicRendering'
import { AppContext } from '../components/general components/ContextApi'

const DashBoardPage = () => {
    const { dashBoardClick, myPetsButtonClick, diagnosisButtonClick, nearbyVetButtonClick } = useContext(AppContext)
    
    return (
        <section className="dashboardContainer">
            <DashboardSidebar />

            <div className="dashboard-dynamic-section">
                {dashBoardClick && <DashboardPage />}
                {myPetsButtonClick && <MypetPage />}
                {diagnosisButtonClick && <DiagnosisPage />}
                {nearbyVetButtonClick && <NearbyVetsPage />}
            </div>
        </section>
    )
}

export default DashBoardPage