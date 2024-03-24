import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Validator from "validatorjs";
import {useRegister} from "../hooks/useAxiosPost";
function Register() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const { email, setFormData, password ,error, name,number,confirmPassword,formData,isLoading, register } = useRegister();
  const [validationErrors,setValidationErrors] = useState([]);
  if (isLoggedIn==="loged") {
    return <Navigate to ="/"></Navigate>
   }
const handleSubmit =async (e)=>{
  e.preventDefault();
  const data = {email,password,confirmPassword,name,number};
  const rules = {
    email: 'required|email',  
    password: 'required|min:8',
    confirmPassword:'required|same:password',
    number:'required|min:11',
    name:'required|min:5'
  };

  const validation = new Validator(data, rules);
  if (validation.fails()) {
    setValidationErrors(validation.errors.all());
    console.log(validation.errors.all());
    return;
  }

  setValidationErrors({email:'',password:'',name:'',confirmPassword:'',number:''})
  await register();
 
}


  return (
    
      <div className="register mx-3 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label for="userName" className="form-label mt-4">
              Name
            </label>
            <input
              type="text"
              className="form-control mb-3"
              id="userName"
              aria-describedby="userName"
              name="name"
              value={formData.name} // Bind value to email state
              onChange={(e) => setFormData({...formData,name: e.target.value})} // Set email state
            />
             {validationErrors && <p style={{ color: 'red', fontSize: '14px' }}>{validationErrors.name}</p>}
            <label for="phone" className="form-label">
              Contact No.
            </label>
            <input
              type="tel"
              className="form-control mb-3"
              id="phone"
              aria-describedby="phone"
              name="number"
              value={formData.number} // Bind value to email state
              onChange={(e) => setFormData({...formData,number: e.target.value})} // Set email state
            />
             {validationErrors && <p style={{ color: 'red', fontSize: '14px' }}>{validationErrors.number}</p>}
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={formData.email} // Bind value to email state
              onChange={(e) => setFormData({...formData,email: e.target.value})} // Set email state
            />
            <div id="emailHelp" className="form-text">
            {validationErrors.email ? <p style={{ color: 'red', fontSize: '14px' }}>{validationErrors.email}</p>:' We will never share your email with anyone else.'}
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control mb-3"
              id="exampleInputPassword1"
              name="password"
              value={formData.password} // Bind value to email state
              onChange={(e) => setFormData({...formData,password: e.target.value})} // Set email state
            />
             {validationErrors && <p style={{ color: 'red', fontSize: '14px' }}>{validationErrors.password}</p>}
            <label for="exampleConfirmtPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleConfirm    Password1"
              name="confirmPassword"
              value={formData.confirmPassword} // Bind value to email state
              onChange={(e) =>{ 
                setFormData({...formData,confirmPassword: e.target.value})
                console.log(confirmPassword);
            }} // Set email state

              />
             {validationErrors && <p style={{ color: 'red', fontSize: '14px' }}>{validationErrors.confirmPassword}</p>}
          </div>
          {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              
            />
            <label className="form-check-label" for="exampleCheck1">
              Login once registered
            </label>
          </div> */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    
  );
}

export default Register;