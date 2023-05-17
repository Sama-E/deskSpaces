import { Link } from "react-router-dom";
import "/src/assets/css/pages/auth/register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <button>Register</button>
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