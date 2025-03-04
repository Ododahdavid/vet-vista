import React, { useState } from 'react'
import GeneralNavbar from '../components/general components/GeneralNavbar'
import toast, { Toaster } from "react-hot-toast";
import SmallLoader from '../components/loaders/SmallLoader';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    })


    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleInputValueChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setloginData({ ...loginData, [name]: value });
    };

    const formDetailsValidation = (event) => {
        const { email, password } = loginData;

        if (
            email === "" ||
            password === ""
        ) {
            toast.error("Please fill all the fields", {
                style: {
                    background: "rgb(240, 139, 156)",
                },
            });
            return false;
        }
        else {
            return true;
        }

    }


    const handleLoginSubmit = async(event) => {
        event.preventDefault();
        if (formDetailsValidation()) {
            try {

                setIsLoading(true)
                const response = await fetch('https://vet-vista.onrender.com/auth/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(loginData),
                });

                if (response.ok) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("userDetails")
                    setIsLoading(false)
          
                    // TutorSignUpFormButton.current.disabled = false;
                    toast.success("Login Successful", {
                      style: {
                        background: "rgb(144, 234, 96)",
                      }
                    });
                  }

                  const userDetails = await response.json()
                  localStorage.setItem("loginDetails", JSON.stringify(userDetails))
                  localStorage.setItem("token", userDetails.access_token)
                  setloginData({
                    email: "",
                    password: "",
                  })
          
                  setTimeout(() => {
                    navigate("/dashboardpage")
                  }, 2000);
        

            }
            catch (err) {
                toast.error("Error Logging in", {
                    style: {
                        background: "rgb(240, 139, 156)",
                    },
                });
                setIsLoading(false)
                return false;
            }
        }
    }


    return (
        <>
            <GeneralNavbar />

            <section className={"LoginSection"}>

                <form onSubmit={handleLoginSubmit} className={"login-form"}>
                    <h2>Login</h2>
                    <p>To get started</p>

                    <br />
                    <input type="email" name="email" value={loginData.email} placeholder='E-mail:' className='SignUpEmailInputField' onChange={handleInputValueChange} />


                    <input type="password" name="password" value={loginData.password} placeholder='Password:' className='SignUpPasswordInputField' onChange={handleInputValueChange} />

                    <br />

                    <button  type='submit' className={"loginButton"}>
                        {
                            isLoading ? <SmallLoader /> : "Login"
                        }
                    </button>

                </form>
                        <Toaster position="top-center" reverseOrder={false} />
                

            </section>
        </>
    )
}

export default Login