import { useState, useEffect } from 'react'
import Loading from './Loading'
import Works from './Works'

const Home = ( {restBase, featuredImage} ) => {
    const restPath = restBase + 'pages/7'
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
                <section className="home__title section-1 mt-[240px] h-[40hv] lg:h-[50vh] block">
                    <h1 className="font-brightwall text-center lg:text-[2.5rem]">{restData.title.rendered}</h1>
                    <p className="text-center" >{restData.acf.sub_title}</p>
                    <div className="relative absolute top-[170px] lg:top-[300px]">
                    <a id="scroll-btn" href="#works"></a>
                    </div>
                </section>
                <div className="m-[18rem] lg:m-[10rem] block">

                </div>
                <section id="works" className="block">
                <Works restBase={restBase} featuredImage={featuredImage}/>
                </section>
            </article>
                </>
        : 
        <div className="mt-[10rem]">
            <Loading />
        </div>
        }
        </>            
    )
}

export default Home
