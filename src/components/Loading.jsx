import loading from '../assets/coffee-loading.gif';

const Loading = () => {
    
    return (
        <div className="mt-28 sm:mt-36 md:mt-[50rem] md:mb-[50rem] lg:mt-60 sm:mb-96">
            <img 
                src={loading} 
                alt="Loading" 
                className="loading w-36" 
                id="loading"
            />
        </div>
    )

}

export default Loading
