import React, { useState, useEffect } from 'react';
import Loading from './Loading'

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
            <h2>{restData.acf.toolkit_title}</h2>
                        {restData.acf.toolkit.map((item, index) => (
                            <p key={index}>{item.toolkit_item}</p>
                        ))}
        </article>
    ) : (
        <Loading />
    )}

</>
  );
};

export default Toolkit;
