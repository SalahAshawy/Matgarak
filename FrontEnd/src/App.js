import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import {Routes,Route} from 'react-router-dom';
import Profile from './components/Profile';
import SearchedProducts from './components/SearchedProducts';


function App() {
  
  return (

   
<div style={{ backgroundColor: '#2C4044' ,color:'#E37B44'}}>
<Navbar/> 
    <Routes>
       <Route exact path ="/" element={<Home/>}  /> 
       <Route exact path ="/products" element={<Products/>}  /> 
       <Route exact path ="/products/:id" element={<Product/>} /> 
       <Route exact path ="/cart" element={<Cart/>}  /> 
       <Route exact path ="/login" element={<Login/>}  /> 
       <Route exact path ="/register" element={<Register/>}  /> 
       <Route exact path ="/profile" element={<Profile/>}  /> 
       <Route exact path ="/searched-products" element={<SearchedProducts/>}  /> 
    
      </Routes>

</div>
  );
}

export default App;
