import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import SeeMoreWorks from './SeeMoreWorks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
            <article className="mt-5" id={`kaori-work-${restData.id}`}>
                <h1>{restData?.title?.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData?.content?.rendered}}></div>
                <div className="w-fit my-0 mx-auto lg:flex items-center">
                    {restData.featured_media !== 0 && 
                        <div className="box4 my-0 mx-auto">
                            <Link className="text-center" to={`/works/${slug}`}>
                            <figure className="pb-3" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}/>
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
                        <div className="sm:w-3/4 bg-[#fafafa] border-2 rounded-lg p-3 sm:m-3">
                            <h3 className="w-fit bg-[#492C0E] text-white p-2 rounded-lg mb-3">{restData?.acf?.tool_i_used_title}</h3>
                            <div className="flex flex-wrap ">
                                {restData?.acf?.tool_i_used.split(' ').map((item, index) => (
                                <p className="border bg-[#fafafa] text-center rounded-full text-xs py-0.5 px-2 w-fit m-1 sm:text-sm" key={index}>{item}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/4 mx-auto">
                    <section className="my-5">
                        <h2>{restData?.acf?.overview_title}</h2>
                        <p>{restData?.acf?.overview}</p>
                    </section>
                    {/* https://react-bootstrap.netlify.app/docs/components/accordion/ */}
                    <Accordion defaultActiveKey="0" flush>
                        <section>
                          {/* Design */}
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{restData?.acf?.design_title}</Accordion.Header>
                                <Accordion.Body>
                                <div className="m-2" dangerouslySetInnerHTML={{ __html: restData?.acf?.design }} />
                                {restData?.acf?.prototype_url ? (  // Check if there is data
                                <a href={restData.acf.prototype_url} className="m-3 btn-yellow" target="_blank">{restData.acf.prototype_url_copy}</a>
                                ) : null}
                                {restData?.acf?.design_image && (
                                <img className="w-3/4 mx-auto my-3" src={restData?.acf?.design_image} alt={restData?.acf?.design_title} />
                                )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </section>
                        <section>
                        {/* Development */}
                            <Accordion.Item eventKey="1">
                                <Accordion.Header className="text-lg">{restData?.acf?.development_title}</Accordion.Header>
                                <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: restData?.acf?.development }} /> 
                                {restData?.acf?.code ? (  // Check if there is data
                                <div className="sm:w-3/4 font-sm my-0 mx-auto">
                                    {/* https://blog.logrocket.com/guide-syntax-highlighting-react/ */}
                                <SyntaxHighlighter language="javascript" style={atomDark}>
                                    {restData?.acf?.code}
                                </SyntaxHighlighter>
                                </div>
                                ) : null}
                                </Accordion.Body>
                            </Accordion.Item>
                        </section>
                        {/* Reflection */}
                        <section>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>{restData?.acf?.reflection_title}</Accordion.Header>
                                <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: restData?.acf?.reflection }} />
                                </Accordion.Body>
                            </Accordion.Item>
                        </section>       
                    </Accordion>
                </div>
            </article>

                    {/* About me button */}
                <div>
                    <Link to="/about">
                        <p className="btn-yellow mt-5 mb-0 mx-auto">
                        See About Me<span> </span><FontAwesomeIcon icon={faAngleRight} />
                        </p>
                    </Link>
                </div>
            <section>
             <SeeMoreWorks restBase={restBase} featuredImage={featuredImage} />
            </section>

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
