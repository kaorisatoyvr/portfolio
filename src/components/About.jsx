import { useState, useEffect } from 'react'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import Love from './Love'
import Toolkit from './ToolKit'
import SeeMoreWorks from './SeeMoreWorks'
import { motion } from "framer-motion";

const About = ({ restBase, featuredImage, handleClick, active }) => {
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
                    <article className="mt-5" id={`post-${restData.id}`}>
                            <h1>{restData.title.rendered}</h1>
                        <div className="sm:flex">
                            <div className="sm:w-3/4 m-10 text-sm sm:text-lg">
                                <p>{restData.acf.about_me_content}</p>
                                <p>{restData.acf.about_content2}</p>
                                <p>{restData.acf.about_content3}</p>
                            </div>
                            <div className="w-1/4">
                                <div className="absolute z-10 w-1/4">
                                    <figure>
                                        <motion.img 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 3.8 }}
                                        className="w-fit"
                                            src={restData?.acf?.picture_of_me}
                                            alt={restData?.acf?.picture_of_kaori} />
                                    </figure>
                                </div>
                                
                                <div className="absolute z-0">
                                    <figure>
                                        <img className="w-fit"
                                            src={restData?.acf?.illustration_of_me}
                                            alt={restData?.acf?.illustration_of_kaori} />
                                    </figure>
                                </div>
                            </div>
                        </div>

                        <Toolkit restBase={restBase} />
                        <Love restBase={restBase} />
                        <SeeMoreWorks restBase={restBase} />

                    
                       
                    </article>
                    
                    
                   
                   
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
