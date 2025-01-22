import React from 'react'
import "./index.css"
import Home from './pages/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Search from './pages/Search'
import Watchpage from './pages/Watchpage'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/search' element={<Search/>}></Route>
    <Route path='/watch/:id' element={<Watchpage/>}></Route>
    </Routes>
    </BrowserRouter>
    

  )
}

export default App