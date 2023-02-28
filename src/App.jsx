import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './style/App.css'
import { Navbar } from './components/Navbar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* if NOT LOGGED IN, show signup OR login page */}
      <div>
        
      </div>
      {/* if LOGGED IN, show NavBar */}
      <div>
        <Navbar />
      </div>
    </div>
  )
}

export default App
