import { useState, useEffect } from 'react'
import Loading from './Loading'
import Love from './Love'
import ToolKit from './ToolKit'
import SeeMoreWorks from './SeeMoreWorks'
import { motion } from "framer-motion";

const About = ({ restBase }) => {
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
        <div className="relative pt-1 px-5 my-0 mx-auto max-w-5xl md:px-10 md:max-w-screen-lg h-full">
            {isLoaded ?
                <>
                <section>
                    <article className="mt-5" id={`post-${restData.id}`}>
                        <h1 
                            className="font-brightwall">
                                {restData.title.rendered}
                        </h1>
                        <div className="sm:text-lg">
                            <div className="sm:w-1/4">
                                <div className="w-24 md:w-28 lg:w-36 z-10 absolute top-5 right-1/4 sm:top-28 sm:right-10 md:right-20">
                                    <figure>
                                        <motion.img
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 4, delay: 1.5 }}
                                            src={restData?.acf?.picture_of_me}
                                            alt={restData?.acf?.picture_of_kaori} />
                                    </figure>
                                </div>
                                <div className="opacity-60 z-0 absolute top-5 w-28 md:w-32 lg:w-40 top-5 sm:top-28 right-[23%] sm:right-8 md:right-16">
                                    <figure>
                                        <img
                                            src={restData?.acf?.illustration_of_me}
                                            alt={restData?.acf?.illustration_of_kaori} />
                                    </figure>
                                </div>
                            </div>
                            <div className="mt-[6rem] sm:mt-0 sm:w-3/4 sm:text-lg">
                                <p>{restData.acf.about_me_content}</p>
                            </div>
                                <p>{restData.acf.about_content2}</p>
                                <p>{restData.acf.about_content3}</p>
                        </div>
                    </article>        
                 </section>

                <section id="area-2">
                    <ToolKit restBase={restBase} />
                </section>

                <section>
                    <Love restBase={restBase} />
                </section>

                <section>
                    <SeeMoreWorks restBase={restBase} />
                </section>

                    

                </>
                :
                <div className="mt-[10rem]">
                    <Loading />
                </div>
            }
        </div>
    )
}

export default About
