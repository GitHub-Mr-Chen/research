import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ProLayout, { PageContainer, } from '@ant-design/pro-layout';
import Router, { defaultLayoutProps } from "./router";

export default () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <ProLayout
      {...defaultLayoutProps}
      defaultCollapsed={true}
      location={{
        pathname,
      }}
      // menuHeaderRender={() => null}
      title={'resrarch'}
      onMenuHeaderClick={(e: any) => console.log(e)}
      menuItemRender={(item: { path: any; }, dom: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => {
        return <a
          onClick={() => {
            navigate(item.path)
          }}
        >
          {dom}
        </a>
      }}
      rightContentRender={() => (
        <div>
          <Avatar shape="square" size="small" icon={<UserOutlined />} />
        </div>
      )}
      {...{
        "fixedHeader": true,
        "fixSiderbar": true,
        "navTheme": "dark",
        "layout": "side",
        "contentWidth": "Fluid",
        "headerHeight": 48,
        "primaryColor": "#1890ff",
        "splitMenus": false
      }}
    >
      <PageContainer
        footer={[<div key={'foot'}>页脚</div>]}
      >
        <div
          style={{
            height: '120vh',
          }}
        >
          <Router></Router>
        </div>
      </PageContainer>
    </ProLayout>
  );
};