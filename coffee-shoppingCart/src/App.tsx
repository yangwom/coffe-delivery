import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/Routes'
import { CartShoppingProvider } from './context/CartShoppingProvider'

function App() {
  return (
    <BrowserRouter>
      <CartShoppingProvider>
        <Router />
      </CartShoppingProvider>
    </BrowserRouter>
  )
}

export default App
