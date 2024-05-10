import React, { useState } from 'react';
import {Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const YourComponent = () => {
  const [activeSlide, setActiveSlide] = useState(0); // State variable to track the active slide index

  const onChangeHandler = (index) => {
    setActiveSlide(index); // Update the active slide index when the slide changes
  };

  const images = [
    {
      src: `https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/28/84b6a214-9eb3-49eb-9f9d-72cec56ec5d71659019908592-Indian-Wear_DK--1-.jpg`,
      alt: "altFirst",
    },
    {
      src: `https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/27/53b4daed-cd2c-4111-86c5-14f737eceb351656325318973-Handbags_Desk.jpg`,
      alt: "altSecond ",
    },
    {
      src: `https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/28/6107d28b-2bcb-44e6-9743-655b54550b8f1659020199598-Workwear_Desk--1-.jpg`,
      alt: "altThird",
    },
    {
      src: `https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/28/0174e4d7-448c-4746-8572-69461ad5be101659020268081-Tops---Tees_Desk.jpg`,
      alt: "altFour",
    },
    {
      src: `https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2023/5/24/d3fcc4cc-2624-4024-9270-6b67393556991684912940780-Phase_1-KV_DK--1-.gif`,
      alt: "altThird",
    },
  ];

  return (
    <Carousel
        autoPlay
        infiniteLoop
        centerMode
        showThumbs={false}
        showStatus={false}
      >
        {images.map((e, index) => (
          <img
            src={e.src}
            alt={e.alt}
            className="max-h-[400px] mx-24"
            key={index}
          />
        ))}
      </Carousel>
  );
};

export default YourComponent;
