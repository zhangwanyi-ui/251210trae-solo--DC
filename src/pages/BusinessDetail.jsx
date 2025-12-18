import React from 'react';
import { Card, Descriptions, Button, Space } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import ContentNav from '../components/ContentNav';

const BusinessDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>业务详情</h1>
      <ContentNav />
      <Card style={{ marginBottom: 16 }}>
        <Space>
          <Button icon={<ArrowLeftOutlined />}>返回列表</Button>
          <Button type="primary" icon={<EditOutlined />}>编辑</Button>
        </Space>
      </Card>
      <Card>
        <Descriptions title={`业务ID: ${id}`} column={2}>
          <Descriptions.Item label="业务名称">业务名称{id}</Descriptions.Item>
          <Descriptions.Item label="业务类型">类型A</Descriptions.Item>
          <Descriptions.Item label="创建时间">2024-01-01</Descriptions.Item>
          <Descriptions.Item label="状态">已完成</Descriptions.Item>
          <Descriptions.Item label="创建人">管理员</Descriptions.Item>
          <Descriptions.Item label="更新时间">2024-01-02</Descriptions.Item>
          <Descriptions.Item label="备注" span={2}>这是业务的详细描述信息，包含业务的各种属性和状态。</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default BusinessDetail;
