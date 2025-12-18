import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

// 模板8：业务主体 - 深度分析(左侧-感知-分布特征分析报告）
const Template8 = ({ pageTitle, data }) => {
  // 业务对事件的影响分析数据
  const businessEventImpact = [
    {
      event: '地域扩展',
      businessImpact: [
        { business: '华东地区', impact: '正面', description: '业务量增长20%', percentage: '20%' },
        { business: '华南地区', impact: '正面', description: '业务量增长15%', percentage: '15%' }
      ]
    }
  ];

  // 业务对任务的影响分析数据
  const businessTaskImpact = [
    {
      task: '地域运营策略',
      businessImpact: [
        { business: '华东地区', impact: '高', description: '针对性运营效果显著', percentage: '30%' },
        { business: '华南地区', impact: '中', description: '运营效果良好', percentage: '20%' }
      ]
    }
  ];

  // 定义模板的sections配置
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '华东业务占比',
        value: 35,
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        color: '#3f8600'
      },
      {
        title: '华南业务占比',
        value: 25,
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        color: '#1890ff'
      },
      {
        title: '高峰时段占比',
        value: 55,
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        color: '#52c41a'
      },
      {
        title: '转化率最高区域',
        value: 5.2,
        precision: 1,
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        color: '#faad14',
        description: <span style={{ fontSize: '11px' }}>华南地区</span>
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
          data: ['业务量', '用户分布', '转化率'],
          bottom: 5,
          textStyle: { fontSize: 10 }
        },
        xAxis: {
          type: 'category',
          data: ['华东', '华南', '华北', '华中', '西北', '西南'],
          axisLabel: { fontSize: 10 }
        },
        series: [
          {
            name: '业务量',
            type: 'bar',
            data: [35000, 25000, 20000, 10000, 5000, 5000],
            itemStyle: { color: '#1890ff' }
          },
          {
            name: '用户分布',
            type: 'bar',
            data: [40000, 30000, 25000, 15000, 7000, 8000],
            itemStyle: { color: '#52c41a' }
          },
          {
            name: '转化率',
            type: 'line',
            data: [4.8, 5.2, 4.5, 4.2, 3.8, 4.0],
            smooth: true,
            yAxisIndex: 1,
            itemStyle: { color: '#faad14' }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '业务量/用户分布',
            position: 'left',
            axisLabel: { fontSize: 10 }
          },
          {
            type: 'value',
            name: '转化率',
            position: 'right',
            axisLabel: {
              formatter: '{value}%',
              fontSize: 10
            }
          }
        ]
      }
    },
    
    // 3. 业务时段分布
    timeDistribution: {
      title: '业务时段分布',
      type: 'chart',
      row: 2,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: {
          text: '业务时段分布',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}%'
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
          axisLabel: { fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}%',
            fontSize: 10
          }
        },
        series: [
          {
            name: '业务分布',
            type: 'line',
            data: [5, 3, 8, 20, 25, 30, 22, 15],
            smooth: true,
            lineStyle: {
              color: '#1890ff',
              width: 3
            },
            areaStyle: {
              color: 'rgba(24, 144, 255, 0.3)'
            }
          }
        ]
      }
    },
    
    // 4. 分布特征价值分析
    featureValue: {
      title: '分布特征价值',
      type: 'chart',
      row: 3,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: {
          text: '分布特征价值分析',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['地域分布', '用户画像', '时段分布', '渠道分布', '设备分布'],
          axisLabel: { fontSize: 10, rotate: 30 }
        },
        yAxis: {
          type: 'value',
          name: '价值得分',
          axisLabel: { fontSize: 10 }
        },
        series: [
          {
            name: '特征价值',
            type: 'bar',
            data: [90, 85, 80, 75, 70],
            itemStyle: {
              color: function(params) {
                const colors = ['#52c41a', '#1890ff', '#faad14', '#fadb14', '#fa8c16'];
                return colors[params.dataIndex];
              }
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

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template8" />;
};

export default Template8;