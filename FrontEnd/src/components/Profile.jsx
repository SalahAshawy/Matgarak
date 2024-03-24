import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const userInfo = useSelector((state) => JSON.parse(state.user.userInfo));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card bg-dark text-white border-0">
            <img
              src={process.env.PUBLIC_URL + '/assets/bg.jpg'}
              className="card-img"
          
              height="350px"
            />
            <div className="card-img-overlay d-flex flex-column justify-content-center">
              <div className="container">
                <h1 className="card-title display-3 fw-bolder mb-0">
                  Welcome, {userInfo.name}
                </h1>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
