import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Registration from '../pages/Registration/Registration'

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
        path: '/logIn',
        element:<Login></Login>
      },
      {
        path: '/registration',
        element:<Registration/>
      },
    
    
    
     
    ],
  },
  
])
