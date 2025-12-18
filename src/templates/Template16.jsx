import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Statistic, Timeline, List, Progress, Tag } from 'antd';
import * as echarts from 'echarts';

// 模板16：事件主体 - 事实发生（顶部 - 事件）
const Template16 = ({ pageTitle, data }) => {
  const chartRefs = {
    trendChart: useRef(null),
    impactChart: useRef(null),
    distributionChart: useRef(null),
    timelineChart: useRef(null)
  };

  // 初始化图表
  useEffect(() => {
    // 1. 事件趋势图
    const trendChart = echarts.init(chartRefs.trendChart.current);
    trendChart.setOption({
      title: { text: '事件趋势分析' },
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
          itemStyle: { color: '#1890ff' }
        }
      ]
    });

    // 2. 业务影响分析图
    const impactChart = echarts.init(chartRefs.impactChart.current);
    impactChart.setOption({
      title: { text: '业务影响分析' },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: '业务影响',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: { show: false },
          data: [
            { value: 335, name: '高影响' },
            { value: 310, name: '中影响' },
            { value: 234, name: '低影响' },
            { value: 135, name: '无影响' }
          ]
        }
      ]
    });

    // 3. 事件分布热力图
    const distributionChart = echarts.init(chartRefs.distributionChart.current);
    distributionChart.setOption({
      title: { text: '事件分布热力图' },
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '50%',
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: ['业务', '应用', '资源', '服务']
      },
      yAxis: {
        type: 'category',
        data: ['上午', '下午', '晚上', '凌晨']
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
      },
      series: [
        {
          name: '事件数量',
          type: 'heatmap',
          data: [
            [0, 0, 50], [0, 1, 80], [0, 2, 30], [0, 3, 10],
            [1, 0, 70], [1, 1, 90], [1, 2, 40], [1, 3, 20],
            [2, 0, 60], [2, 1, 75], [2, 2, 55], [2, 3, 25],
            [3, 0, 40], [3, 1, 65], [3, 2, 45], [3, 3, 15]
          ],
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });

    // 4. 事件时间线图
    const timelineChart = echarts.init(chartRefs.timelineChart.current);
    timelineChart.setOption({
      title: { text: '事件时间线' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'time',
        data: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05']
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      series: [
        {
          name: '事件',
          type: 'line',
          symbol: 'circle',
          symbolSize: 10,
          sampling: 'lttb',
          itemStyle: { color: '#f5222d' },
          areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(245, 34, 45, 0.5)' },
            { offset: 1, color: 'rgba(245, 34, 45, 0.1)' }
          ]) },
          data: [10, 20, 5, 30, 15]
        }
      ]
    });

    // 窗口大小变化时重新渲染图表
    const handleResize = () => {
      trendChart.resize();
      impactChart.resize();
      distributionChart.resize();
      timelineChart.resize();
    };

    window.addEventListener('resize', handleResize);

    // 组件卸载时清理图表实例
    return () => {
      window.removeEventListener('resize', handleResize);
      trendChart.dispose();
      impactChart.dispose();
      distributionChart.dispose();
      timelineChart.dispose();
    };
  }, []);

  return (
    <div style={{ height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1 style={{ margin: '0 0 6px 0', fontSize: '20px' }}>{pageTitle}</h1>
      
      {/* 1. 摘要栏 */}
      <Row gutter={10} style={{ height: '70px' }}>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="事件总数" value={1234} prefix="📊" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="未处理事件" value={45} prefix="⚠️" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="高影响事件" value={23} prefix="🔥" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic title="平均处理时间" value={4.5} suffix="小时" prefix="⏱️" titleStyle={{ fontSize: '12px' }} valueStyle={{ fontSize: '16px' }} />
          </Card>
        </Col>
      </Row>

      {/* 2-4. 主要内容区 */}
      <Row gutter={10} style={{ flex: 1, minHeight: 0 }}>
        <Col span={6}>
          <Card title="事件明细" style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }} titleStyle={{ fontSize: '14px' }}>
            <List
              size="small"
              dataSource={[
                { title: '系统故障', description: '应用服务异常', tag: '高影响' },
                { title: '性能下降', description: '响应时间过长', tag: '中影响' },
                { title: '数据异常', description: '数据同步延迟', tag: '高影响' }
              ].slice(0, 2)}
              renderItem={item => (
                <List.Item
                  actions={[<Tag color={item.tag === '高影响' ? 'red' : item.tag === '中影响' ? 'orange' : 'green'} style={{ fontSize: '10px' }}>{item.tag}</Tag>]}
                >
                  <List.Item.Meta title={<span style={{ fontSize: '12px' }}>{item.title}</span>} description={<span style={{ fontSize: '11px' }}>{item.description}</span>} />
                </List.Item>
              )}
            />
          </Card>
          <Card title="业务关联表" style={{ height: 'calc(50% - 5px)' }} titleStyle={{ fontSize: '14px' }}>
            <div style={{ fontSize: '11px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #eee', padding: '4px', textAlign: 'left', fontSize: '10px' }}>事件ID</th>
                    <th style={{ border: '1px solid #eee', padding: '4px', textAlign: 'left', fontSize: '10px' }}>关联业务</th>
                    <th style={{ border: '1px solid #eee', padding: '4px', textAlign: 'left', fontSize: '10px' }}>影响程度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #eee', padding: '4px', fontSize: '10px' }}>EVT-001</td>
                    <td style={{ border: '1px solid #eee', padding: '4px', fontSize: '10px' }}>在线交易</td>
                    <td style={{ border: '1px solid #eee', padding: '4px' }}><Tag color="red" style={{ fontSize: '8px' }}>高</Tag></td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #eee', padding: '4px', fontSize: '10px' }}>EVT-002</td>
                    <td style={{ border: '1px solid #eee', padding: '4px', fontSize: '10px' }}>用户管理</td>
                    <td style={{ border: '1px solid #eee', padding: '4px' }}><Tag color="orange" style={{ fontSize: '8px' }}>中</Tag></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={10} style={{ height: '100%' }}>
            <Col span={12}>
              <Card title="事件趋势图" style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.trendChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
              </Card>
              <Card title="业务影响分析图" style={{ height: 'calc(50% - 5px)' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.impactChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="事件分布热力图" style={{ height: 'calc(50% - 5px)', marginBottom: '10px' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.distributionChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
              </Card>
              <Card title="事件时间线图" style={{ height: 'calc(50% - 5px)' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.timelineChart} style={{ width: '100%', height: 'calc(100% - 35px)' }} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Template16;