import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Statistic, List, Tag, Switch, Select, Slider } from 'antd';
import * as echarts from 'echarts';

// 模板19：顶部 - 个人中心 - 个性化设置
const Template19 = ({ pageTitle, data }) => {
  const chartRefs = {
    preferenceChart: useRef(null),
    notificationChart: useRef(null)
  };

  // 初始化图表
  useEffect(() => {
    // 1. 偏好设置分布图表
    const preferenceChart = echarts.init(chartRefs.preferenceChart.current);
    preferenceChart.setOption({
      title: { text: '偏好设置分布' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['界面', '通知', '数据', '其他']
      },
      yAxis: { type: 'value' },
      series: [
        {
          data: [12, 15, 8, 5],
          type: 'bar',
          itemStyle: { color: '#722ed1' }
        }
      ]
    });

    // 2. 通知类型统计图表
    const notificationChart = echarts.init(chartRefs.notificationChart.current);
    notificationChart.setOption({
      title: { text: '通知类型统计' },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: '通知类型',
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: 40, name: '事件通知' },
            { value: 30, name: '任务提醒' },
            { value: 20, name: '系统更新' },
            { value: 10, name: '其他通知' }
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

    // 窗口大小变化时重新渲染图表
    const handleResize = () => {
      preferenceChart.resize();
      notificationChart.resize();
    };

    window.addEventListener('resize', handleResize);

    // 组件卸载时清理图表实例
    return () => {
      window.removeEventListener('resize', handleResize);
      preferenceChart.dispose();
      notificationChart.dispose();
    };
  }, []);

  return (
    <div style={{ height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1 style={{ margin: '0 0 6px 0', fontSize: '20px' }}>{pageTitle}</h1>
      
      {/* 1-2. 主要内容区 */}
      <Row gutter={10} style={{ flex: 1, minHeight: 0 }}>
        <Col span={8}>
          <Row gutter={10} style={{ height: '100%' }}>
            <Col span={24} style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }}>
              <Card title="界面设置" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <List
                  size="small"
                  dataSource={[
                    { title: '主题', description: '深色主题', action: <Select style={{ width: 100 }} options={[{ value: 'dark', label: '深色' }, { value: 'light', label: '浅色' }]} defaultValue="dark" size="small" /> },
                    { title: '字体大小', description: '14px', action: <Slider min={12} max={18} defaultValue={14} /> },
                    { title: '布局', description: '经典布局', action: <Select style={{ width: 100 }} options={[{ value: 'classic', label: '经典' }, { value: 'compact', label: '紧凑' }]} defaultValue="classic" size="small" /> }
                  ].slice(0, 2)}
                  renderItem={item => (
                    <List.Item
                      actions={[item.action]}
                    >
                      <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} description={<span style={{ fontSize: '11px' }}>{item.description}</span>} />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={24} style={{ height: 'calc(50% - 5px)' }}>
              <Card title="通知设置" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <List
                  size="small"
                  dataSource={[
                    { title: '事件通知', description: '高优先级事件', action: <Switch defaultChecked /> },
                    { title: '任务提醒', description: '任务截止前提醒', action: <Switch defaultChecked /> },
                    { title: '邮件通知', description: '通过邮件发送', action: <Switch defaultChecked /> }
                  ].slice(0, 3)}
                  renderItem={item => (
                    <List.Item
                      actions={[item.action]}
                    >
                      <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} description={<span style={{ fontSize: '11px' }}>{item.description}</span>} />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Card title="默认页面 + 数据展示设置" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
            <List
              size="small"
              dataSource={[
                { title: '登录默认页', description: '运营全景', action: <Select style={{ width: 120 }} options={[{ value: 'dashboard', label: '运营全景' }, { value: 'tasks', label: '我的任务' }]} defaultValue="dashboard" size="small" /> },
                { title: '默认时间范围', description: '最近7天', action: <Select style={{ width: 100 }} options={[{ value: '7d', label: '7天' }, { value: '30d', label: '30天' }]} defaultValue="7d" size="small" /> },
                { title: '默认数据刷新频率', description: '5分钟', action: <Select style={{ width: 100 }} options={[{ value: '5m', label: '5分钟' }, { value: '15m', label: '15分钟' }]} defaultValue="5m" size="small" /> },
                { title: '显示实时数据', description: '已启用', action: <Switch defaultChecked /> }
              ].slice(0, 3)}
              renderItem={item => (
                <List.Item
                  actions={[item.action]}
                >
                  <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} description={<span style={{ fontSize: '11px' }}>{item.description}</span>} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Row gutter={10} style={{ height: '100%' }}>
            <Col span={24} style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }}>
              <Card title="偏好设置分布" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.preferenceChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
              </Card>
            </Col>
            <Col span={24} style={{ height: 'calc(50% - 5px)' }}>
              <Card title="通知类型统计" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.notificationChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <Card title="提醒设置" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
            <List
              size="small"
              dataSource={[
                { title: '每日岗位责任', status: '已启用' },
                { title: '每周提交周报', status: '已启用' },
                { title: '任务截止提醒', status: '已启用' },
                { title: '任务延期提醒', status: '已启用' }
              ].slice(0, 4)}
              renderItem={item => (
                <List.Item
                  actions={[<Tag color={item.status === '已启用' ? 'green' : 'orange'} style={{ fontSize: '10px' }}>{item.status}</Tag>]}
                >
                  <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Template19;