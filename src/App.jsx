import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'
import About from './components/About'
import Love from './components/Love'
import Toolkit from './components/ToolKit'
import FilterButtons from './components/FilterButtons'
import WorkList from './components/WorkList'
import Works from './components/Works'
import Work from './components/Work'
import SeeMoreWorks from './components/SeeMoreWorks'
import Contacts from './components/Contacts'
import Error from './components/Error';
import Menu from './components/Menu'
import MenuMobile from './components/MenuMobile'
import ScrollToTop from './components/ScrollToTop'

function App() {
  
  const restBase = 'https://kaorisato.ca/portfolio/wp-json/wp/v2/'
  const isWorkPage = window.location.pathname.startsWith('/works');
  
  const featuredImage = ( featuredImageObject ) => {
    let imgWidth = featuredImageObject.media_details.sizes.full.width;
    let imgHeight = featuredImageObject.media_details.sizes.full.height;
    let imgURL = featuredImageObject.source_url;
    let img = `<img src="${imgURL}" 
        class="p-3 w-[500px] my-0 mx-auto"
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
      <ScrollToTop />
      <div className="mt-20 z-9999">
        <Header />
      </div>
      <main id="main" className="w-11/12 lg:w-4/5 m-auto h-full lg:pt-1 mt-[70px] top-[70px]">
        <Routes>
          <Route path='/' element={<Home restBase={restBase} featuredImage={featuredImage} isWorkPage={isWorkPage} />} />
          <Route path='/about' element={<About restBase={restBase} />} />
          <Route path='/worklist' element={<WorkList restBase={restBase} featuredImage={featuredImage} isWorkPage={isWorkPage} />} />
          <Route path='/works' element={<Works restBase={restBase} featuredImage={featuredImage} isWorkPage={isWorkPage} />} />
          <Route path='/works/:slug' element={<Work restBase={restBase} featuredImage={featuredImage} />} />
          <Route path='/seemoreworks' element={<SeeMoreWorks restBase={restBase} />} />
          <Route path='/love' element={<Love restBase={restBase} />} />
          <Route path='/toolkit' element={<Toolkit restBase={restBase} />} />
          <Route path='/filterButtons' element={<FilterButtons restBase={restBase} />} />
          <Route path="*" element={< Error />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/menumobile' element={<MenuMobile />} />
        </Routes>
      </main>
      <footer>
          <section id="contacts" className="h-36 mt-10">
              <Contacts restBase={restBase} />
          </section>
        <p className="copyright mb-20 md:mb-0"><a href="https://kaorisato.ca/" target="_blank" rel="noopener noreferrer">&#169; 2023 Kaori Sato</a>.</p>
      </footer>
    </Router>
  )
}

export default App
