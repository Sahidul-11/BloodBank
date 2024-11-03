import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer'
import useAuth from '../hooks/useAuth'
import Spinner from '../Components/Share/Spinner'

const Main = () => {
  const {loading} =useAuth()
  if (loading){
   return  Spinner()
  }
  
  return (
    <div>
      <div className="fixed w-full z-50 container mx-auto"> <Navbar></Navbar></div>
      <div className='pt-24 container mx-auto'>
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default Main
