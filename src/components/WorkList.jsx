import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const WorkList = ( { restBase, featuredImage } ) => {
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
            {restData.map(post => 
                <article key={post.id} id={`post-${post.id}`}>
                    <div className="box1">
                        {post.featured_media !== 0 && 
                            <Link className="text-center" to={`/works/${post.slug}`}>
                                <figure dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}/>
                            </Link>
                        }
                    <Link to={`/works/${post.slug}`}><h2 className= "btn-white">{post.title.rendered}</h2></Link>
                    </div>
                </article>
                
                )}

            </>
        : 

        // I can add if condition here (if it is on work page, loading if it is on home page, not loading.)

            <Loading />
        }
        </>   
    )
}

export default WorkList
