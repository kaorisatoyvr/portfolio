import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Work = ( { restBase, featuredImage } ) => {
    const { slug } = useParams();
    const restPath = restBase+ `kaori-work/?slug=${slug}&acf_format=standard&_embed`;
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data[0])
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
            <article id={`kaori-work-${restData.id}`}>
                <h1>{restData?.title?.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData?.content?.rendered}}></div>
                
                {restData.featured_media !== 0 && 
                    <div className="box2">
                    <Link className="text-center" to={`/works/${slug}`}>
                        
                     <figure dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}/>
        
                    </Link>
                    </div>
                }
                    
                <h2>{restData?.acf?.overview_title}</h2>
                <p>{restData?.acf?.overview}</p>
                
                <h2>{restData?.acf?.tool_i_used_title}</h2>
                <p>{restData?.acf?.tool_i_used}</p>
                
                <h2>{restData?.acf?.development_title}</h2>
                <p>{restData?.acf?.development}</p>
                <pre className="w-3/4 my-0 mx-auto">
                    <code>{restData?.acf?.code}</code>
                </pre>

                <h2>{restData?.acf?.design_title}</h2>
                <p>{restData?.acf?.design}</p>
                {/* <Link to={restData.acf.prototype_url}></Link> */}
                <p>{restData?.acf?.design_image}</p> 
                
                <h2>{restData?.acf?.reflection_title}</h2>
                <p>{restData?.acf?.reflection}</p> 

                            
            </article>

        </>
        
    : 
        <Loading />
    }
    </>   
    )
}

export default Work
