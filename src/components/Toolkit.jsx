import React, { useState, useEffect } from 'react';
import Loading from './Loading'
import { AnimatePresence, motion } from "framer-motion";
// import FilterButtons from "./FilterButtons";

const Toolkit = ({ restBase }) => {
    const restPath = restBase + 'pages/16?&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    // const [displayData, setDisplayData] = useState([]);
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

    const FilterBar = ({ handleClick, active }) => {


        return (
          <div className="gap-2" style={{ marginBottom: '1rem' }}>
            {restData.acf.toolkit_filters.split(' ').map((item) => (
              <button
                className={active === item.toLowerCase() && 'active'}
                onClick={() => handleClick(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>
        );
      };

    const handleCategoryClick = (filters) => {
        
        setActive(filters);
        
        if (filters === "all") {
        {restData?.acf.toolkit_item};
        return;
        } else {

            const filteredData = (restData?.acf.toolkit || []).filter((item) => item.filters.includes(filters));
            setDisplayData(filteredData);
        
        setTimeout(() => {
        setDisplayData(filteredData);
        }, 400);     
        };
        
  return (
    <>
        {isLoaded ? (
            <>
            
        <div id={`post-${restData.id}`}>
            <h2 className="text-lg">{restData.acf.toolkit_title}</h2>
            <div>
            {/* <div className="flex">
                <div className="gap-2 flex" style={{ marginBottom: "1rem" }}>
                {restData.acf.toolkit_filters.split(' ').map((item, index) => (
                    <div className="m-5 bg-white w-fit p-2 rounded-xl" key={index}>
                      <button
                          className={active === item.toLowerCase() && "active"}
                          onClick={() => handleClick(item.toLowerCase())}
                      >
                          {item}
                      </button>
                    </div>
                  ))}
              </div>
            </div> */}
            <div className="flex flex-wrap">
                        {restData.acf.toolkit.map((item, index) => (
                            <p className="p-2" key={index}>{item.toolkit_item}</p>
                        ))} 
                        </div>
           

                <div className="grid grid-col-3 gap-2">
                        <AnimatePresence>
                    {displayData.map(({toolkit_item, filters} , index) => (
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

        <div className="mt-[10rem]">
            <Loading />
        </div>
    )}

</>
  );
};
}

export default Toolkit;
