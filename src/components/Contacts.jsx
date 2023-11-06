import { useState, useEffect } from 'react'
import Loading from './Loading'
import email from '../assets/images/email.svg'


const Contacts = ( {restBase} ) => {
    const restPath = restBase + 'pages/121?_embed&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

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
            <article id={`post-${restData.id}`}>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>
                <div className="text-center">
                    <h2>{restData.acf.contacts_title}</h2>
                    {/* Social Media Icons */}
                    <div className="flex justify-center">
                    <a href={`mailto:${restData.acf.email}`}><img className="w-10 m-5" src={email} alt={restData.acf.email} style={{ fill: '#492C0E' }}/></a>
                    <a href={`${restData.acf.linkedin}`} target="_blank" rel="noopener noreferrer"><img className="w-10 m-5" src={restData?.acf?.linkedin_image} alt={restData.acf.linkedin} /></a>
                    <a href={`${restData.acf.github}`} target="_blank" rel="noopener noreferrer"><img className="w-10 m-5" src={restData?.acf?.github_image} alt={restData.acf.github} /></a>
                    </div>
                </div>
                {/* Social Media Icons on the side*/}
                <div className="fixed right-0 bottom-0 flex flex-col m-5">
                    <a href={`mailto:${restData.acf.email}`}><img className="w-7 m-2" src={email} alt={restData.acf.email} style={{ fill: '#492C0E' }}/></a>
                    <a href={`${restData.acf.linkedin}`} target="_blank" rel="noopener noreferrer"><img className="w-7 m-2" src={restData?.acf?.linkedin_image} alt={restData.acf.linkedin} /></a>
                    <a href={`${restData.acf.github}`} target="_blank" rel="noopener noreferrer"><img className="w-7 m-2" src={restData?.acf?.github_image} alt={restData.acf.github} /></a>
                    </div>
            </article>
        : 
        <div className="mt-[10rem]">
            <Loading />
        </div>
        }
        </>
    )
}

export default Contacts
