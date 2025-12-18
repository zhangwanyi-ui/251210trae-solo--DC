import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, UserOutlined, FileTextOutlined, ShoppingCartOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { isTopNavPage } from '../config/navigationConfig';

const { Sider } = Layout;

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState('overview-1');
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // 根据当前路径更新选中菜单项
  useEffect(() => {
    if (!isTopNavPage(pathname)) {
      let newSelectedKey = 'overview-1';
      let newOpenKey = 'overview';
      
      if (pathname.includes('/overview/operation-overview')) {
        newSelectedKey = 'overview-1';
        newOpenKey = 'overview';
      } else if (pathname.includes('/overview/value-chain')) {
        newSelectedKey = 'overview-2';
        newOpenKey = 'overview';
      } else if (pathname.includes('/overview/resource-pool')) {
        newSelectedKey = 'overview-3';
        newOpenKey = 'overview';
      } else if (pathname.includes('/online-business/visitors')) {
        newSelectedKey = 'online-business-1';
        newOpenKey = 'online-business';
      } else if (pathname.includes('/online-business/channels')) {
        newSelectedKey = 'online-business-2';
        newOpenKey = 'online-business';
      } else if (pathname.includes('/online-business/behaviors')) {
        newSelectedKey = 'online-business-3';
        newOpenKey = 'online-business';
      } else if (pathname.includes('/online-business/content')) {
        newSelectedKey = 'online-business-4';
        newOpenKey = 'online-business';
      } else if (pathname.includes('/application-service/traffic-bearing')) {
        newSelectedKey = 'application-service-1';
        newOpenKey = 'application-service';
      } else if (pathname.includes('/application-service/online-experience')) {
        newSelectedKey = 'application-service-2';
        newOpenKey = 'application-service';
      } else if (pathname.includes('/application-service/service-efficiency')) {
        newSelectedKey = 'application-service-3';
        newOpenKey = 'application-service';
      } else if (pathname.includes('/infrastructure/stock')) {
        newSelectedKey = 'basic-resource-1';
        newOpenKey = 'basic-resource';
      } else if (pathname.includes('/infrastructure/service-availability')) {
        newSelectedKey = 'basic-resource-2';
        newOpenKey = 'basic-resource';
      } else if (pathname.includes('/infrastructure/usage-conversion')) {
        newSelectedKey = 'basic-resource-3';
        newOpenKey = 'basic-resource';
      } else if (pathname.includes('/service-health/health-report')) {
        newSelectedKey = 'service-health-1';
        newOpenKey = 'service-health';
      } else if (pathname.includes('/service-health/blacklist')) {
        newSelectedKey = 'service-health-2';
        newOpenKey = 'service-health';
      } else if (pathname.includes('/service-health/common-issues')) {
        newSelectedKey = 'service-health-3';
        newOpenKey = 'service-health';
      } else if (pathname.includes('/service-health/intervention-performance')) {
        newSelectedKey = 'service-health-4';
        newOpenKey = 'service-health';
      }
      
      setSelectedKey(newSelectedKey);
      setOpenKeys([newOpenKey]);
    } else {
      // 顶部导航页面，清空选中状态
      setSelectedKey('');
      setOpenKeys([]);
    }
  }, [pathname]);

  // 处理菜单展开收起，实现互斥原则
  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  const handleMenuClick = (e) => {
    // 根据key值导航到对应的页面
    switch (e.key) {
      case 'overview-1':
        navigate('/overview/operation-overview');
        break;
      case 'overview-2':
        navigate('/overview/value-chain');
        break;
      case 'overview-3':
        navigate('/overview/resource-pool');
        break;
      case 'online-business-1':
        navigate('/online-business/visitors');
        break;
      case 'online-business-2':
        navigate('/online-business/channels');
        break;
      case 'online-business-3':
        navigate('/online-business/behaviors');
        break;
      case 'online-business-4':
        navigate('/online-business/content');
        break;
      case 'application-service-1':
        navigate('/application-service/traffic-bearing');
        break;
      case 'application-service-2':
        navigate('/application-service/online-experience');
        break;
      case 'application-service-3':
        navigate('/application-service/service-efficiency');
        break;
      case 'basic-resource-1':
        navigate('/infrastructure/stock');
        break;
      case 'basic-resource-2':
        navigate('/infrastructure/service-availability');
        break;
      case 'basic-resource-3':
        navigate('/infrastructure/usage-conversion');
        break;
      case 'service-health-1':
        navigate('/service-health/health-report');
        break;
      case 'service-health-2':
        navigate('/service-health/blacklist');
        break;
      case 'service-health-3':
        navigate('/service-health/common-issues');
        break;
      case 'service-health-4':
        navigate('/service-health/intervention-performance');
        break;
      default:
        navigate('/overview/operation-overview');
    }
  };

  const sideMenuItems = [
    {
      key: 'overview',
      icon: <DashboardOutlined />,
      label: '全景俯瞰',
      children: [
        { key: 'overview-1', label: '运营全景' },
        { key: 'overview-2', label: '全过程价值链' },
        { key: 'overview-3', label: '资源池' },
      ],
    },
    {
      key: 'online-business',
      icon: <ShoppingCartOutlined />,
      label: '在线业务',
      children: [
        { key: 'online-business-1', label: '访客' },
        { key: 'online-business-2', label: '渠道' },
        { key: 'online-business-3', label: '行为' },
        { key: 'online-business-4', label: '内容' },
      ],
    },
    {
      key: 'application-service',
      icon: <BarChartOutlined />,
      label: '应用服务',
      children: [
        { key: 'application-service-1', label: '流量承载' },
        { key: 'application-service-2', label: '在线体验(性能体验)' },
        { key: 'application-service-3', label: '服务传递效率(和瓶颈)' },
      ],
    },
    {
      key: 'basic-resource',
      icon: <SettingOutlined />,
      label: '基础资源',
      children: [
        { key: 'basic-resource-1', label: '存量' },
        { key: 'basic-resource-2', label: '服务可用性' },
        { key: 'basic-resource-3', label: '使用和转化(绩效)' },
      ],
    },
    {
      key: 'service-health',
      icon: <UserOutlined />,
      label: '服务健康',
      children: [
        { key: 'service-health-1', label: '健康状态（体检）报告（周期性检测报告）' },
        { key: 'service-health-2', label: '黑名单状态' },
        { key: 'service-health-3', label: '常见问题' },
        { key: 'service-health-4', label: '健康干预绩效' },
      ],
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={250}
      style={{ background: '#fff', height: '100%', borderRight: '1px solid #f0f0f0' }}
    >
      <Menu
        mode="inline"
        items={sideMenuItems}
        onClick={handleMenuClick}
        onOpenChange={handleOpenChange}
        openKeys={openKeys}
        selectedKeys={[selectedKey]}
        style={{ height: '100%', borderRight: 0 }}
      />
    </Sider>
  );
};

export default SideNav;
