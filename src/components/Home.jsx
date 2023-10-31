import { useState, useEffect } from 'react'
import Loading from './Loading'
import Works from './Works'
import Contacts from './Contacts'

const Home = ( {restBase} ) => {
    const restPath = restBase + 'pages/7'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                console.log('Fetched data:', data);
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
                <section className="home__title section-1 mt-[240px] h-[50vh] relative">
                    <h1 className="font-brightwall text-center">{restData.title.rendered}</h1>
                    <p className="text-center" >{restData.acf.sub_title}</p>
                    <a id="scroll-btn" href="#works"></a>
                </section>
                
                <section id="works" className="h-[60vh] mt-[5rem] relative">
                    <h2 className="text-center">Works</h2>
                    <Works restBase={restBase} /> 
                </section>
            </article>
                <section id="contacts" className="h-36">
                     <h2 className="text-center">Contacts</h2>
                    <Contacts restBase={restBase} />
                </section>
                </>
        : 
            <Loading /> 
        }
        </>            
    )
}

export default Home
