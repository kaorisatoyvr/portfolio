import { useState, useEffect } from 'react'
import Loading from './Loading'
import Love from './Love'
import Toolkit from './ToolKit'
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
        <>
            {isLoaded ?
                <>
                <section>
                    <article className="mt-5" id={`post-${restData.id}`}>
                        <h1 className="font-brightwall">{restData.title.rendered}</h1>
                        <div className="sm:relative sm:text-lg">
                            <div className="sm:w-1/4">
                                <div className="w-24 md:w-28 lg:w-36 z-10 absolute top-[6rem] right-1/4 md:right-[3rem] sm:top-0 sm:right-[2rem]">
                                    <figure>
                                        <motion.img
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 3, delay: 1 }}
                                            src={restData?.acf?.picture_of_me}
                                            alt={restData?.acf?.picture_of_kaori} />
                                    </figure>
                                </div>
                                <div className="opacity-60 z-0 absolute w-28 md:w-32 lg:w-40 top-[5.8rem] sm:top-[-2px] right-[23%] sm:right-[1.5rem] md:right-[2.5rem]">
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

                <section>
                    <Toolkit restBase={restBase} />
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
        </>
    )
}

export default About
