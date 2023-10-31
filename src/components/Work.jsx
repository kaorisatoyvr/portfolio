import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Work = ( {restBase, featuredImage} ) => {
    const { slug } = useParams();
    const restPath = restBase+ `works?slug=${slug}&_embeded&acf_format=standard`;
    // const restPath = restBase+ `works?slug=${slug}&_embed`;
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
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
                <h1>{restData.title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}></div>
                
                    <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
                <h2>{restData.acf.overview_title}</h2>
                <p>{restData.acf.overview}</p>
                
                {/* <Link to={restData.acf.live_site}>Live Site</Link>
                <Link to={restData.acf.github}>GitHub</Link> */}
                
                <h2>{restData.acf.tool_i_used_title}</h2>
                <p>{restData.acf.tool_i_used}</p>
                
                <h2>{restData.acf.development_title}</h2>
                <p>{restData.acf.development}</p>
                <p>{restData.acf.code}</p>

                <h2>{restData.acf.design_title}</h2>
                <p>{restData.acf.design}</p>
                {/* <Link to={restData.acf.prototype_url}></Link> */}
                <p>{restData.acf.design_image}</p> 
                
                <h2>{restData.acf.reflection_title}</h2>
                <p>{restData.acf.reflection}</p> 

                            
            </article>
            <nav className="posts-navigation">
                {restData.previous_post['id'] &&
                    <Link to={`/works/${restData.previous_post['slug']}`} className="prev-post">Previous: {restData.previous_post['title']}</Link>
                }
                {restData.next_post['id'] &&
                    <Link to={`/works/${restData.next_post['slug']}`} className="next-post">Next: {restData.next_post['title']}</Link>
                }
            </nav>
            

        </>
        
    : 
        <Loading />
    }
    </>   
    )
}

export default Work
