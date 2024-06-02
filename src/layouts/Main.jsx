import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
const Main = () => {
  return (
    <div>
       <Navbar></Navbar>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Main
