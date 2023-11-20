import { useState, useEffect } from 'react'
import email from '../assets/images/email.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';


const Contacts = ( {restBase} ) => {
    const restPath = restBase + 'pages/121?_embed&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleSocialIcons, setVisibleSocialIcons] = useState(false);
  
    // hide on top ScrollToTop button, visible when scrolling down
    const toggleVisible = () => { 
        const scrolled = document.documentElement.scrollTop; 
        if (scrolled > 300){ 
        setVisible(true) 
        }  
        else if (scrolled <= 300){ 
        setVisible(false) 
        } 
    
        const point = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const dispHeight = window.innerHeight;
        const hidePoint = 100;
        if (point > docHeight - dispHeight - hidePoint) {
            setVisibleSocialIcons(false);
          } else {
            setVisibleSocialIcons(true);
          }
    };
    
    const scrollToTop = () =>{ 
        window.scrollTo({ 
        top: 0,  
        behavior: 'smooth'
        }); 
    }; 
    
    window.addEventListener('scroll', toggleVisible); 

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                data.content.rendered = data.content.rendered.replace(/<h1>.*?<\/h1>/, '');
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
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>
                <section>
                    <div className="text-center">
                        <h2 className="font-brightwall">{restData.acf.contacts_title}</h2>
                        {/* Social Media Icons */}
                        <div className="flex justify-center">
                        <a href={`mailto:${restData.acf.email}`}><img className="w-8 m-3 lg:w-10 lg:m-5" src={email} alt={restData.acf.email} style={{ fill: '#492C0E' }}/></a>
                        <a href={`${restData.acf.linkedin}`} target="_blank" rel="noopener noreferrer"><img className="w-8 m-3 lg:w-10 lg:m-5" src={restData?.acf?.linkedin_image} alt={restData.acf.linkedin} /></a>
                        <a href={`${restData.acf.github}`} target="_blank" rel="noopener noreferrer"><img className="w-8 m-3 lg:w-10 lg:m-5" src={restData?.acf?.github_image} alt={restData.acf.github} /></a>
                        </div>
                    </div>
                </section>
                <section>
                {/* Social Media Icons on the side*/}
                    <div className="fixed right-0 bottom-0 flex flex-col items-center lg:m-5">
                        {visibleSocialIcons && (
                            <>
                            <a href={`mailto:${restData.acf.email}`}><img className="w-6 m-1 lg:w-7 lg:m-2" src={email} alt={restData.acf.email} style={{ fill: '#492C0E' }}/></a>
                            <a href={`${restData.acf.linkedin}`} target="_blank" rel="noopener noreferrer"><img className="w-6 m-1 lg:w-7 lg:m-2" src={restData?.acf?.linkedin_image} alt={restData.acf.linkedin} /></a>
                            <a href={`${restData.acf.github}`} target="_blank" rel="noopener noreferrer"><img className="w-6 m-1 mb-3 lg:w-7 lg:m-2" src={restData?.acf?.github_image} alt={restData.acf.github} /></a>
                            </>
                        )}
                        {/* Scroll up Button */}
                        <button className="m-2"> 
                        <FontAwesomeIcon onClick={scrollToTop} icon={faCircleChevronUp} size="xl" style={{color: "#94B98E", display: visible ? 'inline' : 'none', fontSize: "2rem"}} />
                        </button> 
                    </div>
                </section>
            </article>
        </>
        : 
        ""
        }
        </>
    )
}

export default Contacts
