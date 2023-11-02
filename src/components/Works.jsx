import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Works = ( { restBase, featuredImage } ) => {
    const restPath = restBase + 'kaori-work?&acf_format=standard&_embed'
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
                <h2 className="text-center text-2xl font-bold" >Works</h2>

                {restData.map(post => 
                    <article key={post.id} id={`post-${post.id}`}>
                        <div>
                            {post.featured_media !== 0 && 
                                <Link className="text-center" to={`/works/${post.slug}`}>
                                    
                                    <figure dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}/>
                    
                                </Link>
                            }
                        </div>
                        <Link to={`/works/${post.slug}`}><h2 className="text-center p-2 my-0 mx-auto text-center border-0 border-brown rounded-xl w-72 btn-yellow">{post.title.rendered}</h2></Link>

                        
                    </article>
                    
                )}

                {/* About me button */}
                <div>
                    <Link to="/about">
                        <p className="btn-yellow {
">
                        See About Me
                        </p>
                    </Link>
                </div>
            </>
        : 

        // I can add if condition here (if it is on work page, loading if it is on home page, not loading.)

            <Loading />
        }
        </>   
    )
}

export default Works
