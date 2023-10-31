import { useState, useEffect } from 'react'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import Love from './Love'
import Toolkit from './ToolKit'
import Contacts from './Contacts'
import { Navigation, Pagination, Scrollbar, A11y, EffectFlip, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


const About = ({ restBase }) => {
    const restPath = restBase + 'pages/16?_embed&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [featuredMedia, setFeaturedMedia] = useState(null); // To store featured media data

    // Function to fetch the media item
    const fetchMediaItem = (mediaId) => {
        const mediaUrl = `${restBase}media/${mediaId}`;
        fetch(mediaUrl)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch media');
                }
            })
            .then((mediaData) => {
                setFeaturedMedia(mediaData); // Store the media data in the state
            })
            .catch((error) => {
                console.error('Error fetching media:', error);
            });
    };

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
                    <article id={`post-${restData.id}`}>
                        {restPath}
                        <h1>{restData.title.rendered}</h1>
                        <p>{restData.acf.about_me_content}</p>
                        <p>{restData.acf.about_content2}</p>
                        <p>{restData.acf.about_content3}</p>
                        <figure>
                            <img
                                src={restData?.acf?.picture_of_me}
                                alt="A picture of Kaori" />
                        </figure>
                        <h2>{restData.acf.toolkit_title}</h2>
                        {restData.acf.toolkit.map((item, index) => (
                            <p key={index}>{item.toolkit_item}</p>
                        ))}
                        {/* <Toolkit /> */}
                        {/* <Love /> */}
                        <div className="w-1/2 my-0 mx-auto">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y, EffectFlip, Autoplay]}
                                autoplay={{ delay: 2500 }}
                                spaceBetween={50}
                                slidesPerView={1}
                                navigation
                                effect="flip"
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                {restData.acf.love.map((slides) => (
                                    <SwiperSlide key={slides.love_text}>
                                        <img className="w-24 my-0 mx-auto" src={slides.love_image} alt={slides.love_text} />
                                        <p className="text-center">{slides.love_text}</p>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </article>

                    <div>
                        <Link to="/works">
                            <p className="text-center">See More Works</p>
                        </Link>
                    </div>
                </>
                :
                <Loading />
            }
        </>
    )
}

export default About
