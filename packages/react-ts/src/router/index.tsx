import { useRoutes } from 'react-router-dom'
import { UserOutlined, SmileOutlined, CrownOutlined, BankOutlined, AntDesignOutlined } from '@ant-design/icons';

import Home from '../pages/home'
import Test from '../pages/test'
import TestChild from '../pages/test-child'
import NotFound from '../pages/404'

const routes = [
  {
    name: '欢迎',
    path: '/welcome',
    element: <Test></Test>,
    icon: <SmileOutlined />,
  },
  {
    name: '首页',
    path: '/',
    element: <Home></Home>,
    icon: <BankOutlined />,
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  },
  {
    name: '测试',
    path: '/test',
    icon: <UserOutlined></UserOutlined>,
    children: [
      {
        path: 'child',
        name: 'zi',
        element: <TestChild></TestChild>,
      },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    access: 'canAdmin',
    icon: <CrownOutlined />,
    children: [
      {
        path: '/admin/sub-page1',
        name: '一级页面',
        icon: <CrownOutlined />,
        element: './Welcomepage1',
      },
      {
        path: '/admin/sub-page2',
        name: '二级页面',
        icon: <CrownOutlined />,
        element: './Welcomepage2',
      },
      {
        path: '/admin/sub-page3',
        name: '三级页面',
        icon: <CrownOutlined />,
        element: './page3',
      },
    ],
  },
]

// 导出菜单配置
export const menuConfigs = routes.filter(({ name }) => name)

export default function () {
  return useRoutes(routes)
}

export const defaultLayoutProps = {
  route: {
    path: '/welcome',
    routes: [
      ...menuConfigs,
      {
        path: 'https://ant.design',
        name: 'Ant Design 官网外链',
        icon: <AntDesignOutlined />,
      },
    ],
  },
  location: {
    pathname: '/',
  },
};