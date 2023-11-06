import React, { useState, useEffect } from 'react';

const FilterButtons = ({ restBase, handleClick, active }) => {
    const restPath = restBase + 'pages/16?&acf_format=standard&_embed'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
   
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

return (
  <div>
    <h1>{restData.acf.toolkit_title}</h1>

    <div className="flex">
                <div className="gap-2 flex flex-wrap" style={{ marginBottom: "1rem" }}>
                {restData.acf.toolkit_filters.split(' ').map((item, index) => (
                    <div className="m-1 bg-[#492C0E] text-neutral-50 w-28 p-1 rounded-md text-center hover:bg-[#EDE795] hover:text-[#492C0E]" key={index}>
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


    {/* <div className="gap-2 flex" style={{ marginBottom: "1rem" }}>
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
    </div> */}
  </div>
  );
};


export default FilterButtons;