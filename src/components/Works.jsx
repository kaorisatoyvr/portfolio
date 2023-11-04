import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import WorkList from './WorkList'

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
        { isLoaded ?
            <>
            <article id={`post-${restData.id}`}>
                <h1 className="text-center">{restData.title.rendered}</h1>
                <WorkList restBase={restBase} featuredImage={featuredImage}/>
             </article>

                {/* About me button */}
                <div>
                    <Link to="/about">
                        <p className="btn-yellow my-0 mx-auto">
                        See About Me
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
        </>   
    )
}

export default Works
