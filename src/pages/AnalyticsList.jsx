import React from 'react';
import { Card, Table, Button, Space, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import ContentNav from '../components/ContentNav';

const { Option } = Select;

const AnalyticsList = () => {
  const columns = [
    { title: '数据ID', dataIndex: 'id', key: 'id' },
    { title: '数据名称', dataIndex: 'name', key: 'name' },
    { title: '数据类型', dataIndex: 'type', key: 'type' },
    { title: '所属业务', dataIndex: 'business', key: 'business' },
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
    { key: '1', id: '4001', name: '数据名称1', type: '类型A', business: '业务1', createTime: '2024-01-01', status: '已处理' },
    { key: '2', id: '4002', name: '数据名称2', type: '类型B', business: '业务2', createTime: '2024-01-02', status: '待处理' },
    { key: '3', id: '4003', name: '数据名称3', type: '类型C', business: '业务3', createTime: '2024-01-03', status: '已处理' },
    { key: '4', id: '4004', name: '数据名称4', type: '类型D', business: '业务4', createTime: '2024-01-04', status: '已处理' },
    { key: '5', id: '4005', name: '数据名称5', type: '类型E', business: '业务5', createTime: '2024-01-05', status: '待处理' },
  ];

  return (
    <div>
      <h1>数据分析列表</h1>
      <ContentNav />
      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input placeholder="搜索数据名称" prefix={<SearchOutlined />} style={{ width: 200 }} />
          <Select placeholder="数据类型" style={{ width: 150 }}>
            <Option value="typeA">类型A</Option>
            <Option value="typeB">类型B</Option>
            <Option value="typeC">类型C</Option>
          </Select>
          <Select placeholder="数据状态" style={{ width: 150 }}>
            <Option value="pending">待处理</Option>
            <Option value="processed">已处理</Option>
          </Select>
          <Button type="primary">查询</Button>
          <Button type="default">重置</Button>
        </Space>
      </Card>
      <Card>
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <Button type="primary" icon={<PlusOutlined />}>新增数据</Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default AnalyticsList;
