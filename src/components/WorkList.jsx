import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const WorkList = ( { restBase, featuredImage } ) => {
    const restPath = restBase + 'kaori-work?&acf_format=standard&orderby=date&order=desc&_embed'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const isWorkPage = window.location.pathname.startsWith('/works');

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
        { isLoaded ? (
            <>
            {restData.map(post => 
                <article className="mb-0" key={post.id} id={`post-${post.id}`}>
                    <div className="box1">
                        {post.featured_media !== 0 && 
                            <Link className="text-center" to={`/works/${post.slug}`}>
                                <figure dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}/>
                            </Link>
                        }
                        <p className="text-sm text-center mb-2">{post.acf.sub_title}</p>
                    <Link to={`/works/${post.slug}`}><p className= "btn-white">{post.title.rendered}<span> </span><FontAwesomeIcon icon={faAngleRight} /></p>
                    </Link>
                    </div>
                </article>
                
                )}

            </>
        ) : (
            isWorkPage ? 
            <div className="mt-[10rem]">
                <Loading />
            </div>
         : null

       )}
        </>   
    )
}

export default WorkList
