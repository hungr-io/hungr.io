import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './style/App.css'
import { Navbar } from './components/Navbar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className="App">
      {/* if NOT LOGGED IN, show signup OR login page */}
      <div>
        
      </div>
      {/* if LOGGED IN, show NavBar */}
      <div>
        <Navbar />
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
