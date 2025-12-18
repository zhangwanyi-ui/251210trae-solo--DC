import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List, Progress } from 'antd';

// 模板6：业务主体 - 深度分析(左侧-感知-变化分析报告）
const Template6 = ({ pageTitle, data }) => {
  // 定义模板的sections配置
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '变化次数',
        value: 25,
        prefix: '📊',
        suffix: '次',
        color: '#3f8600'
      },
      {
        title: '显著变化',
        value: 8,
        prefix: '⚠️',
        suffix: '次',
        color: '#ff4d4f'
      },
      {
        title: '异常变化',
        value: 3,
        prefix: '⚠️',
        suffix: '次',
        color: '#faad14'
      },
      {
        title: '变化幅度',
        value: 15.2,
        precision: 1,
        prefix: '📈',
        suffix: '%',
        color: '#1890ff'
      }
    ],
    
    // 2. 变化趋势分析
    changeTrend: {
      title: '变化趋势分析',
      type: 'chart',
      row: 2,
      col: 1,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: { text: '变化趋势分析', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'axis' },
        legend: { data: ['当前值', '变化前', '变化后'], bottom: 5, textStyle: { fontSize: 10 } },
        xAxis: { type: 'category', data: ['指标1', '指标2', '指标3', '指标4', '指标5'], axisLabel: { fontSize: 10 } },
        yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
        series: [
          {
            data: [120, 200, 150, 80, 70],
            type: 'bar',
            itemStyle: { color: '#1890ff' }
          },
          {
            data: [100, 150, 130, 60, 50],
            type: 'bar',
            itemStyle: { color: '#52c41a' }
          },
          {
            data: [140, 250, 170, 100, 90],
            type: 'bar',
            itemStyle: { color: '#faad14' }
          }
        ]
      }
    },
    
    // 3. 影响范围分析
    impactAnalysis: {
      title: '影响范围分析',
      type: 'chart',
      row: 3,
      col: 1,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: { text: '影响范围分析', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 5, top: 30, textStyle: { fontSize: 10 } },
        series: [
          {
            name: '影响范围',
            type: 'pie',
            radius: ['40%', '70%'],
            itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 1 },
            data: [
              { value: 35, name: '业务A' },
              { value: 25, name: '业务B' },
              { value: 20, name: '业务C' },
              { value: 15, name: '业务D' },
              { value: 5, name: '其他' }
            ]
          }
        ]
      }
    },
    
    // 4. 原因分析
    causeAnalysis: {
      title: '原因分析',
      type: 'chart',
      row: 2,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: { text: '原因分析', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: { type: 'category', data: ['原因A', '原因B', '原因C', '原因D'], axisLabel: { fontSize: 10, rotate: 30 } },
        yAxis: { type: 'value', name: '可能性', axisLabel: { fontSize: 10 } },
        series: [
          {
            data: [85, 70, 45, 30],
            type: 'bar',
            itemStyle: { color: '#cf1322' }
          }
        ]
      }
    },
    
    // 5. 业务影响分析
    businessImpact: {
      title: '业务影响分析',
      type: 'list',
      row: 3,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      data: [
        { title: '业务A', impact: '高', status: '正常' },
        { title: '业务B', impact: '中', status: '正常' },
        { title: '业务C', impact: '低', status: '预警' },
        { title: '业务D', impact: '中', status: '正常' }
      ],
      renderItem: (item) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            title={<span style={{ fontSize: '11px' }}>{item.title}</span>}
            description={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tag style={{ fontSize: '9px', margin: '0' }} color={item.impact === '高' ? 'red' : item.impact === '中' ? 'orange' : 'green'}>
                  {item.impact}
                </Tag>
                <Progress percent={item.impact === '高' ? 90 : item.impact === '中' ? 60 : 30} size="small" strokeColor={item.status === '正常' ? '#52c41a' : '#faad14'} />
              </div>
            }
          />
        </List.Item>
      )
    }
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template6" />;
};

export default Template6;