import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer'

const Main = () => {
  return (
    <div>
      <div className="fixed w-full z-50"> <Navbar></Navbar></div>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default Main
