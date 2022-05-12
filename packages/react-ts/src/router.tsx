import { useRoutes } from 'react-router-dom'
import {
  UserOutlined,
} from '@ant-design/icons'
import Home from './pages/home'
import NotFound from './pages/404'

const routes = [
  {
    name: '首页',
    path: '/',
    element: <Home></Home>,
    icon: <UserOutlined></UserOutlined>,
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  },
  {
    name: '首页11',
    path: '/122',
    element: '<NotFound></NotFound>'
  }
]

export const menuConfigs = routes.filter(({ name }) => name)

export default function () {
  return useRoutes(routes)
}
