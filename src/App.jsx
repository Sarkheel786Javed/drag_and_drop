import { useState } from 'react'
import MainPage from './pages/MainPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-100'>
     <MainPage/>
    </div>
  )
}

export default App
