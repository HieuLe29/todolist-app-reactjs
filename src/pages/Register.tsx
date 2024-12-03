import { useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  return (
    <div className="form-container">
    <form className="inner-container" >
      <h2 className="form-title">Signup Form</h2>
      <div className="form-group">
        <label>Name</label>
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Enter Username"
          
        />
       </div>

      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          type="text"
          name="email"
          placeholder="Enter Email"
        
        />
       </div>

      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Enter Password"
         
        />
       </div>

      <div className="form-group">
        <label>Confirm password</label>
        <input
          className="form-control"
          type="password"
          name="confirmPassword"
          placeholder="Enter Confirm Password"
         
        />
       </div>

      <div className="form-group">
        <input
          className="button"
          type="submit"
          value="Register"
        />
      </div>
    </form>
  </div>
  );
}

export default Register;