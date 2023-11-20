import { useState, useEffect } from 'react'
import Loading from './Loading'
import Works from './Works'
import Blush from './Blush'
import portrait from '../assets/images/portrait-gif.gif';
import { motion } from "framer-motion";

const Home = ( {restBase, featuredImage} ) => {
    const restPath = restBase + 'pages/7'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
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
        { isLoaded ?
        <>  
            <article id={`post-${restData.id}`}>
                <section className="home__title section-1 mt-[280px] sm:mt-[340px] h-[40hv] lg:h-[50vh] block">
                    {/* Title Kaori Sato */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative font-brightwall text-center lg:text-[2.5rem] z-40"
                    >
                        {restData.title.rendered}
                    </motion.h1>
                </motion.div>
                    
                    {/* Sub title */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 3, delay: 1.5 }}
                        className="text-xs sm:text-lg relative text-center z-40" >{restData.acf.sub_title}
                    </motion.p>
                </motion.div>

                {/* Illustration */}
                <figure>
                <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 3, delay: 1.5 }}
                        src={portrait}
                        alt="Illustration of Kaori"
                        className="w-36 sm:w-48 absolute top-[43%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10" >
                    </motion.img>
                </figure>

                <section>
                    <Blush restBase={restBase} />
                </section>

                <div className="relative absolute top-[100px] lg:top-[250px] z-30">
                <a id="scroll-btn" href="#works"></a>
                </div>
                </section>
                <div className="m-[18rem] lg:m-[10rem] block">

                </div>
                <section id="works" className="block">
                <Works restBase={restBase} featuredImage={featuredImage}/>
                </section>
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

export default Home
