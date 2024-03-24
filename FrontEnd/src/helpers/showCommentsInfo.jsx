
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDeleteComment, usePostComment } from '../hooks/useAxiosPost';
import { Link } from 'react-router-dom';
const ShowCommentsInfo =({comments,product})=> {
  const {deletComment} =useDeleteComment();
  const user = useSelector((state)=>JSON.parse(state.user.userInfo));
  const {setCommentInput,commentInput,postComment,data} = usePostComment(user,product);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postComment();
}
  const commentRows = [];
  for (let i = 0; i < comments.length; i += 3) {
    const rowComments = comments.slice(i, i + 3);
    commentRows.push(rowComments);
  }

  async function handleDelete(id,e){
    e.preventDefault(); 
    console.log(id);
    await deletComment(id);
  }
  return (
    <div className="container mt-5">
         <form className="login-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="commentInput" className="form-label">
            Add Your Comment:
          </label>
          <textarea
            className="form-control text-area-custom"
            id="cid"
            rows="1"
            maxLength={80} 
            value={commentInput}
            onChange={(e) => {
              if (e.target.value.length <= 80) { 
                setCommentInput(e.target.value);
              }
            }}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-dark custom-submit px-4 mx-2 py-8 mb-4">
          Submit
        </button>
      </form>
      {commentRows.map((row, rowIndex) => (
        <div key={rowIndex} className="row ">
          {row.map((comment) => (
            <div key={comment.id} className="col-md-4">
              <div className="card bg-custom custom2 mb-3 " >
                <div className="card-body">
                  <Link to={`./profile/${comment.user.id}`}>
                  <h5 className="card-title text-white text-custom">{comment.user.name}</h5>
                  </Link>
                  <p className="card-text custom">{comment.content}</p>
                </div>
                {user&& comment.user.id === user.id && (
                  <form onSubmit={(e)=>handleDelete(comment.id,e)}>
                  <button type='submit' className="btn btn-outline-danger del-custom mb-3 mx-4" >Delete</button>
                </form>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
  
      <hr />
  
   
    </div>
  );
  
  }  

export default ShowCommentsInfo;

  