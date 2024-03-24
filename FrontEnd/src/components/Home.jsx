import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Products from './Products';
import bgImage1 from './images/WhatsApp Image 2024-03-07 at 2.31.39 PM.jpeg';
import bgImage3 from './images/black-friday-elements-assortment_23-2149074076.jpg';
import bgImage4 from './images/original-ec4c8f6b3b76f97173ee9e30cc1b18c5.png';
import bgImage2 from './images/image_processing20210912-13683-zpedcw.jpg';
import bgImage5 from './images/bg.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
  const sliderImages = [bgImage1, bgImage2, bgImage3, bgImage4];
  return (
    <>
      <div className="hero bg-color:#2C4044">
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}interval={1400} >
          {sliderImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index}`} height="550px" />
            </div>
          ))}
        </Carousel>
        <div class="card bg-dark text-white border-0">
          <div class="card-img-overlay  d-flex flex-column justify-content-center">
            <div class="container">
              <h5 class="card-title display-3 fw-bolder mb-0"></h5>
              <p class="card-text"></p>
            </div>
          </div>
        </div>
        <Products />
      </div>
    </>
  );
}

export default Home;
