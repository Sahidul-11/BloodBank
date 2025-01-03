import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Blogs from '../pages/Blogs/Blogs'
import Registration from '../pages/Registration/Registration'
import Funding from '../pages/Funding/Funding'
import DashboardLayOut from '../layouts/DashboardLayOut'
import PrivateRoute from './PrivateRoute'
import Profile from '../pages/Dashboard/Profile/Profile'
import Welcome from '../pages/Dashboard/Welcome/Welcome'
import ProfileUpdate from '../Components/Dashboard/Profile/ProfileUpdate'
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers'
import AdminRoute from './AdminRoute'
import CreateDonationReq from '../pages/Dashboard/CreateDonationReq/CreateDonationReq'
import MyBloodDonationReq from '../pages/Dashboard/MyBloodDonationReq/MyBloodDonationReq'
import ReqDetails from '../pages/Dashboard/MyBloodDonationReq/ReqDetails'
import AllBloodDonation from '../pages/Dashboard/AllBloodDonationReq/AllBloodDonation'
import AdminVolunteer from './AdminVolunteer'
import ContentManagement from '../pages/Dashboard/ContentManagement/ContentManagement'
import AddBlogs from '../pages/Dashboard/ContentManagement/AddBlogs'
import Search from '../pages/Search/Search'
import DonationReq from '../pages/DonationReq/DonationReq'
import DonationReqDetails from '../pages/DonationReq/DonationReqDetails'
import BlogDetails from '../pages/Blogs/BlogDetails'

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
        element:<PrivateRoute><Funding/></PrivateRoute>
      },
      {
        path: '/blogs',
        element:<Blogs/>
      },
      {
        path: '/blogs/:id',
        element:<PrivateRoute><BlogDetails/></PrivateRoute>
      },
      {
        path: '/logIn',
        element:<Login></Login>
      },
      {
        path: '/registration',
        element:<Registration/>
      },  
      {
        path: '/search',
        element:<Search/>
      },  
      {
        path: '/pendingReq',
        element:<DonationReq/>
      },  
      {
        path: '/pendingReq/:id',
        element:<PrivateRoute><DonationReqDetails/></PrivateRoute>
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
        path : "/dashboard/create-donation-request",
        element :<CreateDonationReq/>

      },
      {
        path : "/dashboard/my-donation-requests",
        element :<MyBloodDonationReq/>

      },
      {
        path : "/dashboard/my-donation-requests/:id",
        element :<ReqDetails/>

      },
      {
        path : "/dashboard/all-users",
        element :<AdminRoute><AllUsers/></AdminRoute>
      },
      {
        path : "/dashboard/all-blood-donation-request",
        element :<AdminVolunteer><AllBloodDonation/></AdminVolunteer>
      },
      {
        path : "/dashboard/content-management/AddBlog",
        element :<AdminVolunteer><AddBlogs/></AdminVolunteer>
      },
      {
        path : "/dashboard/content-management",
        element :<AdminVolunteer><ContentManagement/></AdminVolunteer>
      },
      {
        path : "/dashboard/profile/update",
        element :<PrivateRoute><ProfileUpdate/></PrivateRoute>,

      }
    ]
  }
  
])
