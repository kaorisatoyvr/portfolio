import { useState, useEffect } from 'react'
import Loading from './Loading'
import Love from './Love'
import Toolkit from './ToolKit'


const About = ( {restBase} ) => {
    const restPath = restBase + 'pages/16?_embed&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [featuredMedia, setFeaturedMedia] = useState(null); // To store featured media data
    
    // Function to fetch the media item
    const fetchMediaItem = (mediaId) => {
    const mediaUrl = `${restBase}media/${mediaId}`;
    fetch(mediaUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch media');
        }
      })
      .then((mediaData) => {
        setFeaturedMedia(mediaData); // Store the media data in the state
      })
      .catch((error) => {
        console.error('Error fetching media:', error);
      });
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    return (
        <>
        { isLoaded ?
            <article id={`post-${restData.id}`}>
                <h1>{restData.title.rendered}</h1>
                <p>{restData.acf.about_me_content}</p>
                <p>{restData.acf.about_content2}</p>
                <p>{restData.acf.about_content3}</p>
                <figure>
                <img
                    src={restData.acf.picture_of_me}
                    alt="A picture of Kaori"
                />
                </figure>
                <h2>{restData.acf.toolkit_title}</h2>
                
                {/* <Toolkit /> */}
                <Love />
            </article>
        : 
            <Loading />
        }
        </>
    )
}

export default About
