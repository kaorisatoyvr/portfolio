import React, { useState, useEffect } from 'react';

// const FilterButtons = ({ restBase, handleClick, active }) => {
//     const restPath = restBase + 'pages/16?&acf_format=standard&_embed'
//     const [restData, setRestData] = useState({ acf: { toolkit_filters: [] } });
//     const [isLoaded, setLoadStatus] = useState(false)  
   
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(restPath);
//             if (response.ok) {
//                 const data = await response.json();
//                 setRestData(data);
//                 setLoadStatus(true);
//             } else {
//                 setLoadStatus(false);
//             }
//         };
//         fetchData();
//     }, [restPath]);

const FilterButtons = ({ filters, handleClick, active }) => {

return (
  <div className="flex">
    <div className="gap-2 flex" style={{ marginBottom: "1rem" }}>
        {filters.map((item, index) => (
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
  </div>
  );
};

export default FilterButtons;