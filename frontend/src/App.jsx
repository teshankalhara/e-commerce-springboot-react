import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from './components/pages/Test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-3xl font-bold underline'>
        Hello E-Commerce
        <Test/>
      </div>
    </>
  )
}

export default App
