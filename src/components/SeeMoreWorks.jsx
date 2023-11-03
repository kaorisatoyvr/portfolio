import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Works = ( { restBase } ) => {
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
            <div className="flex justify-center items-center mt-10">
            
                <div className="flex items-center" id={`post-${restData.id}`}>
                     {restData?.acf.see_more_works.map((item, index) => (
                         <div className="m-2 box-3 p-2" key={index}>
                            <Link to={item.work_link}>
                                <p className="text-xs">{item.single_work_title}</p>
                                <img className="w-36 m-5" src={item.work_image} alt={item.single_work_title} />
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
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
