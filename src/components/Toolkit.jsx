import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";

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
                setDisplayData(data.acf.toolkit);
                setActive("all");
            }
            setActive("all");
        }
        fetchData()
    }, [restPath])

    const handleCategoryClick = (categories) => {
        if (categories === active) return;
        setActive(categories);
        setDisplayData([]);
        if (categories === "all") {
            setDisplayData(restData.acf.toolkit);
            return;
        } else {
            const filteredData = restData.acf.toolkit.filter((item) =>
                item.categories.includes(categories)
            );
            setDisplayData(filteredData);
        }
    };

    return (
        <>
            {isLoaded ? (
                <>

                    <div id={`post-${restData.id}`} className="sd:w-11/12 my-0 mx-auto box2 p-3">
                        <h2>{restData.acf.toolkit_title}</h2>
                        <div className="toolkit-container">

                            {/* Filter buttons */}
                            <div className="flex">
                                <div className="gap-px flex flex-wrap normal-case text-[10px]" style={{ marginBottom: "1rem" }}>
                                    {restData.acf.toolkit_filters.split(' ').map((item, index) => (
                                        <div onClick={() => handleCategoryClick(item.toLowerCase())} key={index}>
                                            <button className={`button ${active === item.toLowerCase() ? "active" : ""}`}>
                                                {item}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Toolkit items */}
                            <div className="flex flex-wrap">
                                <AnimatePresence>
                                    {displayData.map(({ toolkit_item }, index) => (
                                        <motion.div
                                            // style={{ overflow: "hidden" }}
                                            key={index}
                                            layout
                                            initial={{ transform: "scale(0)" }}
                                            animate={{ transform: "scale(1)" }}
                                            exit={{ transform: "scale(0)" }}
                                        >
                                            <p className="border bg-[#fafafa] text-center rounded-full text-xs py-0.5 px-2 w-fit m-1 sm:text-sm">{toolkit_item}</p>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                </>
            ) : (

                ""
            )}

        </>
    );
}

export default Toolkit;
