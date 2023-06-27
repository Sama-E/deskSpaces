import "/src/assets/css/pages/auth/login.scss";
import FormInput from "src/components/forms/FormInput";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "/src/context/authContext";


const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
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
  ]

  //Backend Errors
  const [err, setErr] = useState(null);

  //Values to automatically updates name values
  const onChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value })
  }

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(values);
      navigate("/")
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
  );
};

export default Login;