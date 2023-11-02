import React, { useState, useEffect } from 'react';
import Loading from './Loading'

const FilterButtons = ({ restBase }) => {
    const restPath = restBase + 'pages/16?&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched data:', data);
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    function FilterBar({ handleClick, active }) {

  return (
    <>

       
         <article>
            <h2>{restData.acf.toolkit_title}</h2>
                        {restData.acf.toolkit.map((item, index) => (
                            <p key={index}>{item.toolkit_item}</p>
                        ))}
        </article>
        
        <div className="gap-2" style={{ marginBottom: "1rem" }}>
        {restData.acf.toolkit_filters.map((item) => (
          <button
            className={active === item.toLowerCase() && "active"}
            onClick={() => handleClick(item.toLowerCase())}
          >
            {item}
          </button>
        ))}
      </div>
    

    </>
  );
};};

export default FilterButtons;