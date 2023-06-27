import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "/src/assets/css/pages/auth/register.scss";

import FormInput from "src/components/forms/FormInput";

const Register = () => {
  
  const navigate = useNavigate();

  const [ values, setValues] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirm_password:""
  });

  const inputs = [
    {
      id:1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      required: true,
      pattern:"^[A-Za-z0-9]{3,16}$",
      errorMessage: "First name should be 3-16 characters and shouldn't include any special characters.",
    },
    {
      id:2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      required: true,
      pattern:"^[A-Za-z0-9]{3,16}$",
      errorMessage: "Last name should be 3-16 characters and shouldn't include any special characters.",
    },
    {
      id:3,
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
      errorMessage: "Email should be a valid email address.",
    },
    {
      id:4,
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      errorMessage: "Password should be 8-20 characters and include 1 letter, 1 number and 1 special character.",
    },
    {
      id:5,
      name: "confirm_password",
      type: "password",
      placeholder: "Confirm Password",
      required: true,
      pattern: values.password,
      errorMessage: "Passwords don't match.",
    },
  ]

  //Backend Errors
  const [err, setErr] = useState(null);

  //Values to automatically updates name values
  const onChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      await axios.post("http://localhost:8800/api/auths/register", values)
      navigate("/login")
    } catch (err) {
      setErr(err.response.data);
    }
  }

  return (
    <div className="register">

            <form onSubmit={handleSubmit}>
            <h1>Register</h1>
              {inputs.map((input) => (
              <FormInput 
                key={input.id} 
                {...input}
                input={inputs[input.name]}
                onChange={onChange}
              />
              ))}
            {err && err}
            <button>Submit</button>
            </form>
        </div>
  )
}

export default Register;