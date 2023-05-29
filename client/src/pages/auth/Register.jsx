import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "/src/assets/css/pages/auth/register.scss";

const Register = () => {

  //Inputs
  const [ inputs, setInputs] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  });

  const [err, setErr] = useState(null);

  //Prev to automatically updates name values
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault()

    try{
      await axios.post("http://localhost:8800/api/auths/register", inputs)
    } catch (err) {
      setErr(err.response.data);
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} />
            <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, voluptas sed sequi laboriosam voluptatibus eos ducimus dolorum reprehenderit itaque ut perspiciatis aut quis dolor tempora, sapiente fuga deserunt quo corporis?
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register;