import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Weather from './assets/Components/Weather'


function App() {
  const [count, setCount] = useState(0)




  return (
    <div className="App">
      
      
      <Weather/>

    

    </div>
  )
}

export default App
