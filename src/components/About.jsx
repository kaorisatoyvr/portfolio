import { useState, useEffect } from 'react'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import Love from './Love'
import Toolkit from './ToolKit'
import SeeMoreWorks from './SeeMoreWorks'

const About = ({ restBase, featuredImage, handleClick, active }) => {
    const restPath = restBase + 'pages/16?_embed&acf_format=standard'
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
            {isLoaded ?
                <>
                    <article className="mt-5" id={`post-${restData.id}`}>
                            <h1>{restData.title.rendered}</h1>
                        <div className="sm:flex">
                            <div className="sm:w-3/4 m-10 text-sm sm:text-lg">
                                <p>{restData.acf.about_me_content}</p>
                                <p>{restData.acf.about_content2}</p>
                                <p>{restData.acf.about_content3}</p>
                            </div>
                            <div className="w-1/3 my-0 mx-auto sm:w-1/4 sm:m-10">
                                <figure>
                                    <img className="z-0"
                                        src={restData?.acf?.picture_of_me}
                                        alt={restData?.acf?.picture_of_kaori} />
                                </figure>
                            </div>
                        </div>
                        {/* <h2>{restData.acf.toolkit_title}</h2>
                        {restData.acf.toolkit.map((item, index) => (
                            <p key={index}>{item.toolkit_item}</p>
                        ))} */}

                        <Toolkit restBase={restBase} />
                        <Love restBase={restBase} />
                        <SeeMoreWorks restBase={restBase} />

                    
                       
                    </article>
                    
                    
                   
                   
                </>
                :
                <div className="mt-[10rem]">
                    <Loading />
                </div>
            }
        </>
    )
}

export default About
