import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import {useLogin} from "../hooks/useAxiosPost";
import Validator from "validatorjs";
function Login() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const { email, setFormData, password ,error, formData,isLoading, login } = useLogin();
  const [validationErrors,setValidationErrors] = useState([]);
  
  if (isLoggedIn==="loged") {
   return <Navigate to ="/"></Navigate>
  }

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    const rules = {
      email: 'required|email',  
      password: 'required|min:8',
    };

    const validation = new Validator(data, rules);

    if (validation.fails()) {
      setValidationErrors(validation.errors.all());
      console.log(validation.errors.all());
      return;
    }

    setValidationErrors({email:'',password:''})
    await login();
   
  };

  return (
    <div className="ssss">
      <div className="container mt-5">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="salahn@gmail.com"
              value={formData.email} // Bind value to email state
              onChange={(e) => setFormData({...formData,email: e.target.value})} // Set email state
            />
            <div id="emailHelp" className="form-text">
             
              {validationErrors.email ? <p style={{ color: 'red', fontSize: '14px' }}>{validationErrors.email}</p>:' We will never share your email with anyone else.'}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={formData.password} // Bind value to password state
              onChange={(e) => setFormData({...formData ,password :e.target.value})} // Set password state
            />
             {validationErrors && <p style={{ color: 'red', fontSize: '14px' }}>{validationErrors.password}</p>}
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              checked
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
