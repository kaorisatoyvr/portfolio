import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
// import { Link } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home'
import About from './components/About'
import Love from './components/Love'
import Toolkit from './components/ToolKit'
import Works from './components/Works'
import Work from './components/Work'
import Contacts from './components/Contacts'
import Error from './components/Error';

function App() {
  
  const restBase = 'https://kaorisato.ca/portfolio/wp-json/wp/v2/'
  
  const featuredImage = ( featuredImageObject ) => {
    let imgWidth = featuredImageObject.media_details.sizes.full.width;
    let imgHeight = featuredImageObject.media_details.sizes.full.height;
    let imgURL = featuredImageObject.source_url;
    let img = `<img src="${imgURL}" 
        width="${imgWidth}"
        height="${imgHeight}"
        alt="${featuredImageObject.alt_text}"
        srcset="${imgURL} ${imgWidth}w,
        ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
        ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
        ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
        sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
    return {__html: img}
  }

  return (
    <Router basename="/">
      <div className="z-9999">
        <Header />
      </div>
      <main id="main" className="w-4/5 m-auto h-full pt-20 z-0">
        <Routes>
          <Route path='/' element={<Home restBase={restBase} />} />
          <Route path='/about' element={<About restBase={restBase} featuredImage={featuredImage} />} />
          <Route path='/works' element={<Works restBase={restBase} featuredImage={featuredImage} />} />
          <Route path='/works/:slug' element={<Work restBase={restBase} featuredImage={featuredImage} />} />
          <Route path='/love' element={<Love restBase={restBase} />} />
          <Route path='/toolkit' element={<Toolkit restBase={restBase} />} />
          <Route path='/filterbuttons' element={<FilterButtons restBase={restBase} />} />
          <Route path="*" element={< Error />} />
        </Routes>
      </main>
      <footer>
          <section id="contacts" className="h-36">
              <Contacts restBase={restBase} />
          </section>
        <p className="copyright"><a href="https://kaorisato.ca/" target="_blank" rel="noopener noreferrer">&#169; 2023 Kaori Sato</a>.</p>
      </footer>
    </Router>
  )
}

export default App
