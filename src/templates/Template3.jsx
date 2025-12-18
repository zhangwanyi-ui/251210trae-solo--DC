import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List, Progress } from 'antd';

// 模板3：业务主体 - 事实发生（左侧 - 观察-实时动态）
const Template3 = ({ pageTitle, data }) => {
  // 定义模板的sections配置，使用与其他模板一致的结构
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '实时访客数',
        value: 15000,
        prefix: '👥',
        suffix: '人',
        color: '#3f8600'
      },
      {
        title: '转化率',
        value: 4.8,
        precision: 1,
        prefix: '📈',
        suffix: '%',
        color: '#1890ff'
      },
      {
        title: '平均停留时间',
        value: 300,
        prefix: '⏱️',
        suffix: '秒',
        color: '#faad14'
      },
      {
        title: '跳出率',
        value: 45.5,
        precision: 1,
        prefix: '💨',
        suffix: '%',
        color: '#f5222d'
      }
    ],
    
    // 2. 主视图1：可视化动态变化图
    main1: {
      title: '可视化动态变化图',
      type: 'chart',
      option: {
        title: { text: '可视化动态变化', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'axis' },
        legend: { data: ['实时业务量', '在线用户数'], bottom: 5, textStyle: { fontSize: 10 } },
        xAxis: { type: 'category', data: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25'], axisLabel: { fontSize: 10 } },
        yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#1890ff' }
          },
          {
            data: [2400, 4000, 3000, 1600, 1400, 2200],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#52c41a' }
          }
        ]
      }
    },
    
    // 3. 主视图2：实时"主题"状态图
    main2: {
      title: '实时"主题"状态图',
      type: 'chart',
      option: {
        title: { text: '实时"主题"状态', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'item' },
        series: [
          {
            name: '系统状态',
            type: 'gauge',
            detail: { formatter: '{value}%', fontSize: 12 },
            data: [{ value: 85, name: '系统健康度' }],
            axisLabel: { fontSize: 10 }
          }
        ]
      }
    },
    
    // 4. 辅助视图1：任务 + 责任 / 在线状态区
    aux1: {
      title: '任务 + 责任 / 在线状态区',
      type: 'list',
      data: [
        { title: '业务类型A', value: 58, status: '正常' },
        { title: '业务类型B', value: 32, status: '正常' },
        { title: '业务类型C', value: 20, status: '预警' },
        { name: '应用服务', status: '在线', health: 95 },
        { name: '数据库服务', status: '在线', health: 92 },
        { name: '缓存服务', status: '在线', health: 98 }
      ],
      renderItem: (item) => {
        // 区分任务和责任状态数据
        if (item.title) {
          // 任务数据
          return (
            <List.Item style={{ padding: '2px 0', margin: '0' }}>
              <List.Item.Meta
                title={<span style={{ fontSize: '11px' }}>{item.title}</span>}
                description={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Progress percent={item.value} size="small" strokeColor={item.status === '正常' ? '#52c41a' : '#faad14'} />
                    <Tag style={{ fontSize: '9px', margin: '0' }} color={item.status === '正常' ? 'green' : 'orange'}>
                      {item.status}
                    </Tag>
                  </div>
                }
              />
            </List.Item>
          );
        } else {
          // 责任/在线状态数据
          return (
            <List.Item style={{ padding: '2px 0', margin: '0' }}>
              <List.Item.Meta
                title={<span style={{ fontSize: '11px' }}>{item.name}</span>}
                description={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Progress percent={item.health} size="small" strokeColor={item.health > 90 ? '#52c41a' : item.health > 80 ? '#faad14' : '#f5222d'} />
                    <Tag style={{ fontSize: '9px', margin: '0' }} color={item.status === '在线' ? 'green' : 'red'}>
                      {item.status}
                    </Tag>
                  </div>
                }
              />
            </List.Item>
          );
        }
      }
    },
    
    // 5. 辅助视图2：事件摘要区
    aux2: {
      title: '事件摘要区',
      type: 'list',
      grid: { gutter: 5, column: 2 },
      data: [
        { title: '流量突增', time: '12:25', level: 'medium' },
        { title: '响应延迟', time: '12:20', level: 'high' },
        { title: '系统升级', time: '12:15', level: 'low' },
        { title: '数据同步', time: '12:10', level: 'low' }
      ],
      renderItem: (item) => (
        <List.Item style={{ padding: '3px 0', margin: '0' }}>
          <List.Item.Meta
            title={<span style={{ fontSize: '11px' }}>{item.title}</span>}
            description={
              <div>
                <span style={{ fontSize: '10px' }}>{item.time}</span>
                <Tag style={{ fontSize: '9px', margin: '0 0 0 4px' }} color={item.level === 'high' ? 'red' : item.level === 'medium' ? 'orange' : 'green'}>
                  {item.level === 'high' ? '高危' : item.level === 'medium' ? '中危' : '低危'}
                </Tag>
              </div>
            }
          />
        </List.Item>
      )
    }
  };

  // 模板3的自定义布局配置，与其他模板有所区别但风格一致
  const layoutConfig = {
    // 调整列数，模板3使用3列主视图
    gridTemplateColumns: 'repeat(4, 1fr)',
    // 调整行高比例，模板3更注重主视图
    gridTemplateRows: 'auto 1fr 1fr auto',
    // 摘要栏位置不变
    summaryGrid: '1 / 2',
    // 主视图占据中间两行
    mainGrid: '2 / 4',
    // 底部辅助视图调整
    auxLeftGrid: '4 / 5',
    // 右侧辅助视图调整，更紧凑
    auxRightGrid: '2 / 5'
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template3" />;
};

export default Template3;