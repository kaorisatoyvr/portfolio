import React, { useState, useEffect } from 'react';
import Loading from './Loading'
import { AnimatePresence, motion } from "framer-motion";
// import FilterButtons from "./FilterButtons";

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
                // console.log('Fetched data:', data);
                setData(data)
                setLoadStatus(true)
            } else {
                // setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    // const FilterBar = ({ handleClick, active }) => {

    //     return (
    //       <div className="gap-2" style={{ marginBottom: '1rem' }}>
    //         {restData.acf.toolkit_filters.split(' ').map((item) => (
    //           <button
    //             className={active === item.toLowerCase() ? 'active' : ''}
    //             onClick={() => handleClick(item.toLowerCase())}
    //           >
    //             {item}
    //           </button>
    //         ))}
    //       </div>
    //     );
    //   };

    const handleCategoryClick = (categories) => {
    if (categories === active) return;
        setActive(categories);
        setDisplayData([]);
    
    if (categories === "all") {
        setDisplayData(restData.acf.toolkit || []);
        return;
    }
    
    const filteredData = (restData.acf.toolkit || []).filter((item) =>
        item.categories.includes(category)
    );
    setDisplayData(filteredData);
    };
    
    // const filteredData = (restData.acf.toolkit || []).filter((item) => {
    //      item.category === categories;
    //     console.log('Category:', categories);
    //     console.log('Item Category:', item.categories);
    //   });
    //   console.log('Filtered Data:', filteredData);
      

    

        
  return (
        <>
        {isLoaded ? (
            <>
            
        <div id={`post-${restData.id}`} className="w-3/4 my-0 mx-auto box2 p-3">
            <h2>{restData.acf.toolkit_title}</h2>
            <div>

            {/* Filter buttons */}
            <div className="flex">
                <div className="gap-2 flex flex-wrap" style={{ marginBottom: "1rem" }}>
                {restData.acf.toolkit_filters.split(' ').map((item, index) => (
                    <div className="m-1 bg-[#492C0E] text-neutral-50 w-28 p-1 rounded-md text-center hover:bg-[#EDE795] hover:text-[#492C0E] z-1" key={index}>
                      <button
                          className={active === item.toLowerCase() ? "active" : ""}
                          onClick={() => handleCategoryClick(item.toLowerCase())}
                      >
                          {item}
                      </button>
                    </div>
                  ))}
              </div>
            </div>

           {/* Toolkit items */}
                <div className="flex flex-wrap">
                        <AnimatePresence>
                        {displayData.map(({ toolkit_item, categories } , index) => (
                        <motion.div
                        style={{ overflow: "hidden" }}
                        key={index}
                        layout
                        initial={{ transform: "scale(0)" }}
                        animate={{ transform: "scale(1)" }}
                        exit={{ transform: "scale(0)" }}
                        >
                        <p className="border bg-[#fafafa] text-center rounded-full text-sm py-1 px-3 w-fit m-2">{toolkit_item}</p>
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
    }

export default Toolkit;
