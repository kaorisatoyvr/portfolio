import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

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
            <div className="flex justify-center items-center">
            
                <div className="flex items-center" id={`post-${restData.id}`}>
                     {restData?.acf.see_more_works.map((item, index) => (
                         <div className="mb-0" key={index}>
                            <Link to={item.work_link}>
                                <img className="w-48 m-5" src={item.work_image} alt={item.single_work_title} />
                                <p className="text-center">{item.single_work_title}</p>
                            </Link>
                       </div>
                        ))}
                    
                </div>
            
                {/* See More Works button */}
                <div>
                        <Link to="/works">
                            <p className="btn-yellow">
                            {restData.acf.see_more_works_title}
                            </p>
                        </Link>
                </div>
            </div>
            </>
        :

            <Loading />
        }
        </>   
    )
}

export default Works
