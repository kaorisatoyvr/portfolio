import { useState, useEffect } from 'react'
import Loading from './Loading'
import Works from './Works'
import Brush from './Brush'
import portrait from '../assets/images/portrait-gif.gif';
import { motion } from "framer-motion";

const Home = ( {restBase, featuredImage} ) => {
    const restPath = restBase + 'pages/7'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    const [scrollPosition, setScrollPosition] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState('transparent');


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
       
        // Handle scroll logic
        const handleScroll = () => {
        const position = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;

        // Set your desired thresholds and colors
        const percentageThresholds = [0.2, 0.4, 0.6, 0.8];
        const thresholds = percentageThresholds.map(percentage => Math.floor(percentage * docHeight));
        const colors = ['#F6F4F7', '#f4f1c1', '#cdddc1', '#F6F4F7'];

        // Find the appropriate color based on the scroll position
        let colorIndex = 0;
        for (let i = 0; i < thresholds.length; i++) {
            if (position > thresholds[i]) {
            colorIndex = i + 1;
            }
        }

        // Update the background color
        setBackgroundColor(colors[colorIndex] || 'transparent');

        setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    };

    fetchData();
    }, [restPath]);
    
    return (
        <>
        { isLoaded ?
        <>  
        <div className="mt-[70px] h-full m-0 p-5" style={{ backgroundColor, transition: 'background-color 0.3s' }}>
            <div className="pt-1 mx-auto md:max-w-screen-lg h-full m-auto">
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
                            className="w-36 sm:w-48 absolute top-[43%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-30" >
                        </motion.img>
                    </figure>

                    <section>
                        <Brush restBase={restBase} />
                    </section>

                    <div className="relative absolute top-[100px] lg:top-[250px] z-30">
                    <a id="scroll-btn" href="#area-2"></a>
                    </div>
                    </section>
                    <div className="m-[18rem] lg:m-[10rem] block">

                    </div>
                    <section id="area-2" className="">
                    <Works restBase={restBase} featuredImage={featuredImage}/>
                    </section>
                </article>
            </div>
        </div>
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
