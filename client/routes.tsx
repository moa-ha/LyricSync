import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Collections from './pages/Collections.tsx'
import Songs from './pages/Songs.tsx'
import Lyrics from './pages/Lyrics.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="collections" element={<Collections />} />
    <Route path="collections/:collectionId" element={<Songs />} />
    <Route path="collections/:collectionId/:songId" element={<Lyrics />} />
  </Route>,
)
