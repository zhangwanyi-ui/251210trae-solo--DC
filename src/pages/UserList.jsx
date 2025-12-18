import React from 'react';
import { Card, Table, Button, Space, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import ContentNav from '../components/ContentNav';

const { Option } = Select;

const UserList = () => {
  const columns = [
    { title: '用户ID', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '操作', key: 'action', render: () => (
      <Space size="middle">
        <Button type="primary" icon={<EditOutlined />} size="small">编辑</Button>
        <Button danger icon={<DeleteOutlined />} size="small">删除</Button>
      </Space>
    )},
  ];

  const data = [
    { key: '1', id: '2001', username: 'user1', name: '用户1', email: 'user1@example.com', role: '管理员', status: '启用' },
    { key: '2', id: '2002', username: 'user2', name: '用户2', email: 'user2@example.com', role: '普通用户', status: '启用' },
    { key: '3', id: '2003', username: 'user3', name: '用户3', email: 'user3@example.com', role: '普通用户', status: '禁用' },
    { key: '4', id: '2004', username: 'user4', name: '用户4', email: 'user4@example.com', role: '普通用户', status: '启用' },
    { key: '5', id: '2005', username: 'user5', name: '用户5', email: 'user5@example.com', role: '普通用户', status: '启用' },
  ];

  return (
    <div>
      <h1>用户列表</h1>
      <ContentNav />
      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input placeholder="搜索用户名" prefix={<SearchOutlined />} style={{ width: 200 }} />
          <Select placeholder="用户角色" style={{ width: 150 }}>
            <Option value="admin">管理员</Option>
            <Option value="user">普通用户</Option>
          </Select>
          <Select placeholder="用户状态" style={{ width: 150 }}>
            <Option value="enabled">启用</Option>
            <Option value="disabled">禁用</Option>
          </Select>
          <Button type="primary">查询</Button>
          <Button type="default">重置</Button>
        </Space>
      </Card>
      <Card>
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <Button type="primary" icon={<PlusOutlined />}>新增用户</Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default UserList;
