import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Statistic, List, Tag, Timeline } from 'antd';
import * as echarts from 'echarts';

// 模板20：顶部 - 个人中心 - 我的内容
const Template20 = ({ pageTitle, data }) => {
  const chartRefs = {
    contentDistributionChart: useRef(null),
    usageTrendChart: useRef(null),
    favoriteChart: useRef(null),
    historyChart: useRef(null)
  };

  // 初始化图表
  useEffect(() => {
    // 1. 内容分布图表
    const contentDistributionChart = echarts.init(chartRefs.contentDistributionChart.current);
    contentDistributionChart.setOption({
      title: { text: '内容类型分布' },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: '内容类型',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 40, name: '报告文档' },
            { value: 25, name: '图表数据' },
            { value: 20, name: '事件记录' },
            { value: 10, name: '任务文档' },
            { value: 5, name: '其他内容' }
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

    // 2. 内容使用趋势图表
    const usageTrendChart = echarts.init(chartRefs.usageTrendChart.current);
    usageTrendChart.setOption({
      title: { text: '内容使用趋势' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
      },
      yAxis: { type: 'value' },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110],
          type: 'line',
          smooth: true,
          itemStyle: { color: '#fa8c16' }
        }
      ]
    });

    // 3. 收藏内容类型图表
    const favoriteChart = echarts.init(chartRefs.favoriteChart.current);
    favoriteChart.setOption({
      title: { text: '收藏内容类型' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: {
        type: 'category',
        data: ['报告', '图表', '事件', '任务']
      },
      yAxis: { type: 'value' },
      series: [
        {
          data: [28, 15, 12, 8],
          type: 'bar',
          itemStyle: { color: '#eb2f96' }
        }
      ]
    });

    // 4. 历史记录分布图表
    const historyChart = echarts.init(chartRefs.historyChart.current);
    historyChart.setOption({
      title: { text: '历史记录分布' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: { type: 'value' },
      series: [
        {
          data: [12, 20, 18, 25, 22, 8, 5],
          type: 'bar',
          itemStyle: { color: '#faad14' }
        }
      ]
    });

    // 窗口大小变化时重新渲染图表
    const handleResize = () => {
      contentDistributionChart.resize();
      usageTrendChart.resize();
      favoriteChart.resize();
      historyChart.resize();
    };

    window.addEventListener('resize', handleResize);

    // 组件卸载时清理图表实例
    return () => {
      window.removeEventListener('resize', handleResize);
      contentDistributionChart.dispose();
      usageTrendChart.dispose();
      favoriteChart.dispose();
      historyChart.dispose();
    };
  }, []);

  return (
    <div style={{ height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1 style={{ margin: '0 0 6px 0', fontSize: '20px' }}>{pageTitle}</h1>
      
      {/* 1. 摘要栏 */}
      <Row gutter={10} style={{ height: '70px' }}>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="收藏内容" value={63} prefix="⭐" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="历史记录" value={235} prefix="📋" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="个人生成内容" value={42} prefix="✍️" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="内容访问次数" value={892} prefix="👁️" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
      </Row>

      {/* 2-4. 主要内容区 */}
      <Row gutter={10} style={{ flex: 1, minHeight: 0 }}>
        <Col span={12}>
          <Row gutter={10} style={{ height: '100%' }}>
            <Col span={24} style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }}>
              <Card title="收藏内容" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <List
                  size="small"
                  dataSource={[
                    { title: '2023年Q1业务报告', type: '报告', time: '2023-04-15', status: '已收藏' },
                    { title: '用户活跃度分析图表', type: '图表', time: '2023-04-10', status: '已收藏' }
                  ].slice(0, 2)}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Tag color={item.type === '报告' ? 'blue' : item.type === '图表' ? 'green' : item.type === '事件' ? 'red' : 'orange'} style={{ fontSize: '10px' }}>{item.type}</Tag>,
                        <Tag color="purple" style={{ fontSize: '10px' }}>{item.status}</Tag>
                      ]}
                    >
                      <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} description={<span style={{ fontSize: '11px' }}>{item.time}</span>} />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={24} style={{ height: 'calc(50% - 5px)' }}>
              <Card title="个人生成内容" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <List
                  size="small"
                  dataSource={[
                    { title: '2023年Q1部门总结', type: '报告', time: '2023-04-15', status: '已发布' },
                    { title: '用户增长策略分析', type: '报告', time: '2023-04-10', status: '草稿' }
                  ].slice(0, 2)}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Tag color={item.type === '报告' ? 'blue' : item.type === '方案' ? 'green' : 'orange'} style={{ fontSize: '10px' }}>{item.type}</Tag>,
                        <Tag color={item.status === '已发布' ? 'green' : item.status === '草稿' ? 'orange' : 'blue'} style={{ fontSize: '10px' }}>{item.status}</Tag>
                      ]}
                    >
                      <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} description={<span style={{ fontSize: '11px' }}>{item.time}</span>} />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Card title="历史记录" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
            <List
              size="small"
              dataSource={[
                { title: '查看2023年Q1业务报告', type: '查看', time: '2023-04-15 14:30', module: '业务分析' },
                { title: '修改性能优化任务', type: '修改', time: '2023-04-14 10:15', module: '任务管理' },
                { title: '关注系统故障事件', type: '关注', time: '2023-04-13 09:45', module: '事件管理' }
              ].slice(0, 3)}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Tag color={item.type === '查看' ? 'blue' : item.type === '修改' ? 'orange' : item.type === '关注' ? 'red' : 'green'} style={{ fontSize: '10px' }}>{item.type}</Tag>,
                    <Tag style={{ fontSize: '10px' }}>{item.module}</Tag>
                  ]}
                >
                  <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} description={<span style={{ fontSize: '11px' }}>{item.time}</span>} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Row gutter={10} style={{ height: '100%' }}>
            <Col span={24} style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }}>
              <Card title="内容类型分布" style={{ height: '100%' }} titleStyle={{ fontSize: '12px' }}>
                <div ref={chartRefs.contentDistributionChart} style={{ width: '100%', height: 'calc(100% - 30px)' }} />
              </Card>
            </Col>
            <Col span={24} style={{ height: 'calc(50% - 5px)' }}>
              <Card title="收藏内容类型" style={{ height: '100%' }} titleStyle={{ fontSize: '12px' }}>
                <div ref={chartRefs.favoriteChart} style={{ width: '100%', height: 'calc(100% - 30px)' }} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Template20;