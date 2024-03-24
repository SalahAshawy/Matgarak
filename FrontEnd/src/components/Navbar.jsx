import React, { useEffect, useState } from 'react'
import{Link} from 'react-router-dom' ;
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import { useSelector } from "react-redux";
import {useLogout} from '../hooks/useAxiosPost';
const Navbar = () => {
  const isLoged =  useSelector((state)=>state.login.isLoggedIn);
  const user = useSelector((state)=>JSON.parse(state.user.userInfo));
   console.log(isLoged);
 const cartState =useSelector((state)=>state.handleCart);
 const [showMenu, setShowMenu] = useState(false);
 const toggleMenu = () => {
  setShowMenu(!showMenu);
};

 const {handleLogout}  = useLogout('83|JsFYMtJ2BnGzUo3fBfkGfEO5vM5DJIoGAB80wQbrfd4c8716');
  return (
    
 
   

    <nav className='navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top'>
    <div className='container'>
      <Link className="navbar-brand fw-bold fs-4" to={"/"}>Matgarak</Link>
      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
        <ul className='navbar-nav mx-auto'>
          <li className='nav-item'>
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className='nav-item'>
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          <li className='nav-item'>
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className='nav-item'>
            <Link className="nav-link" to="/contacts">Contacts</Link>
          </li>
          <li className='nav-item'>
            <Link className="nav-link custom-search" to="/searched-products"><i className='fa fa-search'>{" Search"}</i></Link>
          </li>
        </ul>
        <div className="buttons">
          
          {isLoged === 'loged' ? 
            <button onClick={handleLogout} className='btn btn-outline-light'>
              <i className='fa fa-sign-out me-1' /> Logout
            </button> 
            :
            <Link to='/login' className='btn btn-outline-light'>
              <i className='fa fa-sign-in me-1' /> Login
            </Link>
          }
          {isLoged === 'loged' ?  
            <Link to={`/profile`} className='btn btn-outline-light ms-2'>
              <i className='fa fa-user me-1' /> Profile
            </Link>
            : 
            <Link to='/register' className='btn btn-outline-light ms-2'>
              <i className='fa fa-user-plus me-1' /> Register
            </Link>
          }
          <Link to="/cart" className='btn btn-outline-light ms-2'> 
            <i className='fa fa-shopping-cart me-1' /> Cart ({cartState.length})
          </Link>
        </div>
      </div>
    </div>
  </nav>
  
       
        

  )
}

export default Navbar;
