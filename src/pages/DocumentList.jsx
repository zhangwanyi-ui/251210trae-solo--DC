import React from 'react';
import { Card, Table, Button, Space, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import ContentNav from '../components/ContentNav';

const { Option } = Select;

const DocumentList = () => {
  const columns = [
    { title: '文档ID', dataIndex: 'id', key: 'id' },
    { title: '文档名称', dataIndex: 'name', key: 'name' },
    { title: '文档类型', dataIndex: 'type', key: 'type' },
    { title: '创建人', dataIndex: 'creator', key: 'creator' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} size="small">编辑</Button>
          <Button danger icon={<DeleteOutlined />} size="small">删除</Button>
        </Space>
      )
    },
  ];

  const data = [
    { key: '1', id: '3001', name: '文档名称1', type: '类型A', creator: '用户1', createTime: '2024-01-01', status: '已发布' },
    { key: '2', id: '3002', name: '文档名称2', type: '类型B', creator: '用户2', createTime: '2024-01-02', status: '草稿' },
    { key: '3', id: '3003', name: '文档名称3', type: '类型C', creator: '用户3', createTime: '2024-01-03', status: '已发布' },
    { key: '4', id: '3004', name: '文档名称4', type: '类型D', creator: '用户4', createTime: '2024-01-04', status: '已发布' },
    { key: '5', id: '3005', name: '文档名称5', type: '类型E', creator: '用户5', createTime: '2024-01-05', status: '草稿' },
  ];

  return (
    <div>
      <h1>文档列表</h1>
      <ContentNav />
      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input placeholder="搜索文档名称" prefix={<SearchOutlined />} style={{ width: 200 }} />
          <Select placeholder="文档类型" style={{ width: 150 }}>
            <Option value="typeA">类型A</Option>
            <Option value="typeB">类型B</Option>
            <Option value="typeC">类型C</Option>
          </Select>
          <Select placeholder="文档状态" style={{ width: 150 }}>
            <Option value="draft">草稿</Option>
            <Option value="published">已发布</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />}>新建文档</Button>
        </Space>
      </Card>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default DocumentList;