import React from 'react';
import GridTemplate from './GridTemplate';
import { ArrowUpOutlined, ArrowDownOutlined, WarningOutlined, InfoCircleOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Tag, List } from 'antd';

// 模板1：业务主体 - 事实发生（左侧 - 全景俯瞰 - 一级页）
const Template1 = ({ pageTitle, data }) => {
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
    
    // 4. 主视图3：位置 + 内容关系图
    main3: {
      title: '位置 + 内容关系图',
      type: 'chart',
      option: {
        title: {
          text: '业务关系网络',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {},
        series: [
          {
            type: 'graph',
            layout: 'force',
            data: [
              { name: '全景俯瞰', value: 100 },
              { name: '运营全景', value: 80 },
              { name: '在线业务', value: 90 },
              { name: '应用服务', value: 75 },
              { name: '基础资源', value: 65 },
              { name: '服务健康', value: 85 }
            ],
            links: [
              { source: '全景俯瞰', target: '运营全景' },
              { source: '在线业务', target: '应用服务' },
              { source: '应用服务', target: '基础资源' },
              { source: '基础资源', target: '服务健康' },
              { source: '服务健康', target: '在线业务' }
            ],
            roam: false,
            label: {
              show: true,
              fontSize: 10
            },
            lineStyle: {
              color: '#aaa',
              width: 1,
              curveness: 0.3
            }
          }
        ]
      }
    },
    
    // 5. 主视图4：异常指标预警列表
    main4: {
      title: '异常指标预警列表',
      type: 'chart',
      option: {
        title: {
          text: '异常指标预警',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 5,
          top: 30,
          textStyle: { fontSize: 10 }
        },
        series: [
          {
            name: '异常指标分布',
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
              { value: 15, name: '响应时间异常' },
              { value: 8, name: '转化率异常' },
              { value: 5, name: '流量异常' },
              { value: 72, name: '正常指标' }
            ]
          }
        ]
      }
    },
    
    // 6. 辅助视图1：事件 / 任务摘要区
    aux1: {
      title: '事件 / 任务摘要区',
      type: 'list',
      data: [
        { title: '系统升级完成', status: 'completed', type: 'event' },
        { title: '流量峰值预警', status: 'warning', type: 'event' },
        { title: '性能优化', priority: 'high', type: 'task' },
        { title: '安全检查', priority: 'medium', type: 'task' }
      ],
      renderItem: (item) => (
        <List.Item style={{ padding: '4px 0' }}>
          <List.Item.Meta
            title={<span style={{ fontSize: '12px' }}>{item.title}</span>}
            description={
              item.type === 'event' ? (
                <Tag style={{ fontSize: '10px' }} color={item.status === 'completed' ? 'green' : item.status === 'warning' ? 'orange' : 'blue'}>
                  {item.status === 'completed' ? '已完成' : item.status === 'warning' ? '预警中' : '进行中'}
                </Tag>
              ) : (
                <Tag style={{ fontSize: '10px' }} color={item.priority === 'high' ? 'red' : item.priority === 'medium' ? 'orange' : 'green'}>
                  {item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}
                </Tag>
              )
            }
          />
        </List.Item>
      )
    },
    
    // 7. 辅助视图2：责任 / 在线状态区
    aux2: {
      title: '责任 / 在线状态区',
      type: 'list',
      data: [
        { name: '运营团队', responsible: '全景运营', type: 'team' },
        { name: '技术团队', responsible: '系统维护', type: 'team' },
        { name: '核心系统', status: 'online', type: 'system' },
        { name: '备份系统', status: 'online', type: 'system' }
      ],
      renderItem: (item) => (
        <List.Item style={{ padding: '4px 0' }}>
          <List.Item.Meta
            title={<span style={{ fontSize: '12px' }}>{item.name}</span>}
            description={
              item.type === 'team' ? (
                <span style={{ fontSize: '11px', color: '#666' }}>{item.responsible}</span>
              ) : (
                <Tag style={{ fontSize: '10px' }} color={item.status === 'online' ? 'green' : 'orange'}>
                  {item.status === 'online' ? '在线' : '维护中'}
                </Tag>
              )
            }
          />
        </List.Item>
      )
    }
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template1" />;
};

export default Template1;