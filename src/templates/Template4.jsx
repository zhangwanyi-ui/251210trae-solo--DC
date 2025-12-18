import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List } from 'antd';

// 模板4：业务主体 - 事实发生（左侧 - 观察-近期发生）
const Template4 = ({ pageTitle, data }) => {
  // 定义模板的sections配置
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '近期事件数',
        value: 120,
        prefix: '📊',
        suffix: '件',
        color: '#3f8600'
      },
      {
        title: '高优先级事件',
        value: 8,
        prefix: '⚠️',
        suffix: '件',
        color: '#ff4d4f'
      },
      {
        title: '已处理事件',
        value: 96,
        prefix: '✅',
        suffix: '件',
        color: '#52c41a'
      },
      {
        title: '待处理事件',
        value: 24,
        prefix: '⏳',
        suffix: '件',
        color: '#faad14'
      }
    ],
    
    // 2. 主视图1：近期业务趋势
    main1: {
      title: '近期业务趋势',
      type: 'chart',
      option: {
        title: { text: '近期业务趋势', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'axis' },
        legend: { data: ['业务量', '转化率'], bottom: 5, textStyle: { fontSize: 10 } },
        xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], axisLabel: { fontSize: 10 } },
        yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#1890ff' }
          },
          {
            data: [4.2, 4.8, 4.5, 3.8, 4.7, 5.1, 4.9],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#52c41a' }
          }
        ]
      }
    },
    
    // 3. 辅助视图1：近期异常事件汇总表
    aux1: {
      title: '近期异常事件汇总表',
      type: 'list',
      data: [
        { title: '系统故障', time: '6月15日', level: 'high' },
        { title: '性能下降', time: '6月14日', level: 'medium' },
        { title: '数据异常', time: '6月13日', level: 'medium' },
        { title: '网络问题', time: '6月12日', level: 'low' },
        { title: '配置错误', time: '6月11日', level: 'medium' }
      ],
      renderItem: (item) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            title={<span style={{ fontSize: '11px' }}>{item.title}</span>}
            description={
              <div>
                <Tag style={{ fontSize: '9px', margin: '0' }} color={item.level === 'high' ? 'red' : item.level === 'medium' ? 'orange' : 'green'}>
                  {item.level === 'high' ? '高危' : item.level === 'medium' ? '中危' : '低危'}
                </Tag>
                <span style={{ fontSize: '10px', marginLeft: '4px' }}>{item.time}</span>
              </div>
            }
          />
        </List.Item>
      )
    },
    
    // 4. 辅助视图2：近期任务完成情况表
    aux2: {
      title: '近期任务完成情况表',
      type: 'list',
      data: [
        { title: '运营优化', status: '已完成', progress: 100 },
        { title: '系统升级', status: '进行中', progress: 75 },
        { title: '数据备份', status: '已完成', progress: 100 },
        { title: '安全审计', status: '待启动', progress: 0 },
        { title: '性能测试', status: '进行中', progress: 45 }
      ],
      renderItem: (item) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            title={<span style={{ fontSize: '11px' }}>{item.title}</span>}
            description={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px' }}>{item.status}</span>
                <span style={{ fontSize: '10px' }}>{item.progress}%</span>
              </div>
            }
          />
        </List.Item>
      )
    }
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template4" />;
};

export default Template4;