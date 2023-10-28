import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/Routes'

function App() {
  return (
     <BrowserRouter>
     <Router />
     </BrowserRouter> 
  )
}

export default App
