import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ShowProductInfo from "../helpers/showProductInfo";
import { useSelector } from "react-redux";
import RecommendedProducts from "./RecommendedProducts";

const Product = () => {
  const token = useSelector((state) => state.token.accessToken);
   const isUpdated = useSelector((state) => state.handleComments);
   console.log(isUpdated);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://6898-2c0f-fc89-127-1487-e540-4edd-8100-5650.ngrok-free.app/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setProduct(response.data);
        setComments(response.data.comment); // Update comments after setting product data
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
      getProduct();
  }, [isUpdated,id]); // Add id and token as dependencies

  if(loading) {
    return (
      <div className="container mt-5 mb-5">
 <div className="row py-4">
          {<ShowProductInfo comments={comments} product={product} />}
        </div>
      </div>
    )
  }
  return (
   
    
    <div>
      <div className="container mt-5 mb-5">
        <div className="row py-4">
          {<ShowProductInfo comments={comments} product={product} />}
        </div>
      </div>
      <div className="recommended "> 

      <RecommendedProducts userId={product.user_id} cat={product.category} id={product.id}/>
      </div>
    </div>
  );
};

export default Product;
