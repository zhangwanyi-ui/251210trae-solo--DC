import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Statistic, Timeline, List, Progress, Tag } from 'antd';
import * as echarts from 'echarts';

// 模板17：责任主体 - 事实发生（顶部 - 在线）
const Template17 = ({ pageTitle, data }) => {
  const chartRefs = {
    performanceTrendChart: useRef(null),
    businessRelationChart: useRef(null),
    rankingChart: useRef(null),
    eventDistributionChart: useRef(null)
  };

  // 初始化图表
  useEffect(() => {
    // 1. 绩效趋势图
    const performanceTrendChart = echarts.init(chartRefs.performanceTrendChart.current);
    performanceTrendChart.setOption({
      title: { text: '绩效趋势分析' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
      },
      yAxis: { type: 'value', max: 100 },
      series: [
        {
          data: [85, 92, 88, 95, 90, 96],
          type: 'line',
          smooth: true,
          itemStyle: { color: '#52c41a' }
        }
      ]
    });

    // 2. 业务关联分析图
    const businessRelationChart = echarts.init(chartRefs.businessRelationChart.current);
    businessRelationChart.setOption({
      title: { text: '业务关联分析' },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: '业务关联',
          type: 'radar',
          data: [
            {
              value: [90, 80, 85, 95, 70],
              name: '绩效关联度',
              areaStyle: { color: 'rgba(24, 144, 255, 0.3)' }
            }
          ],
          indicator: [
            { name: '在线交易', max: 100 },
            { name: '用户管理', max: 100 },
            { name: '数据分析', max: 100 },
            { name: '系统维护', max: 100 },
            { name: '安全监控', max: 100 }
          ]
        }
      ]
    });

    // 3. 绩效排名图
    const rankingChart = echarts.init(chartRefs.rankingChart.current);
    rankingChart.setOption({
      title: { text: '绩效排名' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: {
        type: 'value',
        inverse: true
      },
      yAxis: {
        type: 'category',
        data: ['团队A', '团队B', '团队C', '团队D', '团队E']
      },
      series: [
        {
          data: [96, 92, 88, 85, 75],
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          }
        }
      ]
    });

    // 4. 责任范围内事件分布图
    const eventDistributionChart = echarts.init(chartRefs.eventDistributionChart.current);
    eventDistributionChart.setOption({
      title: { text: '责任范围内事件分布' },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: '事件分布',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 400, name: '系统故障' },
            { value: 300, name: '性能问题' },
            { value: 300, name: '数据异常' },
            { value: 200, name: '网络问题' }
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
      performanceTrendChart.resize();
      businessRelationChart.resize();
      rankingChart.resize();
      eventDistributionChart.resize();
    };

    window.addEventListener('resize', handleResize);

    // 组件卸载时清理图表实例
    return () => {
      window.removeEventListener('resize', handleResize);
      performanceTrendChart.dispose();
      businessRelationChart.dispose();
      rankingChart.dispose();
      eventDistributionChart.dispose();
    };
  }, []);

  return (
    <div style={{ height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1 style={{ margin: '0 0 6px 0', fontSize: '20px' }}>{pageTitle}</h1>
      
      {/* 1. 摘要栏 */}
      <Row gutter={10} style={{ height: '70px' }}>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="总责任团队数" value={15} prefix="👥" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="在线团队数" value={12} prefix="✅" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="当前事件数" value={28} prefix="📊" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="待处理任务数" value={45} prefix="⏱️" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
      </Row>

      {/* 2-4. 主要内容区 */}
      <Row gutter={10} style={{ flex: 1, minHeight: 0 }}>
        <Col span={12}>
          <Row gutter={10} style={{ height: '100%' }}>
            <Col span={12} style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }}>
              <Card title="绩效排名表" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.rankingChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
              </Card>
            </Col>
            <Col span={12} style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }}>
              <Card title="绩效趋势图" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.performanceTrendChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
              </Card>
            </Col>
            <Col span={12} style={{ height: 'calc(50% - 5px)' }}>
              <Card title="业务关联分析" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.businessRelationChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
              </Card>
            </Col>
            <Col span={12} style={{ height: 'calc(50% - 5px)' }}>
              <Card title="责任范围内事件" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.eventDistributionChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={10} style={{ height: '100%' }}>
            <Col span={24} style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }}>
              <Card title="绩效关联业务" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <List
                  size="small"
                  dataSource={[
                    { title: '在线交易', performance: 95, progress: 95 },
                    { title: '用户管理', performance: 90, progress: 90 },
                    { title: '数据分析', performance: 88, progress: 88 },
                    { title: '系统维护', performance: 92, progress: 92 },
                    { title: '安全监控', performance: 85, progress: 85 }
                  ].slice(0, 4)}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} />
                      <Progress percent={item.progress} size="small" status="active" strokeWidth={3} />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={24} style={{ height: 'calc(50% - 5px)' }}>
              <Card title="绩效提升任务" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <List
                  size="small"
                  dataSource={[
                    { title: '优化系统性能', status: '进行中', priority: '高' },
                    { title: '提升数据准确性', status: '待启动', priority: '中' },
                    { title: '加强安全监控', status: '已完成', priority: '高' },
                    { title: '改善用户体验', status: '进行中', priority: '中' }
                  ].slice(0, 3)}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Tag color={item.status === '进行中' ? 'blue' : item.status === '待启动' ? 'orange' : 'green'} style={{ fontSize: '10px' }}>{item.status}</Tag>,
                        <Tag color={item.priority === '高' ? 'red' : 'orange'} style={{ fontSize: '10px' }}>{item.priority}</Tag>
                      ]}
                    >
                      <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Template17;