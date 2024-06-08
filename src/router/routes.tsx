import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Profile = lazy(() => import('@/pages/Profile'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const routes = [
  {
    path: '/',
    element: <Navigate to="/home/about" />
  },
  {
    path: 'home',
    element: <Home />,
    children: [
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
] as RouteObject[]

export default routes
