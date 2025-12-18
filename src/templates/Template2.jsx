import React from 'react';
import GridTemplate from './GridTemplate';
import { ArrowUpOutlined, ArrowDownOutlined, WarningOutlined, InfoCircleOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Tag, List } from 'antd';

// 模板2：业务主体 - 事实发生（左侧 - 一级页）
const Template2 = ({ pageTitle, data }) => {
  // 定义模板的sections配置，严格按照文档要求
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '总业务量',
        value: 850000,
        prefix: <ArrowUpOutlined />,
        suffix: '笔',
        color: '#3f8600'
      },
      {
        title: '在线用户数',
        value: 150000,
        prefix: <ArrowUpOutlined />,
        suffix: '人',
        color: '#1890ff'
      },
      {
        title: '转化率',
        value: 4.8,
        precision: 1,
        prefix: <ArrowDownOutlined />,
        suffix: '%',
        color: '#cf1322'
      },
      {
        title: '平均响应时间',
        value: 250,
        prefix: <WarningOutlined />,
        suffix: 'ms',
        color: '#fa8c16'
      }
    ],
    
    // 2. 主视图1：可视化动态变化图
    main1: {
      title: '可视化动态变化图',
      type: 'chart',
      option: {
        title: {
          text: '动态变化趋势',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['业务量', '在线用户数', '转化率'],
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
            name: '业务量',
            type: 'line',
            data: [1200, 1900, 3000, 5000, 8000, 13000],
            smooth: true
          },
          {
            name: '在线用户数',
            type: 'line',
            data: [100, 200, 400, 800, 1600, 3200],
            smooth: true
          },
          {
            name: '转化率',
            type: 'line',
            data: [2.1, 2.3, 2.5, 2.7, 3.0, 3.2],
            smooth: true
          }
        ]
      }
    },
    
    // 3. 主视图2：可视化对比分析动态图
    main2: {
      title: '可视化对比分析动态图',
      type: 'chart',
      option: {
        title: {
          text: '对比分析',
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
          data: ['当前值', '目标值', '去年同期'],
          bottom: 5,
          textStyle: { fontSize: 10 }
        },
        xAxis: {
          type: 'category',
          data: ['业务量', '在线用户', '转化率', '响应时间'],
          axisLabel: { fontSize: 10, rotate: 30 }
        },
        yAxis: {
          type: 'value',
          axisLabel: { fontSize: 10 }
        },
        series: [
          {
            name: '当前值',
            type: 'bar',
            data: [850000, 150000, 4.8, 250]
          },
          {
            name: '目标值',
            type: 'bar',
            data: [1000000, 200000, 5.0, 200]
          },
          {
            name: '去年同期',
            type: 'bar',
            data: [500000, 80000, 3.5, 350]
          }
        ]
      }
    },
    
    // 4. 主视图3：主题可视化分布图
    main3: {
      title: '主题可视化分布图',
      type: 'chart',
      option: {
        title: {
          text: '业务分布',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data: ['应用服务', '基础资源', '在线业务', '服务健康'],
          bottom: 5,
          textStyle: { fontSize: 10 }
        },
        series: [
          {
            name: '业务分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 8,
              borderColor: '#fff',
              borderWidth: 1
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 30, name: '应用服务' },
              { value: 25, name: '基础资源' },
              { value: 35, name: '在线业务' },
              { value: 10, name: '服务健康' }
            ]
          }
        ]
      }
    },
    
    // 5. 辅助视图1：关联异常事件列表
    aux1: {
      title: '关联异常事件列表',
      type: 'list',
      data: [
        { title: '系统升级完成', status: 'completed', type: 'event' },
        { title: '流量峰值预警', status: 'warning', type: 'event' },
        { title: '数据库连接异常', status: 'error', type: 'event' },
        { title: '服务重启', status: 'completed', type: 'event' },
        { title: '数据同步完成', status: 'completed', type: 'event' },
        { title: '缓存更新', status: 'warning', type: 'event' }
      ],
      grid: { gutter: 5, column: 4 },
      renderItem: (item) => (
        <List.Item style={{ padding: '4px 0' }}>
          <List.Item.Meta
            title={<span style={{ fontSize: '12px' }}>{item.title}</span>}
            description={
              <Tag style={{ fontSize: '10px' }} color={item.status === 'completed' ? 'green' : item.status === 'warning' ? 'orange' : 'red'}>
                {item.status === 'completed' ? '已完成' : item.status === 'warning' ? '预警中' : '错误'}
              </Tag>
            }
          />
        </List.Item>
      )
    },
    
    // 7. 辅助视图2：主题责任团队信息
    aux2: {
      title: '主题责任团队信息',
      type: 'list',
      data: [
        { name: '运营团队', responsible: '全景运营', type: 'team' },
        { name: '技术团队', responsible: '系统维护', type: 'team' },
        { name: '数据团队', responsible: '数据分析', type: 'team' },
        { name: '运维团队', responsible: '系统监控', type: 'team' },
        { name: '安全团队', responsible: '系统安全', type: 'team' }
      ],
      renderItem: (item) => (
        <List.Item style={{ padding: '4px 0' }}>
          <List.Item.Meta
            title={<span style={{ fontSize: '12px' }}>{item.name}</span>}
            description={<span style={{ fontSize: '11px', color: '#666' }}>{item.responsible}</span>}
          />
        </List.Item>
      )
    }
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template2" />;
};

export default Template2;