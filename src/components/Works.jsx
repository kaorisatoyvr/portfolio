import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import WorkList from './WorkList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


const Works = ( { restBase, featuredImage } ) => {
    const restPath = restBase + 'pages/151?&acf_format=standard&_embed'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
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
    <div className="pt-1 px-5 mx-auto md:max-w-screen-lg m-auto h-full">
        { isLoaded ?
            <>
            <article id={`post-${restData.id}`}>
                <h1 
                    className="text-center font-brightwall my-5 lg:my-10">
                    {restData.title.rendered}
                </h1>
                <div className="flex flex-wrap justify-center gap-2 md:gap-5">
                    <WorkList 
                        restBase={restBase} 
                        featuredImage={featuredImage}
                    />
                </div>
             </article>

                {/* About me button */}
                <div>
                    <Link to="/about">
                        <p 
                            className="btn-yellow mt-5 mb-0 mx-auto">
                            See About Me 
                            <span> </span>
                            <FontAwesomeIcon 
                            icon={faAngleRight} />
                        </p>
                    </Link>
                </div>
            </>
        : 

        // I can add if condition here (if it is on work page, loading if it is on home page, not loading.)

        <div className="mt-[10rem]">
            <Loading />
        </div>
        }
    </div>
        </>   
    )
}

export default Works
