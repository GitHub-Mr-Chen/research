import { Route, Routes, useRoutes } from 'react-router-dom'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons'
import Home from './pages/home'
import Test from './pages/data-test'
import Hook from './pages/hook'
import NotFound from './pages/404'

const routes = [
  {
    name: '首页',
    path: '/',
    element: <Home></Home>,
    icon: <UserOutlined></UserOutlined>
    // children: [{ name: '子页面', path: '/home', element: <Test></Test> }]
  },
  {
    name: '数据测试页',
    icon: <VideoCameraOutlined></VideoCameraOutlined>,
    path: '/data-test',
    element: <Test></Test>
  },
  {
    name: 'hook实现',
    icon: <UploadOutlined></UploadOutlined>,
    path: '/hook',
    element: <Hook></Hook>
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
]

export const menuConfigs = routes.filter(({ name }) => name)

export default function (params) {
  return useRoutes(routes)
}
