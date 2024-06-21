import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import './styles.css';
import '../Home/styles.css'

// import required modules
import {Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'4'}
        autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper  bg-contain bg-[url('/s1.jpg')]"
      >
        <SwiperSlide>
          <img className=' h-full' src="/s8.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/s2.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='h-full' src="/s3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/s7.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/s5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/s6.jpg" />
        </SwiperSlide>
        
        <SwiperSlide>
          <img src="/s4.jpeg" />
        </SwiperSlide>
        
        
      </Swiper>
    </>
  );
}
