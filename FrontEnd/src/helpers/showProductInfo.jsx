import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import ShowCommentsInfo from "./showCommentsInfo"
import ShowMore from "./showMore";

const ShowProductInfo = ({ product, comments ,updateComments }) => {
  console.log('rendering');
  const [showComments, setShowComments] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const dispatch = useDispatch();

  const toggleComments = () => {
   setShowComments(!showComments);
   setShowMore(!showMore);
  };
  const toggleMore = () => {
    setShowComments(false);
    setShowMore(true);
   };
  const addProduct = (product) => {
    dispatch(addCart(product));
  };
 
  return (
    <>
      <div className="col-md-6 mt-4 ">
        <img
          src={product.image}
          alt={product.title}
          height="300px"
          width="300px"
        />
      </div>
      <div className="col-md-6">
        <h4 className="text-black-50 text-uppercase mt-3">
 
          {product.category}
        </h4>
        <h1 className="display-5">{product.title}</h1>
        <p className="lead">
          Rating {product.rating && product.rating.rate}
          <i className="fa fa-star"></i>
        </p>
        <h3 className="display-6 my-4 fw-bold">$ {product.price}</h3>
        <p className="lead">{product.description}</p>
        <button
          className="btn bg-custom-buy cart "
          onClick={() => addProduct(product)}
        >
          
          Add To Cart
          
        </button>
        <Link className="btn bg-custom-buy cart" to="/cart">
          Go to Cart
        </Link>

        <div className="d-flex justify-content-between my-4">
          <button   className={showComments ?"btn btn-dark px-4 py-2 custom-active":"btn btn-dark px-4 py-2 custom"} onClick={toggleComments}>
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>
          <button  className={showMore ?"btn btn-dark px-4 py-2 custom-active":"btn btn-dark px-4 py-2 custom"}  onClick={toggleMore}>
            See More From {product.user_id}
          </button>
        </div>

        {showComments && <ShowCommentsInfo comments={comments} product={product} />}
        {showMore && <ShowMore userId={product.user_id} id={product.id}/>}
      </div>
    </>
  );
};
export default ShowProductInfo;
