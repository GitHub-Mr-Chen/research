import React, { useState } from 'react'
import './App.css'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { useToggle } from 'ahooks'
import Router, { menuConfigs } from './router'
import { useNavigate, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout

function App(props) {
  console.log('props :>> ', props)
  const [collapsed, { toggle }] = useToggle()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const handleClickMenu = (e) => {
    navigate(e.key)
  }

  return (
    <Layout id="components-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >vite-react</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          onClick={handleClickMenu}
        >
          {menuConfigs.map((route) => {
            return (
              <Menu.Item key={route.path} icon={route.icon}>
                {route.name}
              </Menu.Item>
            )
          })}
          <Menu.Item key={'/route-path'}>{'找不到'}</Menu.Item>
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
  )
}

export default App
