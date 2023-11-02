import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Works = ( { restBase } ) => {
    const restPath = restBase + 'kaori-work?&acf_format=standard'
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
                        
                        <div className="w-[500px] my-0 mx-auto">
                            {post.featured_media !== 0 && 
                                <Link className="text-center" to={`/works/${post.slug}`}>
                                    
                                    <figure>
                                    <img className="bg-white border-1 p-5 rounded-lg shadow-md" src={post._links['wp:featuredmedia'][0].href} alt={post.title.rendered} />
                    
                                    </figure>

                                </Link>
                            }
                        </div>
                        <Link to={`/works/${post.slug}`}><h2 className="text-center p-2 my-0 mx-auto text-center border-0 border-brown rounded-xl w-72 btn-yellow">{post.title.rendered}</h2></Link>

                        {/* {post['kaori-work-category'] && (
                <p className="text-center">
                  Work Category: {post['kaori-work-category'].map((category) => category).join(', ')}
                </p>
              )} */}
                        
                    </article>
                    
                )}

                {/* About me button */}
                <div>
                    <Link to="/about">
                        <p className="p-2 my-0 mx-auto text-center border-0 border-brown rounded-3xl w-36 btn-yellow">
                        See About Me
                        </p>
                    </Link>
                </div>
            </>
        : 
            <Loading />
        }
        </>   
    )
}

export default Works
