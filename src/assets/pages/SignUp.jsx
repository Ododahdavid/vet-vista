import React, { useState } from 'react'
import GeneralNavbar from '../components/general components/GeneralNavbar'
import toast, { Toaster } from "react-hot-toast";
import SmallLoader from '../components/loaders/SmallLoader';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  const navigate = useNavigate(null)

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputValueChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const formDetailsValidation = (event) => {
    const { name, email, password } = signUpData;

    if (
      name === "" ||
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

  // submit function below
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    if (formDetailsValidation()) {
      try {
        setIsLoading(true)
        const response = await fetch('https://vet-vista.onrender.com/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signUpData),
        });

        if (response.ok) {
          localStorage.removeItem("token")
          localStorage.removeItem("userDetails")
          setIsLoading(false)

          // TutorSignUpFormButton.current.disabled = false;
          toast.success("User Created Successfully", {
            style: {
              background: "rgb(144, 234, 96)",
            },
          });
        }

        const userDetails = await response.json()
        localStorage.setItem("userDetails", JSON.stringify(userDetails))
        // localStorage.setItem("token", userDetails.token)
        setSignUpData({
          name: "",
          email: "",
          password: "",
        })

        setTimeout(() => {
          navigate("/login")
        }, 2000);

      }
      catch (err) {
        toast.error("Error signing up", {
          style: {
            background: "rgb(240, 139, 156)",
          },
        });
        console.log(err);
        return false;

      }
    }
  }


  return (
    <>
      <GeneralNavbar />
      <section className={"signUp-section"}>

        <form className={"signUp-form"} onSubmit={handleSignUpSubmit}>

          <h2>Register</h2>
          <br />
          <p>Create an account to access PetVista</p>

          <br />

          <input type="text" className={"SignUpUsernameInputField"} placeholder='Username: ' name='name' value={signUpData.name} onChange={handleInputValueChange} />

          <br />

          <input type="email" name="email" placeholder='E-mail:' className='SignUpEmailInputField' value={signUpData.email} onChange={handleInputValueChange} />

          <br />

          <input type="password" name="password" placeholder='Password:' className='SignUpPasswordInputField' value={signUpData.password} onChange={handleInputValueChange} />


          <br />
          <button type='submit' className={"signUpButton"}>
            {
              isLoading ? <SmallLoader /> : "Continue"
            }
          </button>

        </form>
        <Toaster position="top-center" reverseOrder={false} />


      </section>

    </>
  )
}

export default SignUp