import React, { useState, useEffect } from 'react';
import Loading from './Loading'

const FilterButtons = ({ restBase, handleClick, active }) => {
    const restPath = restBase + 'pages/16?&acf_format=standard&_embed'
    const [restData, setRestData] = useState({ acf: { toolkit_filters: [] } });
    const [isLoaded, setLoadStatus] = useState(false)  
   
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setRestData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    return (
      <>
          {isLoaded ? (
           
            <article className="flex" id={`post-${restData.id}`}>

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
            </article>
          ) : (
              <Loading />
          )}
      </>
  );
};

export default FilterButtons;