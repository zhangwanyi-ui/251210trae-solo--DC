import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import './styles/index.less';

const App = () => {
  return (
    <Layout className="app-container">
      <TopNav />
      <Layout className="main-content">
        <SideNav />
        <Layout.Content className="content-area">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;
