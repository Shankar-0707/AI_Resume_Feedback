import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Upload from './pages/Upload'
import './App.css'
import Home from './pages/Home'
import History from './pages/History'

function App() {
  

  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/upload' element={<Upload />} />
      <Route path="/history" element={<History userId={userId} />} />
    </Routes>
   </Router>
  )
}

export default App
