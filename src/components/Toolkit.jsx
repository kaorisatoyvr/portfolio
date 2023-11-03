import React, { useState, useEffect } from 'react';
import Loading from './Loading'
import { AnimatePresence, motion } from "framer-motion";
import FilterButtons from "./FilterButtons";

const Toolkit = ({ restBase }) => {
    const restPath = restBase + 'pages/16?&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [displayData, setDisplayData] = useState([]);
    const [active, setActive] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                console.log('Fetched data:', data);
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    const handleCategoryClick = (category) => {
        
        setActive(category);
        
        if (category === "all") {
        setDisplayData(restData?.acf.toolkit);
        return;
        } else {

        const filteredData = restData.acf.toolkit.filter(
        (item) => item.category === category
        );
        
        setTimeout(() => {
        setDisplayData(filteredData);
        }, 400);     
        };
        
  return (
    <>
        {isLoaded ? (
        <article id={`post-${restData.id}`}>
            <h2 className="text-lg">{restData.acf.toolkit_title}</h2>

            <div>
                <FilterButtons restBase={restBase} active={active} handleClick={handleCategoryClick}  />

                <div className="grid grid-col-3 gap-2">
                        <AnimatePresence>
                    {restData.acf.toolkit.map((item, index) => (
                        <motion.div
                        style={{ overflow: "hidden" }}
                        key={index}
                        layout
                        initial={{ transform: "scale(0)" }}
                        animate={{ transform: "scale(1)" }}
                        exit={{ transform: "scale(0)" }}
                        >
                        <p>{item.toolkit_item}</p>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            </div>      
                        
        </article>
    ) : (
        <Loading />
    )}

</>
  );
};
}

export default Toolkit;
