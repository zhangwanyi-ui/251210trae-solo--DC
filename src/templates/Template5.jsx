import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List } from 'antd';

// 模板5：业务主体 - 事实发生（左侧 - 观察-历史回顾）
const Template5 = ({ pageTitle, data }) => {
  // 定义模板的sections配置
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '总事件数',
        value: 1200,
        prefix: '📊',
        suffix: '件',
        color: '#3f8600'
      },
      {
        title: '高优先级事件',
        value: 85,
        prefix: '⚠️',
        suffix: '件',
        color: '#ff4d4f'
      },
      {
        title: '已处理事件',
        value: 1050,
        prefix: '✅',
        suffix: '件',
        color: '#52c41a'
      },
      {
        title: '处理完成率',
        value: 87.5,
        precision: 1,
        prefix: '📈',
        suffix: '%',
        color: '#1890ff'
      }
    ],
    
    // 2. 主视图1：历史业务趋势
    main1: {
      title: '历史业务趋势',
      type: 'chart',
      option: {
        title: { text: '历史业务趋势', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'axis' },
        legend: { data: ['业务量', '转化率'], bottom: 5, textStyle: { fontSize: 10 } },
        xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'], axisLabel: { fontSize: 10 } },
        yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
        grid: { top: 30, bottom: 30, left: 30, right: 30 },
        series: [
          {
            data: [4000, 5200, 4800, 6000, 8000, 10000],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#1890ff' }
          },
          {
            data: [3.8, 4.2, 4.5, 4.8, 5.1, 5.3],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#52c41a' }
          }
        ]
      }
    },
    
    // 3. 辅助视图1：历史关键事件回顾
    aux1: {
      title: '历史关键事件回顾',
      type: 'list',
      data: [
        { title: '系统升级', time: '6月10日', status: '已完成' },
        { title: '性能优化', time: '5月15日', status: '已完成' },
        { title: '数据迁移', time: '4月20日', status: '已完成' },
        { title: '安全加固', time: '3月5日', status: '已完成' },
        { title: '架构调整', time: '2月18日', status: '已完成' }
      ],
      renderItem: (item) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            title={<span style={{ fontSize: '11px' }}>{item.title}</span>}
            description={
              <div>
                <Tag style={{ fontSize: '9px', margin: '0' }} color="green">
                  {item.status}
                </Tag>
                <span style={{ fontSize: '10px', marginLeft: '4px' }}>{item.time}</span>
              </div>
            }
          />
        </List.Item>
      )
    },
    
    // 4. 辅助视图2：历史任务完成率趋势
    aux2: {
      title: '历史任务完成率趋势',
      type: 'list',
      data: [
        { title: '1月', completion: 78, trend: 'up' },
        { title: '2月', completion: 82, trend: 'up' },
        { title: '3月', completion: 85, trend: 'up' },
        { title: '4月', completion: 88, trend: 'up' },
        { title: '5月', completion: 92, trend: 'up' },
        { title: '6月', completion: 95, trend: 'up' }
      ],
      renderItem: (item) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            title={<span style={{ fontSize: '11px' }}>{item.title}</span>}
            description={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px' }}>{item.completion}%</span>
                <span style={{ fontSize: '10px', color: item.trend === 'up' ? '#52c41a' : '#f5222d' }}>
                  {item.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
            }
          />
        </List.Item>
      )
    }
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template5" />;
};

export default Template5;