import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './features/landing/pages/LandingPage'
import NotFoundPage from './features/shared/pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App