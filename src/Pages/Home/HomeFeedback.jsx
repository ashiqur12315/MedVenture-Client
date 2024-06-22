import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import './styles.css';

import '../../Pages/../Components/Home/styles.css'

// import required modules
import {Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from '../../Components/Shared/ReviewCard';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const HomeFeedback = () => {
    const axiosPublic = useAxiosPublic()

    const {data: review = []} = useQuery({
        queryKey: ['review'],
        queryFn: async()=>{
            const res =await axiosPublic.get('/feedback')
            return res.data
        }
    })
    console.log(review)

    
    return (
        <div>
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
                        <ReviewCard></ReviewCard>
                    </SwiperSlide>
                    


                </Swiper>
            </>
        </div>
    );
};

export default HomeFeedback;