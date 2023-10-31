import React, { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFlip, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import slides from './love.json';
// import 'swiper/swiper-bundle.min.css';


const Love = ( ) => {

  return (
    <>
    <div className="w-1/2 my-0 mx-auto">
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFlip, Autoplay]}
      autoplay={{ delay: 2500 }}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      effect = "flip"
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
     {slides.map((slides, index) => (
          <SwiperSlide key={slides.love_text}>
            <p className="text-center">{slides.love_text}</p>
          </SwiperSlide>
        ))}
    </Swiper>
    </div>
</>
  );
};

export default Love