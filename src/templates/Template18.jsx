import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Statistic, List, Tag, Progress } from 'antd';
import * as echarts from 'echarts';

// 模板18：顶部 - 个人中心 - 注册信息
const Template18 = ({ pageTitle, data }) => {
  const chartRefs = {
    activityChart: useRef(null),
    taskChart: useRef(null)
  };

  // 初始化图表
  useEffect(() => {
    // 1. 活动统计图表
    const activityChart = echarts.init(chartRefs.activityChart.current);
    activityChart.setOption({
      title: { text: '近期活动统计' },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: '活动类型',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 35, name: '查看报告' },
            { value: 25, name: '处理任务' },
            { value: 20, name: '关注事件' },
            { value: 15, name: '修改设置' },
            { value: 5, name: '其他' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });

    // 2. 任务进度图表
    const taskChart = echarts.init(chartRefs.taskChart.current);
    taskChart.setOption({
      title: { text: '待办任务进度' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['本周', '下周', '本月', '下月']
      },
      yAxis: { type: 'value' },
      series: [
        {
          data: [12, 8, 20, 15],
          type: 'bar',
          itemStyle: { color: '#1890ff' }
        }
      ]
    });

    // 窗口大小变化时重新渲染图表
    const handleResize = () => {
      activityChart.resize();
      taskChart.resize();
    };

    window.addEventListener('resize', handleResize);

    // 组件卸载时清理图表实例
    return () => {
      window.removeEventListener('resize', handleResize);
      activityChart.dispose();
      taskChart.dispose();
    };
  }, []);

  return (
    <div style={{ height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1 style={{ margin: '0 0 6px 0', fontSize: '20px' }}>{pageTitle}</h1>
      
      {/* 1. 摘要栏（账号信息） */}
      <Row gutter={10} style={{ height: '70px' }}>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="账号" value="admin001" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '14px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="角色" value="管理员" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '14px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="注册时间" value="2023-01-01" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '14px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="状态" value="已认证" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '14px' }} />
          </Card>
        </Col>
      </Row>

      {/* 2-3. 主要内容区 */}
      <Row gutter={10} style={{ flex: 1, minHeight: 0 }}>
        <Col span={6}>
          <Card title="身份验证信息" style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }} titleStyle={{ fontSize: '14px' }}>
            <List
              size="small"
              dataSource={[
                { title: '手机号', description: '138****8888', status: '已验证' },
                { title: '邮箱', description: 'admin@example.com', status: '已验证' },
                { title: '实名认证', description: '张三', status: '已完成' }
              ].slice(0, 2)}
              renderItem={item => (
                <List.Item
                  actions={[<Tag color={item.status === '已验证' || item.status === '已完成' ? 'green' : 'orange'} style={{ fontSize: '10px' }}>{item.status}</Tag>]}
                >
                  <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} description={<span style={{ fontSize: '11px' }}>{item.description}</span>} />
                </List.Item>
              )}
            />
          </Card>
          <Card title="账号安全状态" style={{ height: 'calc(50% - 5px)' }} titleStyle={{ fontSize: '14px' }}>
            <List
              size="small"
              dataSource={[
                { title: '密码有效期', description: '还有 15 天到期', progress: 70 },
                { title: '二次验证', description: '已开启', status: '已启用' },
                { title: '登录设备数量', description: '3 台', status: '正常' }
              ].slice(0, 2)}
              renderItem={item => (
                <List.Item
                  actions={[
                    item.status && <Tag color={item.status === '已启用' || item.status === '正常' ? 'green' : 'orange'} style={{ fontSize: '10px' }}>{item.status}</Tag>,
                    item.progress && <Progress percent={item.progress} size="small" status="active" strokeWidth={3} />
                  ]}
                >
                  <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} description={<span style={{ fontSize: '11px' }}>{item.description}</span>} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card title="个人关注事件 + 待办任务" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
            <List
              size="small"
              dataSource={[
                { title: '访客骤降事件', type: '事件', status: '已关注' },
                { title: '渠道推广优化任务', type: '任务', status: '待处理' },
                { title: '系统性能下降事件', type: '事件', status: '已闭环' },
                { title: '数据同步优化任务', type: '任务', status: '进行中' }
              ].slice(0, 3)}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Tag color={item.type === '事件' ? 'blue' : 'orange'} style={{ fontSize: '10px' }}>{item.type}</Tag>,
                    <Tag color={item.status === '待处理' ? 'red' : item.status === '进行中' ? 'blue' : 'green'} style={{ fontSize: '10px' }}>{item.status}</Tag>
                  ]}
                >
                  <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card title="近期活动统计" style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }} titleStyle={{ fontSize: '14px' }}>
            <div ref={chartRefs.activityChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
          </Card>
          <Card title="待办任务进度" style={{ height: 'calc(50% - 5px)' }} titleStyle={{ fontSize: '14px' }}>
            <div ref={chartRefs.taskChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Template18;