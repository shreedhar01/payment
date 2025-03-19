import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  Signin,
  Signup,
  Dashboard,
  Send,
  LandingPage
} from "./pages"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <LandingPage/> } />
      <Route path='/signin' element={ <Signin/> } />
      <Route path='/signup' element={ <Signup/> } />
      <Route path='/dashboard' element={ <Dashboard/> } />
      <Route path='/send' element={ <Send/> } />
    </Routes>
  </BrowserRouter>
)
