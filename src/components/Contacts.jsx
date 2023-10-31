import { useState, useEffect } from 'react'
import Loading from './Loading'


const Contacts = ( {restBase} ) => {
    const restPath = restBase + 'pages/121'
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
            <article id={`post-${restData.id}`}>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>
                <h2>{restData.acf.contacts_title}</h2>
                {/* <img src={restData.acf.email_image} alt="email" /> */}
                <p><a href={`mailto:${restData.acf.email}`}>{restData.acf.email}</a></p>
                <p><a href={`${restData.acf.linkedin}`} target="_blank" rel="noopener noreferrer">{restData.acf.linkedin}</a></p>
                <p><a href={`${restData.acf.github}`} target="_blank" rel="noopener noreferrer">{restData.acf.github}</a></p>
            </article>
        : 
            <Loading />
        }
        </>
    )
}

export default Contacts
