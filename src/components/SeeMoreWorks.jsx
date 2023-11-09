import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

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
                <h2 className="text-center mt-20" >{restData.acf.see_more_works_title}</h2>
            <div className="xl:flex w-4/5 justify-center items-center mt-10 mx-auto">
            
                <div className="flex my-0 mx-auto justify-center" id={`post-${restData.id}`}>
                     {restData?.acf.see_more_works.map((item, index) => (
                         <div className="m-[2px] lg:m-2 box-3 p-2" key={index}>
                            <Link to={`/works/${item.work_link}`}>
                                <p className="fit-content text-[9px] sm:text-base mb-1">{item.single_work_title}</p>
                                <img className="w-36 lg:m-5" src={item.work_image} alt={item.single_work_title} />
                                <div className="text-right">
                                <FontAwesomeIcon icon={faAngleRight} />
                                </div>
                            </Link>
                       </div>
                        ))}
                    
                </div>
            
                {/* See More Works button */}
                <div>
                        <Link to="/works">
                            <p className="btn-yellow">
                            {restData.acf.see_more_works_title}<span> </span>
                            <FontAwesomeIcon icon={faAngleRight} />
                            </p>
                        </Link>
                </div>
            </div>
            </>
        :

        <div className="mt-[10rem]">
            <Loading />
        </div>
        }
        </>   
    )
}

export default Works
