import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

// 模板7：业务主体 - 深度分析(左侧-感知-对比分析报告）
const Template7 = ({ pageTitle, data }) => {
  // 业务对事件的影响分析数据
  const businessEventImpact = [
    {
      event: '产品更新',
      businessImpact: [
        { business: '业务A', impact: '正面', description: '用户量增长20%', percentage: '20%' },
        { business: '业务B', impact: '正面', description: '转化率提升15%', percentage: '15%' }
      ]
    }
  ];

  // 业务对任务的影响分析数据
  const businessTaskImpact = [
    {
      task: '性能优化',
      businessImpact: [
        { business: '业务A', impact: '高', description: '响应时间降低30%', percentage: '30%' },
        { business: '业务B', impact: '中', description: '响应时间降低20%', percentage: '20%' }
      ]
    }
  ];

  // 定义模板的sections配置
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '业务A增长率',
        value: 35,
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        color: '#3f8600'
      },
      {
        title: '业务B增长率',
        value: 28,
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        color: '#1890ff'
      },
      {
        title: '业务C增长率',
        value: 42,
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        color: '#52c41a'
      },
      {
        title: '业务D增长率',
        value: 30,
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        color: '#faad14'
      }
    ],
    
    // 2. 对比与趋势分析
    comparisonTrend: {
      title: '对比与趋势分析',
      type: 'chart',
      row: 2,
      col: 1,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: {
          text: '对比与趋势分析',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['业务A', '业务B', '业务C', '业务D'],
          bottom: 5,
          textStyle: { fontSize: 10 }
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
          axisLabel: { fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          axisLabel: { fontSize: 10 }
        },
        series: [
          {
            name: '业务A',
            type: 'line',
            data: [12000, 19000, 30000, 45000, 60000, 80000],
            smooth: true,
            itemStyle: { color: '#1890ff' }
          },
          {
            name: '业务B',
            type: 'line',
            data: [8000, 15000, 25000, 40000, 55000, 75000],
            smooth: true,
            itemStyle: { color: '#52c41a' }
          },
          {
            name: '业务C',
            type: 'line',
            data: [15000, 22000, 35000, 50000, 68000, 90000],
            smooth: true,
            itemStyle: { color: '#faad14' }
          },
          {
            name: '业务D',
            type: 'line',
            data: [10000, 18000, 28000, 42000, 58000, 82000],
            smooth: true,
            itemStyle: { color: '#722ed1' }
          }
        ]
      }
    },
    
    // 3. 跨问题类型对比
    crossIssueComparison: {
      title: '跨问题类型对比',
      type: 'chart',
      row: 2,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: {
          text: '跨问题类型对比',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['业务A', '业务B', '业务C'],
          bottom: 5,
          textStyle: { fontSize: 10 }
        },
        xAxis: {
          type: 'category',
          data: ['性能问题', '稳定性问题', '用户体验问题', '安全问题', '功能问题'],
          axisLabel: { fontSize: 10, rotate: 30 }
        },
        yAxis: {
          type: 'value',
          name: '问题数量',
          axisLabel: { fontSize: 10 }
        },
        series: [
          {
            name: '业务A',
            type: 'bar',
            data: [15, 8, 22, 5, 18],
            itemStyle: { color: '#1890ff' }
          },
          {
            name: '业务B',
            type: 'bar',
            data: [12, 10, 18, 3, 15],
            itemStyle: { color: '#52c41a' }
          },
          {
            name: '业务C',
            type: 'bar',
            data: [20, 12, 25, 7, 22],
            itemStyle: { color: '#faad14' }
          }
        ]
      }
    },
    
    // 4. 差异原因分析
    differenceReasons: {
      title: '差异原因分析',
      type: 'chart',
      row: 3,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: {
          text: '对比差异原因分析',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}%'
        },
        legend: {
          orient: 'vertical',
          left: 5,
          top: 30,
          textStyle: { fontSize: 10 }
        },
        series: [
          {
            name: '差异原因',
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
              { value: 35, name: '产品定位差异' },
              { value: 25, name: '目标用户差异' },
              { value: 20, name: '运营策略差异' },
              { value: 15, name: '技术架构差异' },
              { value: 5, name: '其他因素' }
            ],
            itemStyle: {
              borderRadius: 8,
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        ]
      }
    },
    
    // 5. 业务对事件的影响分析
    businessEventImpact: {
      title: '业务对事件的影响分析',
      type: 'list',
      row: 3,
      col: 1,
      rowSpan: 1,
      colSpan: 1,
      data: businessEventImpact[0].businessImpact,
      renderItem: (impact) => (
        <List.Item
          actions={[
            <Tag color={
              impact.impact === '正面' ? 'green' :
              impact.impact === '负面' ? 'red' : 'gray'
            } style={{ fontSize: '10px' }}>
              {impact.impact}
            </Tag>
          ]}
          style={{ padding: '2px 0', margin: '0' }}
        >
          <List.Item.Meta
            avatar={<Tag color="blue" style={{ fontSize: '10px' }}>{impact.percentage}</Tag>}
            title={<span style={{ fontSize: '12px' }}>{impact.business}</span>}
            description={<span style={{ fontSize: '11px' }}>{impact.description}</span>}
          />
        </List.Item>
      )
    },
    
    // 6. 业务对任务的影响分析
    businessTaskImpact: {
      title: '业务对任务的影响分析',
      type: 'list',
      row: 4,
      col: 1,
      rowSpan: 1,
      colSpan: 2,
      data: businessTaskImpact[0].businessImpact,
      renderItem: (impact) => (
        <List.Item
          actions={[
            <Tag color={
              impact.impact === '高' ? 'red' :
              impact.impact === '中' ? 'orange' : 'green'
            } style={{ fontSize: '10px' }}>
              {impact.impact}
            </Tag>
          ]}
          style={{ padding: '2px 0', margin: '0' }}
        >
          <List.Item.Meta
            avatar={<Tag color="blue" style={{ fontSize: '10px' }}>{impact.percentage}</Tag>}
            title={<span style={{ fontSize: '12px' }}>{impact.business}</span>}
            description={<span style={{ fontSize: '11px' }}>{impact.description}</span>}
          />
        </List.Item>
      )
    }
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template7" />;
};

export default Template7;