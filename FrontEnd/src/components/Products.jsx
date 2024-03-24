import React ,{useState,useEffect}  from 'react';
import { Link } from 'react-router-dom';
import "../App.css"
import { useSelector } from 'react-redux';

function Products() {
    const token = useSelector((state)=>state.token.accessToken)
    console.log('r');
    const [data,setData]=useState([]);
    const [filter,setFilter]=useState(data);
    const [loading,setLoading]=useState(false);
    let componentMounted =true;
    useEffect(()=>{ 
        const  getProducts =async() =>{
          setLoading(true);
          const response =await fetch("https://6898-2c0f-fc89-127-1487-e540-4edd-8100-5650.ngrok-free.app/api/popular-products",{
            headers:{
            Authorization:`Bearer ${token}`,    
            Accept:'application/json',
            "ngrok-skip-browser-warning": "69420",
            }
          });
          if(componentMounted){
              setData(await response.clone().json());
              setFilter(await response.json());
              setLoading(false);
  
          }
          return()=>{
              componentMounted=false;
          }
        }    
        getProducts();
    },[]);

    const filterProduct =(cat)=>{
        const updatedList= data.filter((x)=>x.category===cat);
        setFilter(updatedList);
    };
    const ShowProducts =()=>{
        return(
            <>
           <div className="buttons display-6 d-flex justify-content-center custom ">
             <button className="bg-custom1 btn me-2 text-center" onClick ={()=>setFilter(data)}><span>All</span></button>        
             <button className="bg-custom1 btn me-2 text-center"  onClick ={()=>filterProduct("men-clothes")}><span>Men</span></button>        
             <button className="bg-custom1 btn me-2 text-center" onClick ={()=>filterProduct("women-clothes")}><span>women</span></button>                
             <button className="bg-custom1 btn me-2 text-center"onClick ={()=>filterProduct("jewelery")}>Jewels</button>                
             <button className="bg-custom1 btn text-center " onClick ={()=>filterProduct("electronics")}>Electronics</button>                
            </div>
        {filter.map((product)=>{
             return(
                <>
                 <div className="col-md-3 mb-4 mt-4">
                   <div class="card h-100 text-center text-white bg-d7k p-4 " key={product.id}>
                   <img src={product.image} class="card-img-top" alt={product.title} height="150px" />
                   
                     <div class="card-body">
                       <h5 class="card-title mb-0">{product.title.substring(0,12)}</h5>
                       <p class="card-text lead fw-bold">${product.price}</p>
                       
                         <Link class="bg-custom-buy btn me-2" to={`/products/${product.id}`}><span>Buy Now</span>
                         </Link>
                      
                   </div>
                   </div>
                  </div>
                  </>
                  );
            })}
          
            </>  
        );
       
    };
return (
<div>

    <div className ="container my-5 py-5">
        <div className ='row'>
            <div className ='col-12 mb-5'>
                <h1 className="display-3 text-center fw-bolder">Popular Products</h1>
                
            </div>
            <hr />
        </div>
        <div className ="row">
                {<ShowProducts/>}
            </div>
    </div>
        
</div>
  );
}

export default Products;
