import { useState, useEffect } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Love = ({ restBase }) => {
    const restPath = restBase + 'pages/16?_embed&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    return (
        <>
            {isLoaded ?
                <>  
                        <div className="w-full sm:w-3/4 md:w-1/2 lg:1/3 mt-[3rem] mb-0 mx-auto">
                        <Swiper
                            spaceBetween={30}
                            effect={'fade'}
                            navigation={true}
                            pagination={{
                            clickable: true,
                            }}
                            loop
                            modules={[EffectFade, Navigation, Pagination, Autoplay]}
                            className="mySwiper"
                        >
                            {/* <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
                                autoplay={{ delay: 2500 }}
                                spaceBetween={50}
                                slidesPerView={1}
                                navigation
                                loop
                                effect={'fade'}
                                pagination={{ clickable: true }}
                            > */}
                                {restData.acf.love.map((slides) => (
                                    <SwiperSlide key={slides.love_text}>
                                        <img className="w-20 lg:w-24 my-0 mx-auto" src={slides.love_image} alt={slides.love_text} />
                                        <p className="text-center my-10 lg:text-2xl">{slides.love_text}</p>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                </>
                :
                <div className="mt-[10rem]">
                    
                </div>
            }
        </>
    )
}

export default Love
