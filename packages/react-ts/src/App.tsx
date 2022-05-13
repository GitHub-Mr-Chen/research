import React from 'react';
import logo from './assets/logo.svg';
import './App.css';

import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import { useToggle } from 'ahooks'

import Router, { menuConfigs } from './router'
import { useNavigate, useLocation, To } from 'react-router-dom'
const { Header, Sider, Content } = Layout

function App() {
  const [collapsed, { toggle }] = useToggle()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const handleClickMenu = (e: { key: To; }) => {
    navigate(e.key)
  }

  return (
    <Layout id="components-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" ><img className='logo-img' src={logo} alt="logo" /></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          onClick={handleClickMenu}
          items={menuConfigs.map((route) => ({
            key: route.path,
            icon: route.icon,
            label: route.name,
          }))}
        >
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 112px)'
          }}
        >
          <Router></Router>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
