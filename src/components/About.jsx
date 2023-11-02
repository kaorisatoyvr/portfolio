import { useState, useEffect } from 'react'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import Love from './Love'
import Toolkit from './ToolKit'

const About = ({ restBase }) => {
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
                    <article id={`post-${restData.id}`}>
                            <h1>{restData.title.rendered}</h1>
                        <div className="flex">
                            <div className="w-3/4 m-10">
                                <p>{restData.acf.about_me_content}</p>
                                <p>{restData.acf.about_content2}</p>
                                <p>{restData.acf.about_content3}</p>
                            </div>
                            <div className="w-1/4 m-10">
                                <figure>
                                    <img className="z-0"
                                        src={restData?.acf?.picture_of_me}
                                        alt="A picture of Kaori" />
                                </figure>
                            </div>
                        </div>
                        <h2>{restData.acf.toolkit_title}</h2>
                        {restData.acf.toolkit.map((item, index) => (
                            <p key={index}>{item.toolkit_item}</p>
                        ))}

                        <Toolkit restBase={restBase} />

                        <Love restBase={restBase} />
                       
                    </article>

                    <div>
                        <Link to="/works">
                            <p className="btn-yellow">See More Works</p>
                        </Link>
                    </div>
                </>
                :
                <Loading />
            }
        </>
    )
}

export default About
