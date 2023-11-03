import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import SeeMoreWorks from './SeeMoreWorks'

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
                
                <div className="flex items-center">
                    {restData.featured_media !== 0 && 
                        <div className="box2">
                        <Link className="text-center" to={`/works/${slug}`}>
                            
                        <figure dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}/>
            
                        </Link>
                        </div>
                    }
                    <div className="m-50 my-0 mx-auto">
                        <div className="btn-yellow m-[2rem]">
                        <Link to={restData?.acf?.live_site}>{restData?.acf?.live_site_title}</Link>
                        </div>
                        <div className="btn-yellow">
                        <Link to={restData?.acf?.github}>{restData?.acf?.github_title}</Link>
                    </div>
                    </div>
                    
                </div>
                <section>
                    <h2>{restData?.acf?.overview_title}</h2>
                    <p>{restData?.acf?.overview}</p>
                </section>
               
                <section>
                    <h2>{restData?.acf?.tool_i_used_title}</h2>
                    <p>{restData?.acf?.tool_i_used}</p>
                </section>
                
                <section>
                    <h2>{restData?.acf?.development_title}</h2>
                    <p>{restData?.acf?.development}</p>
                    <pre className="w-3/4 my-0 mx-auto">
                        <code>{restData?.acf?.code}</code>
                    </pre>  
                </section>
                
                <section>
                    <h2>{restData?.acf?.design_title}</h2>
                    <p>{restData?.acf?.design}</p>
                    {/* <Link to={restData.acf.prototype_url}></Link> */}
                    <p>{restData?.acf?.design_image}</p>
                </section> 
                
                <section>
                    <h2>{restData?.acf?.reflection_title}</h2>
                    <p>{restData?.acf?.reflection}</p> 
                </section>

                            
            </article>
             <SeeMoreWorks restBase={restBase} featuredImage={featuredImage} />

        </>
        
    : 
        <Loading />
    }
    </>   
    )
}

export default Work
