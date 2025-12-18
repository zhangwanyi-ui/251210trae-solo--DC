import React from 'react';
import { Card, Table, Button, Space, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import ContentNav from '../components/ContentNav';

const { Option } = Select;

const SystemList = () => {
  const columns = [
    { title: '系统ID', dataIndex: 'id', key: 'id' },
    { title: '系统名称', dataIndex: 'name', key: 'name' },
    { title: '系统类型', dataIndex: 'type', key: 'type' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '操作', key: 'action', render: () => (
      <Space size="middle">
        <Button type="primary" icon={<EditOutlined />} size="small">编辑</Button>
        <Button danger icon={<DeleteOutlined />} size="small">删除</Button>
      </Space>
    )},
  ];

  const data = [
    { key: '1', id: '5001', name: '系统名称1', type: '类型A', createTime: '2024-01-01', status: '启用' },
    { key: '2', id: '5002', name: '系统名称2', type: '类型B', createTime: '2024-01-02', status: '启用' },
    { key: '3', id: '5003', name: '系统名称3', type: '类型C', createTime: '2024-01-03', status: '禁用' },
    { key: '4', id: '5004', name: '系统名称4', type: '类型D', createTime: '2024-01-04', status: '启用' },
    { key: '5', id: '5005', name: '系统名称5', type: '类型E', createTime: '2024-01-05', status: '启用' },
  ];

  return (
    <div>
      <h1>系统管理列表</h1>
      <ContentNav />
      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input placeholder="搜索系统名称" prefix={<SearchOutlined />} style={{ width: 200 }} />
          <Select placeholder="系统类型" style={{ width: 150 }}>
            <Option value="typeA">类型A</Option>
            <Option value="typeB">类型B</Option>
            <Option value="typeC">类型C</Option>
          </Select>
          <Select placeholder="系统状态" style={{ width: 150 }}>
            <Option value="enabled">启用</Option>
            <Option value="disabled">禁用</Option>
          </Select>
          <Button type="primary">查询</Button>
          <Button type="default">重置</Button>
        </Space>
      </Card>
      <Card>
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <Button type="primary" icon={<PlusOutlined />}>新增系统</Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default SystemList;
