import "/src/assets/css/pages/auth/login.scss";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "/src/context/authContext";

const Login = () => {

  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, voluptas sed sequi laboriosam voluptatibus eos ducimus dolorum reprehenderit itaque ut perspiciatis aut quis dolor tempora, sapiente fuga deserunt quo corporis?
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;