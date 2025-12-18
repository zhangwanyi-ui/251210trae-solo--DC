import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { isLeftNavPage as isLeftNavPageConfig } from '../config/navigationConfig';

const { Header } = Layout;

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [selectedKey, setSelectedKey] = useState('');

  // 左侧导航进入的页面不显示内容导航项，使用配置文件中的规则
  const isLeftNavPage = isLeftNavPageConfig(pathname);

  // 根据当前路径更新顶部导航的选中状态
  useEffect(() => {
    let newSelectedKey = '';
    
    // 只有当用户访问顶部导航页面时，才高亮显示对应的顶部导航菜单项
    if (pathname.startsWith('/alarm')) {
      newSelectedKey = 'alarm';
    } else if (pathname.startsWith('/event')) {
      newSelectedKey = 'event';
    } else if (pathname.startsWith('/task')) {
      newSelectedKey = 'task';
    } else if (pathname.startsWith('/online/')) {
      newSelectedKey = 'online';
    } else if (pathname.startsWith('/personal')) {
      newSelectedKey = 'personal';
    } else {
      // 左侧导航页面，不高亮显示任何顶部导航菜单项
      newSelectedKey = '';
    }
    
    setSelectedKey(newSelectedKey);
  }, [pathname]);

  const handleMenuClick = (e) => {
    // 根据key值导航到对应的页面
    switch (e.key) {
      case 'alarm-status':
        navigate('/alarm/alarm-status');
        break;
      case 'alarm-supervision':
        navigate('/alarm/supervision');
        break;
      case 'alarm-performance':
        navigate('/alarm/alarm-handling-performance');
        break;
      case 'event-business':
        navigate('/event/business-operation-events');
        break;
      case 'event-position':
        navigate('/event/position-events');
        break;
      case 'event-task':
        navigate('/event/task-events');
        break;
      case 'event-performance':
        navigate('/event/performance-events');
        break;
      case 'task-emergency':
        navigate('/task/emergency-response-tasks');
        break;
      case 'task-intervention':
        navigate('/task/intervention-plan-tasks');
        break;
      case 'task-regular':
        navigate('/task/regular-tasks');
        break;
      case 'online-responsibility':
        navigate('/online/position-responsibility-report');
        break;
      case 'online-duty':
        navigate('/online/on-duty-report');
        break;
      case 'online-involvement':
        navigate('/online/position-responsibility-involvement-report');
        break;
      case 'online-comprehensive':
        navigate('/online/position-comprehensive-performance-report');
        break;
      case 'personal-registration':
        navigate('/personal/registration-info');
        break;
      case 'personal-settings':
        navigate('/personal/personalization-settings');
        break;
      case 'personal-content':
        navigate('/personal/my-content');
        break;
      default:
        navigate('/overview/operation-overview');
    }
  };

  const topMenuItems = [
    {
      key: 'alarm',
      label: '报警',
      children: [
        { key: 'alarm-status', label: '报警状态' },
        { key: 'alarm-supervision', label: '督促' },
        { key: 'alarm-performance', label: '报警处理绩效' },
      ],
    },
    {
      key: 'event',
      label: '事件',
      children: [
        { key: 'event-business', label: '业务运行事件' },
        { key: 'event-position', label: '岗位事件' },
        { key: 'event-task', label: '任务事件' },
        { key: 'event-performance', label: '绩效事件' },
      ],
    },
    {
      key: 'task',
      label: '任务',
      children: [
        { key: 'task-emergency', label: '应急响应任务' },
        { key: 'task-intervention', label: '视情干预计划任务' },
        { key: 'task-regular', label: '常态化任务' },
      ],
    },
    {
      key: 'online',
      label: '在线',
      children: [
        { key: 'online-responsibility', label: '岗位责任情况报告' },
        { key: 'online-duty', label: '在线值守报告' },
        { key: 'online-involvement', label: '岗位责任涉及报告' },
        { key: 'online-comprehensive', label: '岗位综合绩效报告' },
      ],
    },
    {
      key: 'personal',
      label: '个人中心',
      children: [
        { key: 'personal-registration', label: '注册信息' },
        { key: 'personal-settings', label: '个性化设置' },
        { key: 'personal-content', label: '我的内容' },
      ],
    },
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        个人中心
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        系统设置
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="top-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div className="logo" style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
        DC在线业务系统
      </div>
      <Menu
        mode="horizontal"
        items={topMenuItems}
        onClick={handleMenuClick}
        selectedKeys={[selectedKey]}
        style={{ flex: 1, maxWidth: 600, margin: '0 24px', borderBottom: 0 }}
      />
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button type="text" icon={<BellOutlined />} />
        <Dropdown overlay={userMenu} trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} />
            <span>管理员</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default TopNav;
