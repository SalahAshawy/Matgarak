import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ShowMore=({id,userId})=> {
  const token = useSelector((state)=>state.token.accessToken)
const [data,setData]=useState([]);
const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getMoreProducts = async () => {
          setLoading(true);
          try {
            const response = await axios.get(
              `https://6898-2c0f-fc89-127-1487-e540-4edd-8100-5650.ngrok-free.app/api/more-products?user_id=${userId}&id=${id}`,
              {
                headers: {
                  Authorization:
                  `Bearer ${token}`,
                  Accept: "application/json",
                  "ngrok-skip-browser-warning": "69420",
                },
              }
            );
            setData(response.data);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        getMoreProducts();
      }, [id,userId]);
      if (loading) {
        return (
          <div className="container custom ">
            <div className="row">
            <div className="col custom">
              <div className="card bg-custom custom">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-custom">Loading...</h5>
                  <p className="card-text text-custom"></p>
                </div>
              </div>
            </div>
            <div className="col custom ">
              <div className="card bg-custom custom">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-custom">Loading...</h5>
                  <p className="card-text text-custom"></p>
                </div>
              </div>
            </div>
            <div className="col custom">
              <div className="card bg-custom custom">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-custom">Loading...</h5>
                  <p className="card-text text-custom"></p>
                </div>
              </div>
            </div>
          </div>
            </div>
        );
      }
      
    
      return ( 
        <div className="container custom">
          {data.map((product, index) => (
            index % 3 === 0 && (
              <div key={index} className="row justify-content-around">
                {data.slice(index, index + 3).map((product, idx) => (
                  <div key={idx} className="col custom-more">
                    <Link to={`/products/${product.id}`} className="card-link">
                      <div className="card custom">
                        <img src={product.image} className="card-img-top" alt={product.title} />
                        <div className="card-body">
                          <h5 className="card-title fw-bold text-custom">{product.title}</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      );
      
      
};
export default ShowMore
