import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import SeeMoreWorks from './SeeMoreWorks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <div className="lg:flex items-center">
                    {restData.featured_media !== 0 && 
                        <div className="box2 my-0 mx-auto">
                            <Link className="text-center" to={`/works/${slug}`}>
                            <figure dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}/>
                            </Link>
                        </div>
                    }
                    <div className="flex flex-col items-center">
                        {/* live site and github link buttons */}
                        <div className="my-1 mx-auto">
                            <div className="btn-yellow">
                            <Link to={restData?.acf?.live_site} target="_blank">{restData?.acf?.live_site_title}<span> </span><FontAwesomeIcon icon={faAngleRight} /></Link>
                            </div>
                            <div className="btn-yellow">
                            <Link to={restData?.acf?.github} target="_blank">{restData?.acf?.github_title}<span> </span><FontAwesomeIcon icon={faAngleRight} /></Link>
                            </div>
                        </div>
                        {/* Tool I used */}
                        <div className="w-3/4 bg-[#fafafa] border-2 rounded-lg p-3 m-3">
                            <h2 className="w-fit bg-[#492C0E] text-white p-2 rounded-lg mb-3">{restData?.acf?.tool_i_used_title}</h2>
                            <p>{restData?.acf?.tool_i_used}</p>
                        </div>
                    </div>
                </div>
                <section className="my-5">
                    <h2>{restData?.acf?.overview_title}</h2>
                    <p>{restData?.acf?.overview}</p>
                </section>
               
                    {/* https://react-bootstrap.netlify.app/docs/components/accordion/ */}
                <Accordion defaultActiveKey={null} flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="text-lg">{restData?.acf?.development_title}</Accordion.Header>
                    <Accordion.Body>
                    <p>{restData?.acf?.development}</p>
                    {restData?.acf?.code ? (  // Check if there is data
                    <pre className="w-3/4 my-0 mx-auto">
                        <code>{restData?.acf?.code}</code>
                    </pre>
                    ) : null}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{restData?.acf?.design_title}</Accordion.Header>
                    <Accordion.Body>
                    <p>{restData?.acf?.design}</p>
                    <Link to={restData.acf.prototype_url}></Link>
                    <p>{restData?.acf?.design_image}</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>{restData?.acf?.reflection_title}</Accordion.Header>
                    <Accordion.Body>
                    {restData?.acf?.reflection}
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                            
            </article>
                    {/* About me button */}
                <div>
                    <Link to="/about">
                        <p className="btn-yellow mt-5 mb-0 mx-auto">
                        About Me<span> </span><FontAwesomeIcon icon={faAngleRight} />
                        </p>
                    </Link>
                </div>

             <SeeMoreWorks restBase={restBase} featuredImage={featuredImage} />

        </>
        
    : 
    <div className="mt-[10rem]">
        <Loading />
    </div>
    }
    </>   
    )
}

export default Work
