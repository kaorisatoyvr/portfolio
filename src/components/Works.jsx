import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Contacts from './Contacts'
import Loading from './Loading'

const Works = ( {restBase, featuredImage} ) => {
    const restPath = restBase + 'kaori-work?_embed&order=asc&orderby=title'
    // const restPath = restBase + 'kaori-work?_embeded&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if ( response.ok ) {
                const data = await response.json();
                console.log(data);
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        }
        fetchData();
    }, [restPath]);
    
    return (
        <>
        { isLoaded ?
            <>
                <h1 className="text-center">Works</h1>
                {restData.map(post => 
                    <article key={post.id} id={`post-${post.id}`}>
                        <Link to={`/works/${post.slug}`}><h2 className="text-center">{post.title.rendered}</h2></Link>
                        <div class="w-[500px] my-0 mx-auto">
                            {post.featured_media !== 0 && post._embedded &&
                                <Link className="text-center" to={`/works/${post.slug}`}>
                                   {/* <figure> <img
                                            src={restData.acf.work_image}
                                            alt="A picture of Kaori"
                                    />
                                    </figure> */}
                                    <figure
                                            className="featured-image"
                                            dangerouslySetInnerHTML={featuredImage(
                                                post._embedded['wp:featuredmedia'][0]
                                            )}
                                        ></figure>

                                    {/* <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure> */}
                                </Link>
                            }
                        </div>
                        {post._embedded && post._embedded['wp:term'].map((terms, index) =>
                            terms.length > 0 ?
                                terms[0].taxonomy === 'kaori-work-category' ? 
                                    <p className="text-center" key={index}>Work Category: {terms[0].name}</p>
                                :
                                    null
                            :
                                null
                        )}
                        
                    </article>
                    
                )}
                <div>
                    <Link to="/about"><p className="text-center">About Me</p></Link>
                </div>
            </>
        : 
            <Loading />
        }
        </>   
    )
}

export default Works
