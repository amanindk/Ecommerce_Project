import React from "react";
import "./Carausel.css"
import Carousel from "react-bootstrap/Carousel";
import dial2shopbanner1 from "../Assets/dial2shopbanner1.jpg"
import dial2shopbanner2 from "../Assets/dial2shopbanner2.jpg"
import dial2shopbanner3 from "../Assets/dial2shopbanner3.jpg"
import dial2shopbanner4 from "../Assets/dial2shopbanner4.jpg"
function Carausel() {
  return (
    <div class="Carousel-temp">
      <Carousel className="carouseltmp">
        <Carousel.Item interval={1000}>
          <img src={dial2shopbanner1} className=" w-100" alt="" />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img src={dial2shopbanner2} className=" w-100" alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={dial2shopbanner3} className=" w-100" alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={dial2shopbanner4} className=" w-100" alt="" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carausel;
