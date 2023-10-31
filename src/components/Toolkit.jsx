import React, { useState, useEffect } from 'react';

const Toolkit = ({ restBase }) => {
    const restPath = restBase + 'pages/16?_embeded&acf_format=standard'
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

  return (
    <>
        {isLoaded ? (
         <article>
            <p>{restData.acf.toolkit}</p>
        </article>
    ) : (
        <Loading />
    )}

</>
  );
};

export default Toolkit;
