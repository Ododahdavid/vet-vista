import React, { Suspense } from "react"
import { useState } from 'react'
// import './App.css'
import "./assets/CSS/Home.css"
import "./assets/CSS/SignUp.css"
import "./assets/CSS/DashBoard.css"
import "./assets/CSS/loaders.css"
import "./assets/CSS/bigLoader.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppcontextProvider } from "./assets/components/general components/ContextApi.jsx";
import BigLoader from "./assets/components/loaders/BigLoader.jsx"


// import SignUp from "./assets/pages/SignUp.jsx";

const SignUp = React.lazy(() => import("./assets/pages/SignUp.jsx"))
const HomePage = React.lazy(() => import("./assets/pages/Home.jsx"))
const LoginPage = React.lazy(() => import("./assets/pages/Login.jsx"))
const DashBoardPage = React.lazy(() => import("./assets/pages/DashBoardPage.jsx"))

function App() {

  return (
    <>
      <AppcontextProvider>
        <Router>
          <Suspense fallback={<BigLoader/>}>
            <Routes>
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/dashboardpage" element={<DashBoardPage />} />
            </Routes>
          </Suspense>
        </Router>
      </AppcontextProvider>
    </>
  )
}

export default App
