import { Routes, Route } from '@solidjs/router'

import NamesIndex from './pages/NamesIndex'
import MultiDatasetGenerator from './pages/MultiDatasetGenerator'
import FourOhFour from './pages/FourOhFour'
import About from './pages/About'

export default function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/generator/:key' component={SingleDatasetGenerator} /> */}
        <Route path='/generator' component={MultiDatasetGenerator} />
        <Route path='/' component={NamesIndex} />
        <Route path='/about' component={About} />
        <Route path='*' component={FourOhFour} />
      </Routes>
    </>
  )
}
