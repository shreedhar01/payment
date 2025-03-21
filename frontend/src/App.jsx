import {
  Signin,
  Signup,
  Dashboard,
  Send,
  LandingPage
} from "./pages"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/send' element={<Send />} />
    </Routes>
  )
}

export default App
