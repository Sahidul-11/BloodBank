import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Blogs from '../pages/Blogs/Blogs'
import Registration from '../pages/Registration/Registration'
import DonationReq from '../pages/DonationRequest/DonationReq'
import Funding from '../pages/Funding/Funding'
import DashboardLayOut from '../layouts/DashboardLayOut'
import PrivateRoute from './PrivateRoute'
import Profile from '../pages/Dashboard/Profile/Profile'
import Welcome from '../pages/Dashboard/Welcome/Welcome'
import ProfileUpdate from '../Components/Dashboard/Profile/ProfileUpdate'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element:<Home></Home>
      },
      {
        path: '/funding',
        element:<Funding/>
      },
      {
        path: '/donation-req',
        element:<DonationReq/>
      },
      {
        path: '/blogs',
        element:<Blogs/>
      },
      {
        path: '/logIn',
        element:<Login></Login>
      },
      {
        path: '/registration',
        element:<Registration/>
      },  
    ],
  },
  {
    path: '/dashboard',
    element:<PrivateRoute> <DashboardLayOut /></PrivateRoute>,
    errorElement: <ErrorPage />, 
    children : [

      {
        path :"/dashboard/profile",
        element : <Profile></Profile>
      },
      {
        path : "/dashboard",
        element :<Welcome/>

      },
      {
        path : "/dashboard/profile/update",
        element :<PrivateRoute><ProfileUpdate/></PrivateRoute>,

      }
    ]
  }
  
])
