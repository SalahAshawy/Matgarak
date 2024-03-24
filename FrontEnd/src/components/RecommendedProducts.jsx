import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RecommendedProducts = ({ userId, cat,id }) => {
  const token = useSelector((state) => state.token.accessToken);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://6898-2c0f-fc89-127-1487-e540-4edd-8100-5650.ngrok-free.app/api/recommended-products?user_id=${userId}&category=${cat}&id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };

    fetchData();
  }, [userId, cat, token]); // Add dependencies

  return (
    <div className="container custom">
      <h2 className="text-center mb-4">Recommended For You</h2>
      {data.map((product, index) => (
        index % 3 === 0 && (
          <div key={index} className="row justify-content-around mb-4">
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

export default RecommendedProducts;
