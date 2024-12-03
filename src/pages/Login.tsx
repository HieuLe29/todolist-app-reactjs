import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}
 
const Login = () => {
  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState<User>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = () => {
    if (formData.email === "hieu@gmail.com" && formData.password === "123456") {
      navigate('/');
    } else { 
      alert("Invalid email or password");
    }
  }

  return (
    <div className="form-container">
      <form className="inner-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Login Form</h2>
        <div className="form-group">
          <label>Email</label>
          <input 
            className="form-control"
            type="text" 
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            />
            {formError.email && <p className="error">{formError.email}</p>}
        </div>
       
       <div className="form-group">
        <label>Password</label>
        <input 
          className="form-control"
          type="password" 
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          />
          {formError.password && <p className="error">{formError.password}</p>}
       </div>

        <div className="form-group">
          <input
            className="button"
            type="submit"
            value={`${loading ? "Loging..." : "Login"}`}
          />
        </div>

        <Link className="forgot-password" to="/forgot-password">
          Forgot Password
        </Link>
      </form>
    </div>
  );
}

export default Login;