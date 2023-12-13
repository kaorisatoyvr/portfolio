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
        const percentageThresholds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
        const thresholds = percentageThresholds.map(percentage => Math.floor(percentage * docHeight));
        const colors = ['#F6F4F7', '#fbf2f7', '#faede3', '#f7f5d2', '#e1ebda', '#f3fafe', '#F6F4F7'];

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
        <div className="h-full m-0 p-5" style={{ backgroundColor, transition: 'background-color 0.3s' }}>
            <div className="pt-1 mx-auto h-full m-auto">
                <article id={`post-${restData.id}`}>
                    <div className="relative h-[50vh] md:h-[60vh] lg:h-[75vh] block">
                        <section>
                            <Brush restBase={restBase} />
                        </section>
                        <section className="flex flex-col items-center justify-center h-full">
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
                                    className="font-brightwall text-center whitespace-nowrap mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:text-[2.5rem] z-40"
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
                                    className="text-xs whitespace-nowrap absolute mt-28 lg:mt-32 text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:text-lg text-center z-40" >{restData.acf.sub_title}
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
                                    className="w-36 sm:w-48 absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30" >
                                </motion.img>
                            </figure>
                        
                        </section>
                        <div className="absolute mt-72 md:mt-[400px] top-1/2 left-1/2 transform -translate-x-1/2 z-30">
                        <a id="scroll-btn" href="#area-2"></a>
                        </div>
                    </div>
                    

                    <div className="m-[18rem] lg:m-[10rem] block">

                    </div>
                    <section id="area-2" className="pt-28 sm:pt-36p z-40">
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
