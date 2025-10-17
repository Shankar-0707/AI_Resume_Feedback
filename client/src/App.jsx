import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Upload from './pages/Upload'
import './App.css'
import Home from './pages/Home'
import History from './pages/History'
import Login from './pages/Login'
import Register from './pages/Register'
import { UserProvider } from './context/UserContext'
import ProtectedRoute from './components/ProtectedRoutes'


function App() {
  
  return (
   <UserProvider>
    <Router>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
     
       {/* Protected Routes */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
      <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
    </Routes>
   </Router>
   </UserProvider>
  )
}

export default App
