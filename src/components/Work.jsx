import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import SeeMoreWorks from './SeeMoreWorks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Accordionmui from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { KeyboardArrowDown } from '@mui/icons-material';

const Work = ( { restBase, featuredImage } ) => {
    const { slug } = useParams();
    const restPath = restBase+ `kaori-work/?slug=${slug}&acf_format=standard&_embed`;
    const [restData, setRestData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [isAccordionExpanded1, setIsAccordionExpanded1] = useState(false);
    const [isAccordionExpanded2, setIsAccordionExpanded2] = useState(false);
    const [isAccordionExpanded3, setIsAccordionExpanded3] = useState(false);
    const handleChange1 = () => {
        setIsAccordionExpanded1(!isAccordionExpanded1);
    };
    const handleChange2 = () => {
        setIsAccordionExpanded2(!isAccordionExpanded2);
    };
    const handleChange3 = () => {
        setIsAccordionExpanded3(!isAccordionExpanded3);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setRestData(data[0])
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
        // Reset accordion states when navigating to a new work page
        setIsAccordionExpanded1(false);
        setIsAccordionExpanded2(false);
        setIsAccordionExpanded3(false);
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
                            <Link 
                                className="text-center" 
                                to={`/works/${slug}`}
                            >
                                <figure 
                                    className="pb-3" 
                                    dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}
                                />
                            </Link>
                        </div>
                    }
                    <div className="flex flex-col items-center">
                        {/* live site and github link buttons */}
                        <div className="my-1 mx-auto">
                            <div className="btn-yellow">
                            <Link 
                                to={restData?.acf?.live_site} 
                                target="_blank">{restData?.acf?.live_site_title}
                                <span> </span>
                                <FontAwesomeIcon 
                                icon={faAngleRight}
                            />
                             </Link>
                            </div>
                            {restData?.acf?.github && (
                            <div className="btn-yellow">
                                <Link 
                                    to={restData.acf.github} 
                                    target="_blank"
                                >
                                    {restData.acf.github_title}
                                     <span> </span>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </Link>
                            </div>
                            )}
                            
                        </div>
                        {/* Tool I used */}
                        <div className="sm:w-3/4 bg-[#fafafa] border-2 rounded-lg p-3 sm:m-3">
                            <h3 
                                className="w-fit bg-[#492C0E] text-base text-white p-1 rounded-lg mb-3">
                                    {restData?.acf?.tool_i_used_title}
                            </h3>
                            <div className="flex flex-wrap ">
                                {restData?.acf?.tool_i_used.split(' ').map((item, index) => (
                                <p 
                                    className="border bg-[#fafafa] text-center rounded-full text-xs py-0.5 px-2 w-fit m-1 sm:text-sm" 
                                    key={index}>
                                    {item}
                                </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/4 mx-auto">
                    <section id="area-2" className="my-5">
                        <h2>{restData?.acf?.overview_title}</h2>
                        <p>{restData?.acf?.overview}</p>
                    </section>
                    {/* https://mui.com/material-ui/react-accordion/ */}
                    <section>
                        {/* Design */}
                        <Accordionmui   expanded={isAccordionExpanded1} 
                                        onChange={handleChange1}
                                        className="radius"
                        >
                            <AccordionSummary
                                expandIcon={<KeyboardArrowDown />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className="radius"
                                style={{ backgroundColor: isAccordionExpanded1 ? "#94b98e85" : "#ffffff" }}
                            >
                                <Typography className="summary radius">{restData?.acf?.design_title}</Typography>
                            </AccordionSummary>
                            
                            <AccordionDetails className="radius">
                                <Typography className="radius">
                                 <div>
                                    <div className="m-2 text-brown" dangerouslySetInnerHTML={{ __html: restData?.acf?.design }} />
                                    <div className="mx-auto">
                                        {restData?.acf?.prototype_url ? (  // Check if there is data
                                        <a 
                                            href={restData.acf.prototype_url} 
                                            className="btn-yellow text-center" 
                                            target="_blank"
                                        >
                                            {restData.acf.prototype_url_copy}
                                        </a>
                                        ) : null}
                                    </div>
                                    {restData?.acf?.design_image && ( // Display data if it exist
                                    <img 
                                        className="w-3/4 mx-auto my-3" 
                                        src={restData?.acf?.design_image} 
                                        alt={restData?.acf?.design_title} 
                                        loading="lazy" />
                                    )}
                                </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordionmui>

                        {/* Development */}
                        <Accordionmui   expanded={isAccordionExpanded2} 
                                        onChange={handleChange2}
                                        className="radius"
                        >
                            <AccordionSummary
                                expandIcon={<KeyboardArrowDown />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                className="radius"
                                style={{ backgroundColor: isAccordionExpanded2 ? "#94b98e85" : "#ffffff" }}
                            >
                            <Typography className="summary radius">{restData?.acf?.development_title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography className="radius">
                                <div>
                                    <div className="text-brown" dangerouslySetInnerHTML={{ __html: restData?.acf?.development }} /> 
                                    {restData?.acf?.code ? (  // Check if there is data
                                    <div className="sm:w-3/4 font-sm my-0 mx-auto">
                                        {/* https://blog.logrocket.com/guide-syntax-highlighting-react/ */}
                                    <SyntaxHighlighter 
                                        language="javascript" 
                                        style={atomDark}>
                                        {restData?.acf?.code}
                                    </SyntaxHighlighter>
                                    </div>
                                    ) : null}
                                </div>
                            </Typography>
                            </AccordionDetails>
                        </Accordionmui>

                        {/* Reflection */}
                        <Accordionmui   expanded={isAccordionExpanded3} 
                                        onChange={handleChange3}
                                        className="radius"
                        >
                            <AccordionSummary
                                expandIcon={<KeyboardArrowDown />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                                className="radius"
                                style={{ backgroundColor: isAccordionExpanded3 ? "#94b98e85" : "#ffffff" }}
                            >
                            <Typography className="summary radius">{restData?.acf?.reflection_title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <div>
                                <Typography className="radius">
                                    <div className="text-brown" dangerouslySetInnerHTML={{ __html: restData?.acf?.reflection }} />
                                </Typography>
                            </div>
                            </AccordionDetails>
                        </Accordionmui>
                        
                    </section>

                   
                </div>
            </article>

                    {/* About me button */}
                <div>
                    <Link to="/about">
                        <p 
                            className="btn-yellow mt-5 mb-0 mx-auto">
                            See About Me
                            <span> </span>
                            <FontAwesomeIcon 
                            icon={faAngleRight} />
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
