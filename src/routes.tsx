import { lazy, Suspense } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'

const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/login'))
const NotFound = lazy(() => import('./pages/notFound'))
const DashboardLayout = lazy(() => import('./layouts/dashboard'))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default function Routes() {
  return <Suspense fallback={null}>{useRoutes(routes)}</Suspense>
}
