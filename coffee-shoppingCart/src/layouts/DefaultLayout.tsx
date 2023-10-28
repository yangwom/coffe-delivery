import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'



function DefaultLayout() {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}

export default DefaultLayout