import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Products() {
  const token = useSelector((state) => state.token.accessToken);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([null]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch('https://6898-2c0f-fc89-127-1487-e540-4edd-8100-5650.ngrok-free.app/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const products = await response.json();
      setData(products);
      setFilter(products);
      setLoading(false);
    };
    getProducts();
  }, [token]);

  const filterProducts = () => {
    if (!searchQuery) {
        console.log('epry');
    //   setFilter([]);
      console.log(filter);
    } else {
        console.log(filter);
      const filteredProducts = data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())| product.category.toLowerCase().includes(searchQuery.toLowerCase())| product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilter(filteredProducts);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery]);

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-3 text-center fw-bolder">What do you want to Buy ? </h1>
          </div>
          <hr />
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="row">
          {searchQuery ?filter.map((product) => (
            <div className="col-md-3 mb-4 mt-4" key={product.id}>
              <div className="card h-100 text-center text-white bg-d7k p-4">
                <img src={product.image} className="card-img-top" alt={product.title} height="150px" />
                <div className="card-body">
                  <h5 className="card-title mb-0">{product.title.substring(0, 12)}</h5>
                  <p className="card-text lead fw-bold">${product.price}</p>
                  <Link className="bg-custom-buy btn me-2" to={`/products/${product.id}`}>
                    <span>Buy Now</span>
                  </Link>
                </div>
              </div>
            </div>
          
         )):" "}
        </div>
      </div>
    </div>
  );
}

export default Products;
