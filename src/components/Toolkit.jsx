import React, { useState, useEffect } from 'react';
import Loading from './Loading'
import { AnimatePresence, motion } from "framer-motion";
import FilterButtons from "./FilterButtons";

const Toolkit = ({ restBase }) => {
    const restPath = restBase + 'pages/16?&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

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

    const [displayData, setDisplayData] = useState([]);
    const [active, setActive] = useState("all");
    const [toolkitFilters, setToolkitFilters] = useState([]);

    const handleCategoryClick = (filters) => {
        
        setActive(filters);
        
        if (filters === "all") {
        setDisplayData(restData?.acf.toolkit_item || []);
        return;
        } else {

            const filteredData = (restData?.acf.toolkit || []).filter((item) => item.filters.includes(filters));
            setDisplayData(filteredData);
        
        // setTimeout(() => {
        // setDisplayData(filteredData);
        // }, 400);     
        };
        
  return (
    <>
        {isLoaded ? (
            <>
            
        <div id={`post-${restData.id}`}>
            <h2 className="text-lg">{restData.acf.toolkit_title}</h2>
            

            <div>
            <FilterButtons active={active} filters={toolkitFilters} handleClick={handleCategoryClick} />

                <div className="grid grid-col-3 gap-2">
                        <AnimatePresence>
                    {restData.acf.toolkit.map(({toolkit_item, filters} , index) => (
                        <motion.div
                        style={{ overflow: "hidden" }}
                        key={index}
                        layout
                        initial={{ transform: "scale(0)" }}
                        animate={{ transform: "scale(1)" }}
                        exit={{ transform: "scale(0)" }}
                        >
                        <p>{toolkit_item}</p>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            </div>      
                        
        </div>
        </>
    ) : (
        <Loading />
    )}

</>
  );
};
}

export default Toolkit;
