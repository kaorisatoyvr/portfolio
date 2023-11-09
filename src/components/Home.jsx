import { useState, useEffect } from 'react'
import Loading from './Loading'
import Works from './Works'
import blush from '../assets/images/blush.svg';
import illustration from '../assets/images/kaori-illustration.png';
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
                <section className="home__title section-1 mt-[240px] h-[40hv] lg:h-[50vh] block">
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
                        className="font-brightwall text-center lg:text-[2.5rem] z-10"
                    >
                        {restData.title.rendered}
                    </motion.h1>
                </motion.div>
                    
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
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="text-center z-10" >{restData.acf.sub_title}
                    </motion.p>
                </motion.div>
                {/* Illustration */}
                <img className="w-48 absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-0" src={illustration} alt="Illustration of Kaori" />

                <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }} className="blush" src={blush} alt="blush" />

                <div className="relative absolute top-[170px] lg:top-[300px]">
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
